"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TrackingCard } from "@/components/tracking-card";
import { TrackingItem } from "@/app/types/Tracking";

interface OrdersListProps {
  data: TrackingItem[];
  onViewDetails: (order: TrackingItem) => void;
}

const parseDate = (dateStr: string) => {
  if (!dateStr) return 0;
  const [datePart, timePart] = dateStr.split(" ");
  if (!datePart) return 0;
  const [day, month, year] = datePart.split("/").map(Number);
  const [hour, minute] = timePart ? timePart.split(":").map(Number) : [0, 0];
  const fullYear = year < 100 ? 2000 + year : year;
  return new Date(fullYear, month - 1, day, hour, minute).getTime();
};

const ITEMS_PER_PAGE = 3;

export function OrdersList({ data, onViewDetails }: OrdersListProps) {
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);

  // Reset page when data, sort or search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [data, sortOrder, searchTerm]);

  const filteredAndSortedData = React.useMemo(() => {
    let result = [...data];

    if (searchTerm) {
      result = result.filter((item) =>
        item.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return result.sort((a, b) => {
      const dateA = parseDate(a.dateTime);
      const dateB = parseDate(b.dateTime);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
  }, [data, sortOrder, searchTerm]);

  const totalPages = Math.ceil(filteredAndSortedData.length / ITEMS_PER_PAGE);
  
  const paginatedData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedData, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar por número do pedido..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Ordenar por <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem
              checked={sortOrder === "desc"}
              onCheckedChange={() => setSortOrder("desc")}
            >
              Mais Recentes
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={sortOrder === "asc"}
              onCheckedChange={() => setSortOrder("asc")}
            >
              Mais Antigas
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedData.length > 0 ? (
          paginatedData.map((item) => (
            <div
              key={item.orderNumber} // Assuming orderNumber is unique
              className="cursor-pointer transition-transform hover:scale-[1.02] h-full"
              onClick={() => onViewDetails(item)}
            >
              <TrackingCard item={item} />
            </div>
          ))
        ) : (
          <div className="col-span-full h-24 text-center flex items-center justify-center text-muted-foreground">
            Nenhum resultado encontrado.
          </div>
        )}
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {filteredAndSortedData.length} pedido(s) encontrado(s).
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  );
}