"use client";

import { useEffect } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrackingItem } from "@/app/types/Tracking";
import { useTrackingDetails } from "@/hooks/use-tracking-details";
import { TrackingDetails } from "@/components/tracking-details";

interface DetailsStepProps {
  selectedOrder: TrackingItem;
  onBackToList: () => void;
}

export function DetailsStep({ selectedOrder, onBackToList }: DetailsStepProps) {
  const { mutate, data, isPending, error } = useTrackingDetails();

  useEffect(() => {
    if (selectedOrder.detailsLink) {
      mutate(selectedOrder.detailsLink);
    }
  }, [selectedOrder, mutate]);

  return (
    <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">
          Detalhes da Encomenda
        </h2>
        <Button variant="ghost" onClick={onBackToList}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para Lista
        </Button>
      </div>
      <div className="flex flex-col items-center gap-6">
        <div className="w-full max-w-7xl">
          {isPending && (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {error && (
            <div className="text-center py-8 text-destructive">
              <p>Não foi possível carregar os detalhes completos.</p>
              <Button
                variant="outline"
                className="mt-2"
                onClick={() => mutate(selectedOrder.detailsLink)}
              >
                Tentar Novamente
              </Button>
            </div>
          )}

          {data?.success && <TrackingDetails history={data.data.history} />}
        </div>
      </div>
    </section>
  );
}
