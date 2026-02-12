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

export type { TrackingItem };
