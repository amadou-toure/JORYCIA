import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { usePayment } from "../contexts/payment.context";
import { useOrder } from "../contexts/Order.context";
import { useCart } from "../contexts/cart.context";

const SuccessPayment = () => {
  const [searchParams] = useSearchParams();
  const { cart } = useCart();
  const { error, checkoutSession, getCheckoutSession } = usePayment();
  const sessionId: string | null = searchParams.get("session_id");
  const { convertCartToOrder, createOrder, isLoading } = useOrder();
  const [orderCreated, setOrderCreated] = useState(false);

  // 1. Fetch session when sessionId is available
  useEffect(() => {
    if (sessionId) {
      getCheckoutSession(sessionId);
      console.log("getting session id:" + sessionId);
    }
  }, [sessionId]);

  // 2. Transfer cart to order only once when payment is confirmed and not yet executed
  useEffect(() => {
    if (
      sessionId &&
      checkoutSession &&
      checkoutSession.payment_status === "paid" &&
      !orderCreated
    ) {
      const neWorder = convertCartToOrder(
        cart,
        sessionId,
        checkoutSession.shipping_address,
        checkoutSession.payment_status,
        "processing"
      );

      const order = createOrder(neWorder);
      order != undefined || null
        ? setOrderCreated(true)
        : setOrderCreated(false);
      console.log(order);
    }
  }, [sessionId, checkoutSession, cart, orderCreated]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f5f1] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f8f5f1] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-serif mb-4">
            Payment Verification Failed
          </h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <Link
            to="/cart"
            className="inline-block bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors"
          >
            Return to Cart
          </Link>
        </div>
      </div>
    );
  }
  if (
    (checkoutSession && checkoutSession.payment_status !== "paid") ||
    checkoutSession === null ||
    checkoutSession === undefined
  ) {
    return (
      <div className="min-h-screen bg-[#f8f5f1] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-serif mb-4">
            Payment was not successful
          </h2>
          <p className="text-gray-600 mb-8">
            Please try again or contact us for assistance.
          </p>
          <Link
            to="/cart"
            className="inline-block bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors"
          >
            Return to Cart
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f5f1] flex items-center justify-center">
      <div className="text-center">
        <div className="text-green-500 mb-4">
          <CheckCircle2 className="w-16 h-16 mx-auto" />
        </div>
        <h2 className="text-2xl font-serif mb-4">Payment Successful!</h2>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. We'll send you an email confirmation
          shortly.
        </p>
        <div className="space-y-4">
          {orderCreated ? <p>New Order placed </p> : <p>No Order Created</p>}
          <Link
            to="/collections"
            className="inline-block bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
          <div>
            <Link
              to="/orders"
              className="text-gray-600 hover:text-gray-900 underline"
            >
              View Order Status
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPayment;
