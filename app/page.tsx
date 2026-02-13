"use client";

import { useState } from "react";
import { TrackingItem } from "./types/Tracking";
import { TrackingSteps } from "@/components/tracking-steps";
import { SearchStep } from "@/components/search-step";
import { ListStep } from "@/components/list-step";
import { DetailsStep } from "@/components/details-step";

type Step = "search" | "list" | "details";

export default function Home() {
  const [step, setStep] = useState<Step>("search");
  const [cpf, setCpf] = useState("");
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<TrackingItem[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<TrackingItem | null>(null);
  const [error, setError] = useState("");

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOrders([]);

    const cleanCpf = cpf.replace(/\D/g, "");

    if (cleanCpf.length < 11) {
      setError("Por favor, digite um CPF válido.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/tracking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cpf: cleanCpf }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao buscar encomendas");
      }

      setOrders(data.data);

      if (data.data.length === 0) {
        setError("Nenhuma encomenda encontrada para este CPF.");
      } else {
        setStep("list");
      }
    } catch (err) {
      console.error(err);
      setError("Ocorreu um erro ao tentar rastrear. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOrder = (order: TrackingItem) => {
    setSelectedOrder(order);
    setStep("details");
  };

  const handleBackToSearch = () => {
    setStep("search");
    setOrders([]);
    setCpf("");
    setSelectedOrder(null);
  };

  const handleBackToList = () => {
    setStep("list");
    setSelectedOrder(null);
  };

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <TrackingSteps
          currentStep={step}
          onNavigateToSearch={handleBackToSearch}
          onNavigateToList={handleBackToList}
          selectedOrderNumber={selectedOrder?.orderNumber}
        />

        {step === "search" && (
          <SearchStep
            cpf={cpf}
            setCpf={setCpf}
            handleTrack={handleTrack}
            loading={loading}
            error={error}
          />
        )}

        {step === "list" && (
          <ListStep
            orders={orders}
            onViewDetails={handleSelectOrder}
            onBackToSearch={handleBackToSearch}
          />
        )}

        {step === "details" && selectedOrder && (
          <DetailsStep
            selectedOrder={selectedOrder}
            onBackToList={handleBackToList}
          />
        )}
      </div>
    </main>
  );
}