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
import { ErrorToast, SuccessToast } from "../../contexts/Toast";

export default function OrderManagement() {
  const { orders, isLoading, fetchOrders, refreshOrders, updateOrder } =
    useOrder();

  const [dialog, setDialog] = useState({
    isOpen: false,
    title: "",
    message: "",
    buttons: null as React.ReactNode | null,
  });
  const [selectedOrder, setSelectedOrder] = useState<Order>({
    id: "",
    userId: "",
    items: [],
    total: 0,
    status: "processing",
    paymentStatus: "paid",
    shippingAddress: "",
    stripeSessionId: "",
  });
  const handleStatusUpdate = (
    order: Order,
    status: "processing" | "shipped" | "delivered" | "cancelled"
  ) => {
    setSelectedOrder(order);
    setSelectedOrder({ ...selectedOrder, status: status });
    setDialog({
      isOpen: true,
      message:
        "Vous êtes sur le point de metter a jour le status de la commande. Appuyer sur ok pour continuer",
      title: "Mettre à jour le status:",
      buttons: (
        <div className="flex flex-row gap-2 ml-5 ">
          <Button
            onClick={() => {
              try {
                const updated = { ...selectedOrder, status };
                console.log("updating ", order);
                setSelectedOrder(updated);
                updateOrder(updated.id, updated);
                setDialog({ ...dialog, isOpen: false });
                SuccessToast("Status mis a jour !");
              } catch (error: any) {
                setDialog({ ...dialog, isOpen: false });
                if (error.response?.status === 404) {
                  ErrorToast("la commande n'existe pas");
                } else {
                  ErrorToast("une errreur s'est produite");
                }
              }
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
          <Menu
          //open={openMenu}
          // handler={() => {
          //   setOpenMenu(!openMenu);
          // }}
          >
            <MenuHandler>
              <button className={statusClass}>{o.status}</button>
            </MenuHandler>
            <MenuList>
              <MenuItem onClick={() => handleStatusUpdate(o, "shipped")}>
                Shipped
              </MenuItem>
              <MenuItem onClick={() => handleStatusUpdate(o, "delivered")}>
                Delivered
              </MenuItem>
              <MenuItem onClick={() => handleStatusUpdate(o, "cancelled")}>
                Cancelled
              </MenuItem>
            </MenuList>
          </Menu>
        ),
        createdAt: o.createdAt ? new Date(o.createdAt).toLocaleString() : "",
      };
    }) || [];

  const columns = ["user", "total", "status", "createdAt"];

  return isLoading ? (
    <div className="bg-[#f8f5f1] flex justify-center items-center min-h-screen">
      <Spinner height={100} width={100} />
    </div>
  ) : (
    <div className="flex-1 lg:pt-[10%] pt-[25%] flex-col items-center justify-center p-8 bg-[#f8f5f1] overflow-auto">
      <Sidebar />

      <MessageBox
        isOpen={dialog.isOpen}
        message={dialog.message}
        title={dialog.title}
        buttons={dialog.buttons}
      />

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
