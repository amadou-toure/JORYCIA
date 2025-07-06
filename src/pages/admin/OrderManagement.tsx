import { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Spinner,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import Table from "../../components/Table";
import { useOrder } from "../../contexts/Order.context";
import { useUser } from "../../contexts/user.context";
import { Order } from "../../models/Order.model";
import { Sidebar } from "../../components/admin/AdminSideBar";
import MessageBox from "../../components/MessageBox";

export default function OrderManagement() {
  const { orders, isLoading, fetchOrders, refreshOrders, updateOrder } =
    useOrder();

  const [dialog, setDialog] = useState({
    isOpen: false,
    title: "",
    message: "",
    buttons: null as React.ReactNode | null,
  });
  const handleStatusUpdate = (
    order: Order,
    status: "processing" | "shipped" | "delivered" | "cancelled"
  ) => {
    setDialog({
      isOpen: true,
      message:
        "Vous êtes sur le point de metter a jour le status de la commande. Appuyer sur ok pour continuer",
      title: "Mettre à jour le status:",
      buttons: (
        <div className="flex flex-row gap-2 ml-5 ">
          <Button
            onClick={() => {
              const updatedOrder = { ...order, status };
              updateOrder(updatedOrder.id, updatedOrder);
              setDialog({ ...dialog, isOpen: false });
            }}
            color="red"
          >
            confirmer
          </Button>
          <Button
            onClick={() => {
              setDialog({ ...dialog, isOpen: false });
            }}
          >
            Annuler
          </Button>
        </div>
      ),
    });
  };
  const { users } = useUser();

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
        user:
          users?.find((u) => u.id === o.userId)?.firstName +
          " " +
          users?.find((u) => u.id === o.userId)?.lastName,
        items: o.items
          .map((i) => `${i.productName} x ${i.quantity}`)
          .join(", "),
        total: `CA$ ${o.total.toFixed(2)}`,
        status: (
          <Menu>
            <MenuHandler>
              <button className={statusClass}>{o.status}</button>
            </MenuHandler>
            <MenuList className="flex flex-col items-center justify-center gap-3">
              <MenuItem
                className="flex items-center justify-center text-sm font-semibold bg-yellow-100 text-yellow-800 rounded-full"
                onClick={() => handleStatusUpdate(o, "processing")}
              >
                Pending
              </MenuItem>
              <MenuItem
                className="flex items-center justify-center text-sm font-semibold bg-blue-100 text-blue-800 rounded-full"
                onClick={() => handleStatusUpdate(o, "shipped")}
              >
                Shipped
              </MenuItem>
              <MenuItem
                className="flex items-center justify-center text-sm font-semibold bg-green-100 text-green-800 rounded-full"
                onClick={() => handleStatusUpdate(o, "delivered")}
              >
                Delivered
              </MenuItem>
              <MenuItem
                className="flex items-center justify-center text-sm font-semibold bg-red-100 text-red-800 rounded-full"
                onClick={() => handleStatusUpdate(o, "cancelled")}
              >
                Cancelled
              </MenuItem>
            </MenuList>
          </Menu>
        ),
        createdAt: o.createdAt ? new Date(o.createdAt).toLocaleString() : "",
      };
    }) || [];

  const columns = ["id", "user", "total", "status", "createdAt"];

  const [filteredData, setFilteredData] = useState(data);

  return isLoading ? (
    <div className="bg-[#f8f5f1] flex justify-center items-center min-h-screen">
      <Spinner height={100} width={100} />
    </div>
  ) : (
    <div className="space-y-6">
      <div className="flex-1 lg:pt-[10%] pt-[25%] flex-col items-center justify-center p-8 bg-[#f8f5f1] overflow-auto">
        <Sidebar />

        <MessageBox
          isOpen={dialog.isOpen}
          message={dialog.message}
          title={dialog.title}
          buttons={dialog.buttons}
        />
        <Typography variant="h4">Orders</Typography>

        <input
          type="text"
          placeholder="Rechercher par id,nom ou status"
          className="px-4 py-2 border border-gray-300 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => {
            const value = e.target.value.toLowerCase();
            const filtered = orders?.filter((o) => {
              const user = users?.find((u) => u.id === o.userId);
              const name = (
                user?.firstName +
                " " +
                user?.lastName
              ).toLowerCase();
              const status = o.status?.toLowerCase();
              const id = o.id?.toLowerCase();
              return (
                name.includes(value) ||
                status.includes(value) ||
                id.includes(value)
              );
            });
            const mapped =
              filtered?.map((o: Order) => {
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
                  user:
                    users?.find((u) => u.id === o.userId)?.firstName +
                    " " +
                    users?.find((u) => u.id === o.userId)?.lastName,
                  items: o.items
                    .map((i) => `${i.productName} x ${i.quantity}`)
                    .join(", "),
                  total: `CA$ ${o.total.toFixed(2)}`,
                  status: (
                    <Menu>
                      <MenuHandler>
                        <button className={statusClass}>{o.status}</button>
                      </MenuHandler>
                      <MenuList className="flex flex-col items-center justify-center gap-3">
                        <MenuItem
                          className="flex items-center justify-center text-sm font-semibold bg-yellow-100 text-yellow-800 rounded-full"
                          onClick={() => handleStatusUpdate(o, "processing")}
                        >
                          Pending
                        </MenuItem>
                        <MenuItem
                          className="flex items-center justify-center text-sm font-semibold bg-blue-100 text-blue-800 rounded-full"
                          onClick={() => handleStatusUpdate(o, "shipped")}
                        >
                          Shipped
                        </MenuItem>
                        <MenuItem
                          className="flex items-center justify-center text-sm font-semibold bg-green-100 text-green-800 rounded-full"
                          onClick={() => handleStatusUpdate(o, "delivered")}
                        >
                          Delivered
                        </MenuItem>
                        <MenuItem
                          className="flex items-center justify-center text-sm font-semibold bg-red-100 text-red-800 rounded-full"
                          onClick={() => handleStatusUpdate(o, "cancelled")}
                        >
                          Cancelled
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  ),
                  createdAt: o.createdAt
                    ? new Date(o.createdAt).toLocaleString()
                    : "",
                };
              }) || [];
            setFilteredData(mapped);
          }}
        />

        <Table name="Orders" data={filteredData} columns={columns} />
        <div className="flex justify-end ">
          <Button onClick={refreshOrders} ripple={true}>
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
}
