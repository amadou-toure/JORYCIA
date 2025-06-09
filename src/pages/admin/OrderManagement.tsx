import { useEffect } from "react";
import { Typography, Button, Spinner } from "@material-tailwind/react";
import Table from "../../components/Table";
import { useOrder } from "../../contexts/Order.context";
import { Order } from "../../models/Order.model";
import { Sidebar } from "../../components/admin/AdminSideBar";

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

  const columns = ["userId", "total", "status", "paymentStatus", "createdAt"];

  return isLoading ? (
    <div className="bg-[#f8f5f1] flex justify-center items-center min-h-screen">
      <Spinner height={100} width={100} />
    </div>
  ) : (
    <div className="flex-1 lg:pt-[10%] pt-[25%] flex-col items-center justify-center p-8 bg-[#f8f5f1] overflow-auto">
      <Sidebar />
      <Typography variant="h2">Order Management</Typography>
      <Table name="Orders" data={data} columns={columns} />
      <div className="flex justify-end ">
        <Button onClick={refreshOrders} ripple={true}>
          Refresh
        </Button>
      </div>
    </div>
  );
}
