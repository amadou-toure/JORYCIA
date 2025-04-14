import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from "../../models/Product.model.ts";
import { CartContextType } from "../../models/Cart.model.ts";

const CartContext = createContext<CartContextType | undefined>(undefined);

// Define a provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>(() => {
    const storedCart = localStorage.getItem('jorycia_cart');
    console.log('Stored cart from localStorage:', storedCart); // Debug log
    try {
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        console.log('Parsed cart:', parsedCart); // Debug log
        return parsedCart;
      }
    } catch (error) {
      console.error('Error parsing cart from localStorage:', error); // Debug log
    }
    return [];
  });

  useEffect(() => {
    console.log('CartProvider rendering'); // Debug log
    console.log('Current cart state:', cart); // Debug log
    localStorage.setItem('jorycia_cart', JSON.stringify(cart));
    console.log('Updated localStorage with cart:', cart); // Debug log
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => String(item.ID) === String(product.ID));
      console.log("previous cart:",prevCart)
      if (existingItem) {
        console.log('Product exists, updating quantity.');
        return prevCart.map((item) =>
          String(item.ID) === String(product.ID)
            ? { ...item, Quantity: item.Quantity + 1 }
            : item
        );
      } else {
        console.log('Product does not exist, adding to cart.');
        return [...prevCart, { ...product, Quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id: string, change: number) => {
    setCart((prevItems) =>
        prevItems.map((item) =>
            item.ID === id
                ? { ...item, Quantity: Math.max(1, item.Quantity + change) }
                : item
        )
    );
  };

  // Function to remove a product from the cart
  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((product) => product.ID !== productId));
  };

  // Function to clear the cart
  const clearCart = () => {
    setCart([]);
  };

  const subtotal = cart.reduce(
      (sum, item) => sum + item.Price * item.Quantity,
      0
  );

  console.log('CartProvider rendering'); // Debug log
  console.log('Current cart state:', cart); // Debug log

  return (
   <CartContext.Provider value={{ cart, updateQuantity, addToCart, removeFromCart, clearCart, subtotal }}>
     {children}
   </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
