export interface OrderItem {
  productId?: string;
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
  shippingAddress: StripeAddress;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface StripeAddress {
  city: string;
  country: string;
  line1: string;
  line2?: string;
  postal_code: string;
  state: string;
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
