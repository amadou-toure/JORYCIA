import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Typography, Button, Chip } from "@material-tailwind/react";
import { Spinner } from "@material-tailwind/react";
import { useOrder } from "../contexts/Order.context";
import { Order as IOrder, OrderItem } from "../models/Order.model";
import { useProduct } from "../contexts/Product.context";
import { Product } from "../models/Product.model";
import MessageBox from "../components/MessageBox";
import { useNavigate } from "react-router-dom";

export default function OrderDetail() {
  const { id } = useParams();
  const { fetchOneOrder, isLoading, updateOrder } = useOrder();
  const [order, setOrder] = useState<IOrder | null>(null);
  const [dialog, setDialog] = useState({
    isOpen: false,
    title: "",
    message: "",
    buttons: null as React.ReactNode | null,
  });

  const handleCancelOrder = (order: IOrder) => {
    setDialog({
      isOpen: true,
      message: "Voulez vous vraiment annuler cette commande ?",
      title: "Annulation de la commande:",
      buttons: (
        <div className="flex flex-row gap-2 ml-5 ">
          <Button
            onClick={() => {
              const updatedOrder: IOrder = { ...order, status: "cancelled" };
              updateOrder(order.id, updatedOrder);
              setDialog({ ...dialog, isOpen: false });

              id ? fetchOneOrder(id) : null;
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

  useEffect(() => {
    if (id) {
      console.log("fetching order", id);
      fetchOneOrder(id)
        .then((o) => {
          setOrder(o);
        })
        .catch((err) => {
          console.error("Error fetching order:", err);
        });
    }
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 pt-[25%]">
        <Spinner className="h-16 w-16 text-gray-900/50" />;
      </div>
    );
  } else {
    if (order == null || order.items.length == 0 || order == undefined) {
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <Typography variant="h3">Commande non trouvée</Typography>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center bg-[#f8f5f1] justify-center min-h-screen py-8 gap-4 pt-[10%]">
          <MessageBox
            isOpen={dialog.isOpen}
            message={dialog.message}
            title={dialog.title}
            buttons={dialog.buttons}
          />
          <div className="self-start px-4 py-2">
            <Link to="/orders">
              <Button variant="outlined" size="sm">
                ← Retour aux commandes
              </Button>
            </Link>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 w-[80%] mb-6">
            <Typography variant="h4" className="mb-2">
              Détails de la commande
            </Typography>
            <Typography>Commande ID : {order.id}</Typography>
            <Typography>
              Date de la commande :{" "}
              {new Date(order.createdAt || "").toLocaleDateString()}
            </Typography>
            <Chip
              value={`Statut : ${order.status || "Inconnu"}`}
              color={
                order.status === "delivered"
                  ? "green"
                  : order.status === "processing"
                  ? "amber"
                  : order.status === "cancelled"
                  ? "red"
                  : "blue"
              }
              variant="ghost"
            />
            {order.status === "processing" ? (
              <Button
                className="bg-[#f8f5f1] my-3 outline text-red-900 w-[100%]"
                onClick={() => handleCancelOrder(order)}
              >
                Annuler la commande
              </Button>
            ) : null}
            <Typography>Nombre de produits : {order.items.length}</Typography>
            <div className="flex flex-col md:flex-col items-center justify-start gap-4 mt-4">
              {order.items.map((item) => (
                <ProductCardList
                  key={item.productId}
                  order={item}
                  status={order.status}
                />
              ))}
            </div>
          </div>
        </div>
      );
    }
  }
}

// src/components/ProductCardList.tsx
function ProductCardList({
  order,
  status,
}: {
  order: OrderItem;
  status: string;
}) {
  const { fetchOneProduct } = useProduct();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOneProduct(order.productId ?? "").then((p) => {
      setProduct(p || null);
      setIsLoading(false);
    });
  }, [order.productId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner className="h-16 w-16 text-gray-900/50" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-[90%] flex wrap ">
      <div className="border rounded-lg p-6 bg-white flex flex-col md:flex-row justify-between items-center gap-4 mb-4 w-full">
        {product?.image && product.image[0] ? (
          <img
            src={product.image[0]}
            className="h-32 w-32 object-cover rounded-lg"
          />
        ) : (
          <div className="h-24 w-24 bg-gray-100" />
        )}

        <div>
          <Typography variant="h5">{order.productName}</Typography>
          <Typography>
            {order.unitPrice} $CA x {order.quantity}
          </Typography>
          <Typography>Total: {order.unitPrice * order.quantity} $CA</Typography>
        </div>

        <div className="flex flex-col items-center justify-center gap-2 w-full md:w-auto">
          <Button
            className="w-[100%]"
            onClick={() => navigate(`/product/${order.productId}`)}
          >
            Acheter à nouveau
          </Button>
          {status === "delivered" ? (
            <Button className="bg-[#f8f5f1] text-gray-900 w-[100%]">
              Ajouter un avis
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
