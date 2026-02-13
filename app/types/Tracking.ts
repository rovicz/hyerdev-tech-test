interface TrackingItem {
  invoiceNumber: string;
  orderNumber: string;
  location: string;
  dateTime: string;
  statusTitle: string;
  statusDetails: string;
  recipientName?: string;
  detailsLink: string;
}

interface TrackingHistory {
  date: string;
  time: string;
  location: string;
  statusTitle: string;
  statusDescription: string;
}

interface TrackingDetailsResponse {
  header: {
    recipient: string;
    invoiceNumber: string;
    orderNumber: string;
  };
  history: TrackingHistory[];
}

export type { TrackingItem, TrackingHistory, TrackingDetailsResponse };
