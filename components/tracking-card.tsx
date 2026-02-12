import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Package, MapPin, Calendar, ExternalLink } from "lucide-react";
import { TrackingItem } from "@/app/types/Tracking";

type TrackingCardProps = {
  item: TrackingItem;
};

export const TrackingCard = ({ item, ...props }: TrackingCardProps) => {
  return (
    <Card
      className="overflow-hidden border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow py-0 h-full flex flex-col"
      {...props}
    >
      <CardHeader className="bg-muted/40 pb-3 pt-6 min-h-[140px]">
        <div className="flex justify-between items-start flex-col gap-2">
          <div>
            <CardTitle className="text-lg flex items-center gap-2 text-foreground">
              <Package className="h-5 w-5 text-primary" />
              NF: {item.invoiceNumber}
            </CardTitle>
            <CardDescription>Pedido: {item.orderNumber}</CardDescription>
          </div>

          <span className="inline-flex items-center rounded-sm bg-primary/10 px-2.5 py-1 text-xs font-small text-primary">
            {item.statusTitle}
          </span>
        </div>
      </CardHeader>

      <CardContent className="grid gap-4 py-4 md:grid-cols-2 flex-1">
        <div className="space-y-1">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-2 h-4 w-4" />
            Localização
          </div>
          <p className="font-medium text-foreground">{item.location}</p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            Última atualização
          </div>
          <p className="font-medium text-foreground">{item.dateTime}</p>
        </div>

        <div className="col-span-1 md:col-span-2 space-y-1 bg-muted/50 p-3 rounded-md border border-border/50 h-[180px] overflow-y-auto">
          <p className="text-sm text-foreground">
            <strong className="font-semibold">Detalhes:</strong>{" "}
            {item.statusDetails}
          </p>
          {item.recipientName && (
            <p className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold mt-1 flex items-center gap-1">
              ✓ Recebido por: {item.recipientName}
            </p>
          )}
        </div>
      </CardContent>

      {item.detailsLink && (
        <CardFooter className="bg-muted/40 pt-4 border-t border-border pb-6">
          <Button
            variant="outline"
            className="w-full bg-background hover:bg-muted"
            asChild
          >
            <a
              href={item.detailsLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Ver rastreamento completo no site da SSW
            </a>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
