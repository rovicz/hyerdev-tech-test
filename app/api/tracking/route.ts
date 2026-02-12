import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import api from "@/lib/axios";
import { TrackingItem } from "@/app/types/Tracking";
import { cleanHtmlText } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const { cpf } = await request.json();

    if (!cpf) {
      return NextResponse.json({ error: "CPF is required" }, { status: 400 });
    }

    const LANDING_URL = "https://ssw.inf.br/2/rastreamento_pf"; // landing page (with the tracker form)
    const landingResponse = await api.get(LANDING_URL);

    const $landingPage = cheerio.load(landingResponse.data);
    const rpfToken = $landingPage('input[name="rpf"]').val() as string;

    const TARGET_URL = "https://ssw.inf.br/2/resultSSW_dest";

    const formData = new URLSearchParams();
    formData.append("urlori", "/2/rastreamento_pf");
    formData.append("rpf", rpfToken || "");
    formData.append("cnpjdest", cpf);

    const response = await api.post(TARGET_URL, formData);

    // parse response HTML tracking page
    const $resultPage = cheerio.load(response.data);
    const orders: TrackingItem[] = [];

    // addressee name
    const addresseeName = $resultPage("table")
      .first()
      .find("td")
      .eq(2)
      .text()
      .trim();

    $resultPage('tr[onclick^="opx"]').each((_, element) => {
      const row = $resultPage(element);
      const cols = row.find("td");

      // invoice & order
      const col1Html = cols.eq(0).find("label").html() || "";
      const [rawInvoice, rawOrder] = col1Html
        .split("<br>")
        .map((t) => t.trim());

      const invoiceNumber = cleanHtmlText(rawInvoice);
      const orderNumber = cleanHtmlText(rawOrder);

      // location & date
      const col2Html = cols.eq(1).find("p.tdb").html() || "";
      const [rawLocation, rawDate] = col2Html.split("<br>");

      const location = cleanHtmlText(rawLocation);
      const dateTime = cleanHtmlText(rawDate).replace(/\s+/g, " ");

      // status & details
      const col3 = cols.eq(2);
      const statusTitle = col3.find(".titulo").text().trim(); // E.g.: "MERCADORIA ENTREGUE"

      // Remove title to get only the description
      const rawDetails = col3.text().trim();
      const statusDetails = rawDetails
        .replace(statusTitle, "")
        .replace("Mais detalhes", "")
        .trim();

      let recipientName = "";
      const recipientMatch = statusDetails.match(
        /Nome do recebedor:\s*(.*?)\s*Documento/,
      );
      if (recipientMatch) {
        recipientName = recipientMatch[1];
      }

      const onclickAttr = row.attr("onclick") || "";
      const linkMatch = onclickAttr.match(/opx\('([^']+)'\)/);
      const relativeLink = linkMatch ? linkMatch[1] : "";

      const detailsLink = relativeLink
        ? `https://ssw.inf.br${relativeLink}`
        : "";

      if (invoiceNumber) {
        orders.push({
          invoiceNumber,
          orderNumber,
          location,
          dateTime,
          statusTitle,
          statusDetails,
          recipientName,
          detailsLink,
        });
      }
    });

    // no orders found
    if (orders.length === 0) {
      console.warn(
        "No orders extracted. HTML structure might have changed.",
        response.data.substring(0, 200),
      );
    }

    return NextResponse.json({
      success: true,
      addressee: addresseeName || "Unknown",
      data: orders,
    });
  } catch (error) {
    console.error("SSW Scraping Error:", error);
    return NextResponse.json(
      { error: "Failed to process tracking" },
      { status: 500 },
    );
  }
}
