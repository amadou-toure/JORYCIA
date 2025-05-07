import { createContext, useContext, useState, ReactNode } from "react";
import { paymentService } from "../services/payment.service";
import { useCart } from "./cart.context";
import { CartItem } from "../models/Cart.model";
import { loadStripe } from "@stripe/stripe-js";
interface PaymentContextType {
  isVerifying: boolean;
  error: string | null;
  // verifySession: (sessionId: string) => Promise<void>;
  proceedToPayment: (cart: CartItem[]) => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider = ({ children }: { children: ReactNode }) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { clearCart } = useCart();

  // const verifySession = useCallback(
  //   async (sessionId: string) => {
  //     if (!sessionId) {
  //       setError("No session ID found");
  //       return;
  //     }

  //     setIsVerifying(true);
  //     setError(null);

  //     try {
  //       await verifyPayment(sessionId);
  //       clearCart();
  //     } catch (err) {
  //       setError(
  //         err instanceof Error ? err.message : "Failed to verify payment"
  //       );
  //     } finally {
  //       setIsVerifying(false);
  //     }
  //   },
  //   [clearCart]
  // );
  const stripePromise = loadStripe(
    "pk_test_51RFfkU1rBEIPaA7x3zBDB934wHBo7GP8PWNwaSHdTkcT5kJPygmCzRRlpqPN6PBjkyaflo2uaVUPyUsHmrLkHnOz00GirAFY83"
  );

  async function redirectToCheckout(sessionId: string) {
    const stripe = await stripePromise;
    if (!stripe) throw new Error("Stripe failed to load");

    const result = await stripe.redirectToCheckout({ sessionId });

    if (result.error) {
      console.error(result.error.message);
      // Gère l'erreur d'affichage si besoin
    }
  }
  const proceedToPayment = async (cart: CartItem[]) => {
    try {
      const checkoutSession = await paymentService.proceedToPayment(cart);
      redirectToCheckout(checkoutSession);
    } catch (error) {
      console.error("Failed to proceed to payment:", error);
      throw error;
    }
  };
  return (
    <PaymentContext.Provider
      value={{
        isVerifying,
        error,
        // verifySession,
        proceedToPayment,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("usePayment must be used within a PaymentProvider");
  }
  return context;
};
