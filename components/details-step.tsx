"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrackingCard } from "@/components/tracking-card";
import { TrackingItem } from "@/app/types/Tracking";

interface DetailsStepProps {
  selectedOrder: TrackingItem;
  onBackToList: () => void;
}

export function DetailsStep({ selectedOrder, onBackToList }: DetailsStepProps) {
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
      <div className="flex justify-center">
        <div className="w-full max-w-3xl">
          <TrackingCard item={selectedOrder} />
        </div>
      </div>
    </section>
  );
}
