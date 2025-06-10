import { useState, useEffect } from "react";
import { CartItem } from "./useCart";

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    landmark?: string;
  };
  customerInfo: {
    name: string;
    phone: string;
    email?: string;
  };
  paymentMethod: "cod" | "online";
  paymentStatus: "pending" | "completed" | "failed";
  orderStatus:
    | "placed"
    | "confirmed"
    | "preparing"
    | "out_for_delivery"
    | "delivered"
    | "cancelled";
  estimatedDeliveryTime: string;
  actualDeliveryTime?: string;
  deliveryBoy?: {
    name: string;
    phone: string;
    trackingId: string;
  };
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem("meatDelicacyOrders");
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (error) {
        console.error("Error loading orders from localStorage:", error);
      }
    }
  }, []);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("meatDelicacyOrders", JSON.stringify(orders));
  }, [orders]);

  const createOrder = (
    orderData: Omit<Order, "id" | "createdAt" | "updatedAt">,
  ) => {
    const newOrder: Order = {
      ...orderData,
      id: `MD${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order["orderStatus"]) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              orderStatus: status,
              updatedAt: new Date().toISOString(),
              ...(status === "delivered" && {
                actualDeliveryTime: new Date().toISOString(),
              }),
            }
          : order,
      ),
    );
  };

  const updatePaymentStatus = (
    orderId: string,
    status: Order["paymentStatus"],
  ) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              paymentStatus: status,
              updatedAt: new Date().toISOString(),
            }
          : order,
      ),
    );
  };

  const assignDeliveryBoy = (
    orderId: string,
    deliveryBoy: Order["deliveryBoy"],
  ) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              deliveryBoy,
              updatedAt: new Date().toISOString(),
            }
          : order,
      ),
    );
  };

  const getOrderById = (orderId: string) => {
    return orders.find((order) => order.id === orderId);
  };

  const getOrdersByUser = (userId: string) => {
    return orders.filter((order) => order.userId === userId);
  };

  const getOrdersByStatus = (status: Order["orderStatus"]) => {
    return orders.filter((order) => order.orderStatus === status);
  };

  const getTodayOrders = () => {
    const today = new Date().toDateString();
    return orders.filter(
      (order) => new Date(order.createdAt).toDateString() === today,
    );
  };

  const getRevenueStats = () => {
    const today = new Date().toDateString();
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();

    const todayRevenue = orders
      .filter(
        (order) =>
          new Date(order.createdAt).toDateString() === today &&
          order.paymentStatus === "completed",
      )
      .reduce((sum, order) => sum + order.finalAmount, 0);

    const monthlyRevenue = orders
      .filter(
        (order) =>
          new Date(order.createdAt).getMonth() === thisMonth &&
          new Date(order.createdAt).getFullYear() === thisYear &&
          order.paymentStatus === "completed",
      )
      .reduce((sum, order) => sum + order.finalAmount, 0);

    const totalRevenue = orders
      .filter((order) => order.paymentStatus === "completed")
      .reduce((sum, order) => sum + order.finalAmount, 0);

    return {
      today: todayRevenue,
      monthly: monthlyRevenue,
      total: totalRevenue,
    };
  };

  return {
    orders,
    loading,
    createOrder,
    updateOrderStatus,
    updatePaymentStatus,
    assignDeliveryBoy,
    getOrderById,
    getOrdersByUser,
    getOrdersByStatus,
    getTodayOrders,
    getRevenueStats,
  };
};
