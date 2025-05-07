import { Product } from "./Product.model.ts";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  subtotal: number;
  updateQuantity: (id: string, change: number) => void;
  clearCart: () => void;
}
//i think the quantity property should be here
