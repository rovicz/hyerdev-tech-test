"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrdersList } from "@/components/orders-list";
import { TrackingItem } from "@/app/types/Tracking";

interface ListStepProps {
  orders: TrackingItem[];
  onViewDetails: (order: TrackingItem) => void;
  onBackToSearch: () => void;
}

export function ListStep({
  orders,
  onViewDetails,
  onBackToSearch,
}: ListStepProps) {
  return (
    <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Suas Encomendas</h2>
        <Button variant="ghost" onClick={onBackToSearch}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Nova Busca
        </Button>
      </div>
      <OrdersList data={orders} onViewDetails={onViewDetails} />
    </section>
  );
}
