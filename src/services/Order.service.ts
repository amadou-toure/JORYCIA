import axios from "axios";
import { CreateOrderInput, Order } from "../models/Order.model";

const API_URL = import.meta.env.VITE_API_URL || "https://api.jorycia.ca";
// Ensure the URL is correctly formatted
const params = {
  headers: {
    Authorization: `${localStorage.getItem("token")}`,
  },
};

const OrderService = {
  async createOrder(order: CreateOrderInput) {
    console.log("creating order ...");
    const response = await axios.post(`${API_URL}/order/`, order, params);
    return response.data;
  },
  async getOrder(id: string) {
    const response = await axios.get(`${API_URL}/order/${id}`, params);
    return response.data;
  },
  async getOrders() {
    const response = await axios.get(`${API_URL}/order/`, params);
    return response.data;
  },
  //here i just want to get the status because a part from the status, the api also sends a string but it is useless
  async updateOrder(id: string, order: Order): Promise<number> {
    const response = await axios.put(`${API_URL}/order/${id}`, order, params);
    return response.status;
  },
  async deleteOrder(id: string) {
    const response = await axios.delete(`${API_URL}/order/${id}`, params);
    return response.data;
  },
  async getUser_Orders(id: string) {
    const response = await axios.get(`${API_URL}/order/user/${id}`, params);
    return response.data;
  },
};

export default OrderService;
