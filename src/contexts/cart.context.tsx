import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { CartContextType, CartItem } from "../models/Cart.model.ts";
import { Product } from "../models/Product.model.ts";

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  subtotal: 0,
  updateQuantity: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem("jorycia_cart");
    try {
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        return parsedCart;
      }
    } catch (error) {
      console.error("Error parsing cart:", error);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("jorycia_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity: number = 1) => {
    const Item: CartItem = {
      product: product,
      quantity: quantity,
    };
    setCart((prevCart) => {
      // Recherche d'un item existant : comparer avec item.product.id
      const existingItem = prevCart.find(
        (item) => String(item.product.id) === String(product.id)
      );

      if (existingItem) {
        return prevCart.map((item) =>
          String(item.product.id) === String(product.id)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      console.log("Ajout d'un item :", Item);
      console.log("Cart :", prevCart);

      // Ajout du nouvel item sans écraser la structure CartItem
      return [...prevCart, Item];
    });
  };

  const updateQuantity = (id: string, change: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = cart.reduce((sum: number, item: CartItem) => {
    if (!item.product) return sum;
    return sum + item.product.price * item.quantity;
  }, 0);
  return (
    <CartContext.Provider
      value={{
        cart,
        updateQuantity,
        addToCart,
        removeFromCart,
        clearCart,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
