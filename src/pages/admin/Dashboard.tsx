import React, { useEffect, useState } from "react";
import { Sidebar } from "../../components/admin/AdminSideBar";
import { ArrowUpRight, Box, ShoppingCart, Users } from "lucide-react";
import { useUser } from "../../contexts/user.context";
import { useProduct } from "../../contexts/Product.context";
import { useOrder } from "../../contexts/Order.context";
import { Order } from "../../models/Order.model";
import Table from "../../components/Table";
//import { useOrder } from "../../contexts/Order.context";
interface Metric {
  label: string;
  value: number;
  icon: React.ReactNode;
  change?: string;
}

export default function Dashboard() {
  const { users } = useUser();
  const { Products } = useProduct();
  const { orders } = useOrder();
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

  const [metrics, setMetrics] = useState<Metric[]>([
    {
      label: "Total Users",
      value: 0,
      icon: <Users className="w-6 h-6 text-blue-500" />,
      change: "+12% this month",
    },
    {
      label: "Total Products",
      value: 0,
      icon: <Box className="w-6 h-6 text-green-500" />,
      change: "+8% this month",
    },
    {
      label: "Total Orders",
      value: 0,
      icon: <ShoppingCart className="w-6 h-6 text-purple-500" />,
      change: "+5% this month",
    },
  ]);

  useEffect(() => {
    // TODO: fetch real data from ton API
    setMetrics([
      {
        label: "Total Users",
        value: users?.length || 0,
        icon: <Users className="w-6 h-6 text-blue-500" />,
        change: "+12% this month",
      },
      {
        label: "Total Products",
        value:
          Products && Products.length > 0
            ? Products.length * Products.reduce((acc, p) => acc + p.inStock, 0)
            : 0,
        icon: <Box className="w-6 h-6 text-green-500" />,
        change: "+8% this month",
      },
      {
        label: "Total Orders",
        value: orders?.length || 0,
        icon: <ShoppingCart className="w-6 h-6 text-purple-500" />,
        change: "+5% this month",
      },
    ]);
  }, []);

  return (
    <div className="flex h-screen pt-[90px]">
      <Sidebar />
      <div className="flex-1 flex-col items-center justify-center p-8 bg-[#f8f5f1] overflow-auto">
        {/* Metrics cards */}
        <div className="flex flex-wrap flex-row items-center justify-between mb-8">
          {metrics.map(({ label, value, icon, change }) => (
            <div
              key={label}
              className="bg-white rounded-xl shadow p-6 flex items-center"
            >
              <div className="p-3 bg-gray-100 rounded-full mr-4">{icon}</div>
              <div>
                <p className="text-lg font-semibold">{label}</p>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold mr-2">{value}</span>
                  {change && (
                    <span className="text-sm text-gray-500 flex items-center">
                      <ArrowUpRight className="w-4 h-4 inline mr-1" />
                      {change}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Produits */}
        <Table
          name="Produits"
          data={Products.map((p) => ({
            image: (
              <img
                src={p.image[0]}
                alt="img"
                className="w-16 h-16 object-cover rounded"
              />
            ),
            name: p.name,
            description: p.description,
            quantity: p.inStock,
            price: `${p.price} $CA`,
            notes: p.notes.join(", "),
          }))}
          columns={[
            "image",
            "name",
            "description",
            "quantity",
            "price",
            "notes",
          ]}
        />

        {/* Utilisateurs */}
        <Table
          name="Utilisateurs"
          data={
            users?.map((u) => ({
              name: `${u.firstName} ${u.lastName}`,
              email: u.email,
              phone: u.phone,
              address: u.address,
              role: u.role,
            })) ?? []
          }
          columns={["name", "email", "phone", "address", "role"]}
        />
        {/* Commandes */}

        <Table name="Orders" data={data} columns={columns} />
      </div>
    </div>
  );
}
