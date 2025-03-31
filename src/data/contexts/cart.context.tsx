import { createContext, useContext, useState, ReactNode } from 'react';


export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  bg?: string;
  description: string;
  // Add other product properties as needed
}

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType>({cart: [], addToCart: () => {}, removeFromCart: () => {}, clearCart: () => {}})

// Define a provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);

  // Function to add a product to the cart
  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Function to remove a product from the cart
  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== productId));
  };

  // Function to clear the cart
  const clearCart = () => {
    setCart([]);
  };

  return (
   <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
     {children}
   </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};
