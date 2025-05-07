import axios from "axios";
import { CartItem } from "../models/Cart.model";
const API_URL = import.meta.env.VITE_API_URL; // Ensure the URL is correctly formatted
const params = {
  headers: {
    Authorization: `${localStorage.getItem("token")}`,
  },
};
export const paymentService = {
  proceedToPayment: async (cart: CartItem[]): Promise<string> => {
    console.log(cart);
    const response = await axios.post(
      API_URL + "/payment/ProceedToPayment/",
      cart,
      params
    );
    const checkoutSession = response.data;
    return checkoutSession;
  },
  verifyPayment: async (sessionId: string): Promise<void> => {
    const response = await axios.get(
      API_URL + `/payment/VerifyPayment/${sessionId}`,
      params
    );
    return response.data;
  },
};
