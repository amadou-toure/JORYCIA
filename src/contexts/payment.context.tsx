import { createContext, useContext, useState, ReactNode } from "react";
import { paymentService } from "../services/payment.service";
import { useCart } from "./cart.context";
import { CartItem } from "../models/Cart.model";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutSessionType } from "../models/Checkout.model";
interface PaymentContextType {
  isVerifying: boolean;
  error: string | null;
  checkoutSession: CheckoutSessionType | null;
  getCheckoutSession: (sessionId: string | null) => void;
  proceedToPayment: (cart: CartItem[]) => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider = ({ children }: { children: ReactNode }) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkoutSession, setCheckoutSession] = useState<CheckoutSessionType>({
    status: "",
    payment_status: "",
    shipping_address: "",
    session_id: "",
  });

  const stripePromise = loadStripe(
    "pk_test_51RFfkU1rBEIPaA7x3zBDB934wHBo7GP8PWNwaSHdTkcT5kJPygmCzRRlpqPN6PBjkyaflo2uaVUPyUsHmrLkHnOz00GirAFY83"
  );

  async function redirectToCheckout(sessionId: string) {
    const stripe = await stripePromise;
    if (!stripe) throw new Error("Stripe failed to load");
    const result = await stripe.redirectToCheckout({ sessionId });
    if (result.error) {
      console.error(result.error.message);
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
  const getCheckoutSession = async (sessionId: string | null) => {
    try {
      setIsVerifying(true);
      const checkoutSession =
        sessionId != null
          ? await paymentService.getCheckoutSession(sessionId)
          : null;
      if (checkoutSession == null) {
        throw error;
      }
      sessionId != null
        ? setCheckoutSession({
            status: checkoutSession.status,
            payment_status: checkoutSession.payment_status,
            shipping_address: checkoutSession.shipping_address,
            session_id: sessionId,
          })
        : null;
      setIsVerifying(false);
    } catch (error: any) {
      console.error("Failed to get checkout session:", error);
      // You can also rethrow the error if you want it to be handled by the outer catch block
      throw error;
    }
  };

  return (
    <PaymentContext.Provider
      value={{
        isVerifying,
        error,
        checkoutSession,
        getCheckoutSession,
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
