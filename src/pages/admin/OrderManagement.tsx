import { useEffect } from "react";
import { Typography, Button } from "@material-tailwind/react";
import Table from "../../components/Table";
import { useOrder } from "../../contexts/Order.context";
import { Order } from "../../models/Order.model";

export default function OrderManagement() {
  const { orders, isLoading, fetchOrders, refreshOrders } = useOrder();

  useEffect(() => {
    fetchOrders();
  }, []);

  // Prepare table data with a colored badge for status
  const data =
    orders?.map((o: Order) => {
      let statusClass = "";
      switch (o.status) {
        case "processing":
          statusClass =
            "inline-block px-2 py-1 text-sm font-semibold bg-yellow-100 text-yellow-800 rounded-full";
          break;
        case "shipped":
          statusClass =
            "inline-block px-2 py-1 text-sm font-semibold bg-blue-100 text-blue-800 rounded-full";
          break;
        case "delivered":
          statusClass =
            "inline-block px-2 py-1 text-sm font-semibold bg-green-100 text-green-800 rounded-full";
          break;
        case "cancelled":
          statusClass =
            "inline-block px-2 py-1 text-sm font-semibold bg-red-100 text-red-800 rounded-full";
          break;
        default:
          statusClass =
            "inline-block px-2 py-1 text-sm font-semibold bg-gray-100 text-gray-800 rounded-full";
      }

      return {
        id: o.id,
        userId: o.userId || "Guest",
        items: o.items
          .map((i) => `${i.productName} x ${i.quantity}`)
          .join(", "),
        total: `$${o.total.toFixed(2)}`,
        paymentStatus: o.paymentStatus,
        status: <span className={statusClass}>{o.status}</span>,
        createdAt: o.createdAt ? new Date(o.createdAt).toLocaleString() : "",
      };
    }) || [];

  const columns = [
    "id",
    "userId",
    "total",
    "paymentStatus",
    "status",
    "createdAt",
  ];

  return (
    <div className="container mx-auto px-4 pt-[10%] pb-[10%]">
      <Typography variant="h2" className="mb-4">
        Order Management
      </Typography>

      <Table name="Orders" data={data} columns={columns} />
      <div className="flex justify-end mt-4">
        <Button onClick={refreshOrders} ripple={true}>
          Refresh
        </Button>
      </div>
    </div>
  );
}
