export interface OrderItem {
  stripeProductID: string;
  stripePriceID: string;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  createdAt?: string;
  updatedAt?: string;
  stripeCustomerID: string;
  stripeSessionId?: string;
  status: "pending" | "processing" | "completed" | "cancelled";
}
