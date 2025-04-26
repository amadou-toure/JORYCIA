export interface Product {
  id: string;
  name: string;
  price: number;
  notes: string[];
  rating: number;
  image: string[];
  quantity: number;
  description: string;
  metadata: string[];
  stripeProductID: string;
  stripePriceID: string;
  // Add other product properties as needed
}
