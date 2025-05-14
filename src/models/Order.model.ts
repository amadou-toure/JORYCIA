export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  userId?: string; // optionnel pour utilisateur non connecté
  items: OrderItem[];
  total: number;
  paymentStatus: "pending" | "paid" | "failed";
  stripeSessionId: string;
  shippingAddress: string;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateOrderInput {
  userId?: string;
  items: OrderItem[];
  total: number;
  paymentStatus: "pending" | "paid" | "failed";
  stripeSessionId?: string;
  shippingAddress: string;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
}
