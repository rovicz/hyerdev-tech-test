"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface SearchStepProps {
  cpf: string;
  setCpf: (value: string) => void;
  handleTrack: (e: React.FormEvent) => void;
  loading: boolean;
  error: string;
}

export function SearchStep({
  cpf,
  setCpf,
  handleTrack,
  loading,
  error,
}: SearchStepProps) {
  return (
    <section className="space-y-4 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Rastreamento SSW
      </h1>
      <p className="text-muted-foreground">
        Digite seu CPF abaixo para localizar suas encomendas.
      </p>

      <Card className="mx-auto max-w-md shadow-lg border-muted">
        <CardContent className="pt-6">
          <form onSubmit={handleTrack} className="flex gap-2">
            <Input
              placeholder="Digite o CPF (apenas números)"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="flex-1 bg-background"
              maxLength={14}
            />
            <Button type="submit" disabled={loading}>
              {loading ? (
                <span className="animate-spin">⌛</span>
              ) : (
                <Search className="h-4 w-4" />
              )}
              <span className="ml-2 hidden sm:inline">Rastrear</span>
            </Button>
          </form>
          {error && (
            <p className="mt-2 text-sm text-destructive font-medium">{error}</p>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
