import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import api from "@/lib/axios";
import { cleanHtmlText } from "@/lib/utils";
import { TrackingDetailsResponse, TrackingHistory } from "@/app/types/Tracking";

export async function POST(request: Request) {
  try {
    const { detailsLink } = await request.json();

    if (!detailsLink) {
      return NextResponse.json(
        { error: "Link de detalhes é obrigatório" },
        { status: 400 },
      );
    }

    // extract id and md params by the url
    const urlObj = new URL(detailsLink);
    const id = urlObj.searchParams.get("id");
    const md = urlObj.searchParams.get("md");

    if (!id || !md) {
      return NextResponse.json(
        { error: "URL de detalhes inválida (faltando id ou md)" },
        { status: 400 },
      );
    }

    const formData = new URLSearchParams();
    formData.append("id", id);
    formData.append("md", md);
    formData.append("w", "x"); // fixed param

    const targetUrl = "https://ssw.inf.br/2/SSWDetalhado";
    const response = await api.post(targetUrl, formData);

    const trackingDetailedLanding = cheerio.load(response.data);

    const recipientRaw = trackingDetailedLanding('td:contains("Destinatário:")')
      .next()
      .text();
    const recipient = cleanHtmlText(recipientRaw);

    const invoiceRaw = trackingDetailedLanding('span:contains("N Fiscal:")')
      .parent()
      .next()
      .text();
    const invoiceNumber = cleanHtmlText(invoiceRaw);

    const orderRaw = trackingDetailedLanding('span:contains("N Pedido:")')
      .parent()
      .next()
      .text();
    const orderNumber = cleanHtmlText(orderRaw);

    const history: TrackingHistory[] = [];

    trackingDetailedLanding("tr").each((_, element) => {
      const row = trackingDetailedLanding(element);

      const trackingCells = row.find("td.rastreamento");

      if (trackingCells.length >= 3) {
        // date & hour
        const dateHtml = trackingCells.eq(0).find("p.tdb").html() || "";
        const [dateRaw, timeRaw] = dateHtml.split(/<br\s*\/?>/i);

        // location
        const locationHtml = trackingCells.eq(1).find("p.tdb").html() || "";
        const [cityRaw] = locationHtml.split(/<br\s*\/?>/i);

        // status
        const statusCell = trackingCells.eq(2);
        const statusTitle = statusCell.find(".titulo").text().trim();
        const statusDescription = statusCell.find(".tdb").text().trim();

        if (statusTitle) {
          history.push({
            date: cleanHtmlText(dateRaw || ""),
            time: cleanHtmlText(timeRaw || ""),
            location: cleanHtmlText(cityRaw || ""),
            statusTitle: cleanHtmlText(statusTitle),
            statusDescription: cleanHtmlText(statusDescription),
          });
        }
      }
    });

    const data: TrackingDetailsResponse = {
      header: {
        recipient,
        invoiceNumber,
        orderNumber,
      },
      history,
    };

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Erro no scraping de detalhes:", error);
    return NextResponse.json(
      { error: "Falha ao obter detalhes da encomenda" },
      { status: 500 },
    );
  }
}
