import { useEffect } from "react";
import { Typography, Button } from "@material-tailwind/react";
import Table from "../components/Table";
import { useOrder } from "../contexts/Order.context";
import { Order } from "../models/Order.model";
import { Link } from "react-router-dom";

export default function Orders() {
  const { orders, isLoading, fetchUser_Orders } = useOrder();

  useEffect(() => {
    fetchUser_Orders();
  }, []);

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
        total: `$${o.total.toFixed(2)}`,
        paymentStatus: o.paymentStatus,
        status: <span className={statusClass}>{o.status}</span>,
        createdAt: o.createdAt ? new Date(o.createdAt).toLocaleString() : "",
        details: (
          <Link
            to={`/orders/${o.id}`}
            className="text-blue-600 hover:underline"
          >
            Voir détails
          </Link>
        ),
      };
    }) || [];

  const columns = [
    "id",
    "total",
    "paymentStatus",
    "status",
    "createdAt",
    "details",
  ];

  return (
    <div className="container mx-auto px-4 pt-[8%] w-full pb-20">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <Typography variant="h2" className="mb-6 font-serif text-gray-800">
          Mes Commandes
        </Typography>
        <hr className="mb-6 border-t border-gray-200" />

        <Table name="Mes Commandes" data={data} columns={columns} />

        <div className="flex justify-end mt-4">
          <Button
            onClick={fetchUser_Orders}
            className="bg-black hover:bg-gray-800 text-white rounded-xl shadow-sm"
          >
            Rafraîchir
          </Button>
        </div>
      </div>
    </div>
  );
}
