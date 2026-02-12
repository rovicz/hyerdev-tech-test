import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { TrackingItem } from "@/app/types/Tracking";
import api from "@/lib/axios";

export interface TrackingResponse {
  success: boolean;
  addressee: string;
  data: TrackingItem[];
}

export interface TrackingError {
  error: string;
}

export const useTracking = () => {
  return useMutation<TrackingResponse, AxiosError<TrackingError>, string>({
    mutationFn: async (cpf: string) => {
      const { data } = await api.post<TrackingResponse>("/api/tracking", {
        cpf,
      });
      return data;
    },
  });
};
