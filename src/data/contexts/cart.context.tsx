import { createContext, useContext, useState, ReactNode } from 'react';
import {Product} from "../../models/Product.model.ts";
import {CartContextType} from "../../models/Cart.model.ts";



const CartContext = createContext<CartContextType>({updateQuantity: () => {},cart: [], addToCart: () => {}, removeFromCart: () => {}, clearCart: () => {}, subtotal: 0})

// Define a provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);

  // Function to add a product to the cart
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const productExists = prevCart.some((item) => item.Id === product.Id);
      if (productExists) {
        return prevCart.map((item) =>
            item.Id === product.Id ? {...item, quantity: item.Quantity + 1} : item
        );
      } else {
        return [...prevCart, product];
      }
    });
  };
  const updateQuantity = (id: string, change: number) => {
    setCart((prevItems) =>
        prevItems.map((item) =>
            item.Id === id
                ? { ...item, quantity: Math.max(1, item.Quantity + change) }
                : item
        )
    );
  };

  // Function to remove a product from the cart
  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((product) => product.Id !== productId));
  };

  // Function to clear the cart
  const clearCart = () => {
    setCart([]);
  };

  const subtotal = cart.reduce(
      (sum, item) => sum + item.Price * item.Quantity,
      0
  );

  return (
   <CartContext.Provider value={{ cart,updateQuantity, addToCart, removeFromCart, clearCart,subtotal }}>
     {children}
   </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};
