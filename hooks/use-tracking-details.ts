import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { TrackingDetailsResponse } from "@/app/types/Tracking";
import api from "@/lib/axios";

export interface TrackingDetailsResult {
  success: boolean;
  data: TrackingDetailsResponse;
}

export interface TrackingDetailsError {
  error: string;
}

export const useTrackingDetails = () => {
  return useMutation<
    TrackingDetailsResult,
    AxiosError<TrackingDetailsError>,
    string
  >({
    mutationFn: async (detailsLink: string) => {
      const { data } = await api.post<TrackingDetailsResult>(
        "/api/tracking/details",
        {
          detailsLink,
        },
      );
      return data;
    },
  });
};
