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
import { SuccessToast, ErrorToast } from "./Toast";

interface OrderContextType {
  orders: Order[];
  userOrder: Order[];
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
  updateOrder: (id: string, order: Order) => Promise<void>;
  refreshOrders: () => void;
  fetchUser_Orders: () => Promise<Order[]>;
  deleteOrder: (id: string) => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const [userOrder, setUserOrder] = useState<Order[]>([]);
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
      ErrorToast("L'utilisateur n'est pas connecter !");
      return [];
    }
    setIsLoading(true);
    try {
      const result = await OrderService.getUser_Orders(user.id);
      const userOrders: Order[] = (result as any).data ?? (result as any);
      setUserOrder([]);
      setUserOrder(userOrders);
      return userOrders;
    } catch (error) {
      ErrorToast("Error fetching user orders: /n" + error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrder = async (id: string, order: Order) => {
    setIsLoading(true);
    try {
      const responseStatus = await OrderService.updateOrder(id, order);
      responseStatus == 200
        ? SuccessToast("Commande mise a jour !")
        : responseStatus == 404
        ? ErrorToast("Commande innexistante !")
        : ErrorToast("une erreur s'est produite: " + responseStatus);
    } catch (error: any) {
      console.log("error", error);
      error.status == 404
        ? ErrorToast("Commande innexistante !")
        : ErrorToast("une erreur s'est produite: " + error);
      ErrorToast("une erreur s'est produite");
    } finally {
      setIsLoading(false);
    }
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
        userOrder,
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
