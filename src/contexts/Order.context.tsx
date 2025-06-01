import OrderService from "../services/Order.service";
import { CartItem } from "../models/Cart.model";
import { useUser } from "./user.context";
import { CreateOrderInput, Order } from "../models/Order.model";
import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useContext,
} from "react";

interface OrderContextType {
  orders: Order[];
  isLoading: Boolean;
  createOrder: (order: CreateOrderInput) => Promise<Order | undefined>;
  fetchOrders: () => Promise<Order[]>;
  fetchOneOrder: (id: string) => Promise<Order>;
  convertCartToOrder: (
    items: CartItem[],
    sessionId: string,
    shippingAddress: string,
    PaymentStatus: "pending" | "paid" | "failed",
    status: "processing" | "shipped" | "delivered" | "cancelled"
  ) => CreateOrderInput;
  updateOrder: (id: string, order: Order) => Promise<Order>;
  refreshOrders: () => void;
  fetchUser_Orders: () => Promise<Order[]>;
  deleteOrder: (id: string) => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();

  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const fetchOrders = async (): Promise<Order[]> => {
    setIsLoading(true);
    try {
      const result = await OrderService.getOrders();
      const ordersData: Order[] = (result as any).data ?? (result as any);
      setOrders(ordersData);
      console.log("Fetched orders:", ordersData);
      return ordersData;
    } catch (error) {
      console.error("Error fetching orders:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOneOrder = async (id: string) => {
    setIsLoading(true);
    try {
      const result = await OrderService.getOrder(id);
      return result;
    } catch (error) {
      console.error("Error fetching order:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const convertCartToOrder = (
    items: CartItem[],
    sessionId: string,
    shippingAddress: string,
    PaymentStatus: "pending" | "paid" | "failed",
    status: "processing" | "shipped" | "delivered" | "cancelled"
  ) => {
    const orderItems: CreateOrderInput = {
      items: items.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        unitPrice: item.product.price,
      })),
      total: items.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      ),
      userId: user?.id,
      paymentStatus: PaymentStatus,
      stripeSessionId: sessionId,
      shippingAddress,
      status: status,
    };
    return orderItems;
  };

  const createOrder = async (order: CreateOrderInput) => {
    setIsLoading(true);
    try {
      const createdOrder: Order = await OrderService.createOrder(order);
      return createdOrder;
    } catch (error) {
      console.error("Error creating Order:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUser_Orders = async (): Promise<Order[]> => {
    if (!user || !user.id) {
      console.error("User not logged in");
      return [];
    }
    setIsLoading(true);
    try {
      const result = await OrderService.getUser_Orders(user.id);
      const userOrders: Order[] = (result as any).data ?? (result as any);
      setOrders(userOrders);
      return userOrders;
    } catch (error) {
      console.error("Error fetching user orders:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrder = async (id: string, order: Order) => {
    const response = await OrderService.updateOrder(id, order);
    const updatedOrder = response.data;
    setOrders((prev) =>
      prev.map((o) => (o.id === updatedOrder.id ? updatedOrder : o))
    );
    return updatedOrder;
  };

  const deleteOrder = async (id: string) => {
    await OrderService.deleteOrder(id);
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  const refreshOrders = async () => {
    setOrders([]);
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <OrderContext.Provider
      value={{
        isLoading,
        orders,
        createOrder,
        fetchOrders,
        fetchOneOrder,
        updateOrder,
        refreshOrders,
        deleteOrder,
        convertCartToOrder,
        fetchUser_Orders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within a OrderProvider");
  }
  return context;
};
