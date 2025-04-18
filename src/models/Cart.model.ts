import {Product} from "./Product.model.ts";

export interface CartContextType {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    subtotal : number;
    updateQuantity: (id: string, change: number) => void;
    clearCart: () => void;
}