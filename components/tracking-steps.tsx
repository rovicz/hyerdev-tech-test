"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export type TrackingStep = "search" | "list" | "details";

interface TrackingStepsProps {
  currentStep: TrackingStep;
  onNavigateToSearch: () => void;
  onNavigateToList: () => void;
  selectedOrderNumber?: string;
}

export function TrackingSteps({
  currentStep,
  onNavigateToSearch,
  onNavigateToList,
  selectedOrderNumber,
}: TrackingStepsProps) {
  const getStepIndex = (s: TrackingStep) => {
    if (s === "search") return 0;
    if (s === "list") return 1;
    return 2;
  };

  const currentStepIndex = getStepIndex(currentStep);

  return (
    <div className="flex justify-center w-full">
      <NavigationMenu>
        <NavigationMenuList className="space-x-2">
          <NavigationMenuItem>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "cursor-pointer",
                currentStep === "search"
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                  : currentStepIndex > 0
                    ? "text-foreground"
                    : "text-muted-foreground opacity-50 pointer-events-none",
              )}
              onClick={() => {
                if (currentStepIndex > 0) onNavigateToSearch();
              }}
            >
              1. Pesquisar
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "cursor-pointer",
                currentStep === "list"
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                  : currentStepIndex > 1
                    ? "text-foreground"
                    : "text-muted-foreground opacity-50 pointer-events-none",
              )}
              onClick={() => {
                if (currentStepIndex === 2) onNavigateToList();
              }}
            >
              2. Encomendas
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "cursor-pointer",
                currentStep === "details"
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                  : "text-muted-foreground opacity-50 pointer-events-none",
              )}
            >
              3.{" "}
              {currentStep === "details" && selectedOrderNumber
                ? `Detalhes ${selectedOrderNumber}`
                : "Detalhes"}
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
