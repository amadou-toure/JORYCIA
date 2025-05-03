export interface OrderItem {
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalPrice: number;
  createdAt?: string;
  updatedAt?: string;
  stripeSessionId?: string;
  paymentStatus?: string;
  status: "pending" | "processing" | "completed" | "cancelled";
}
