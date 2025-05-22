import axios from "axios";
import { CartItem } from "../models/Cart.model";

const { hostname, protocol } = window.location;

const API_URL = import.meta.env.VITE_API_URL || `${protocol}//${hostname}:8080`; // Ensure the URL is correctly formatted
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
      cart
    );
    const checkoutSession = response.data;
    return checkoutSession;
  },
  getCheckoutSession: async (sessionId: string): Promise<any> => {
    const response = await axios.get(
      API_URL + `/payment/GetCheckoutSession/${sessionId}`,
      params
    );
    return response.data;
  },
};
