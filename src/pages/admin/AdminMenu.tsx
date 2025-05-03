import { useEffect, useState } from "react";
import { Product } from "../../models/Product.model";
import { User } from "../../models/User.model";
import { Order } from "../../models/Order.model";
import { useProduct } from "../../contexts/Product.context";
import { useUser } from "../../contexts/user.context";

const AdminMenu = () => {
  const { Products } = useProduct();
  const { users } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);

  return (
    <div className="p-10 bg-[#f8f5f1] min-h-screen space-y-10">
      <h1 className="text-3xl font-serif text-gray-800">Dashboard Admin</h1>

      {/* Produits */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-serif mb-4 text-gray-700">Produits</h2>
        <div className="overflow-auto">
          <table className="min-w-full text-sm text-left text-gray-800">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Nom</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Quantité</th>
                <th className="px-4 py-2">Prix</th>
                <th className="px-4 py-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {Products.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="px-4 py-2">
                    {p.image?.[0] && (
                      <img
                        src={`data:image/png;base64,${p.image[0]}`}
                        alt="img"
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="px-4 py-2">{p.name}</td>
                  <td className="px-4 py-2">{p.description}</td>
                  <td className="px-4 py-2">{p.quantity}</td>
                  <td className="px-4 py-2">{p.price} FCFA</td>
                  <td className="px-4 py-2">{p.notes.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Utilisateurs */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-serif mb-4 text-gray-700">Utilisateurs</h2>
        <div className="overflow-auto">
          <table className="min-w-full text-sm text-left text-gray-800">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2">Nom</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Téléphone</th>
                <th className="px-4 py-2">Adresse</th>
                <th className="px-4 py-2">Rôle</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((u) => (
                <tr key={u.id} className="border-t">
                  <td className="px-4 py-2">
                    {u.firstName} {u.lastName}
                  </td>
                  <td className="px-4 py-2">{u.email}</td>
                  <td className="px-4 py-2">{u.phone}</td>
                  <td className="px-4 py-2">{u.address}</td>
                  <td className="px-4 py-2 capitalize">{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Commandes */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-serif mb-4 text-gray-700">Commandes</h2>
        <div className="overflow-auto">
          <table className="min-w-full text-sm text-left text-gray-800">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2">Client</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Statut</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-t">
                  <td className="px-4 py-2">{o.userId}</td>
                  <td className="px-4 py-2">{o.totalPrice} FCFA</td>
                  <td className="px-4 py-2 capitalize">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        o.paymentStatus === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : o.paymentStatus === "paid"
                          ? "bg-green-100 text-green-700"
                          : o.paymentStatus === "canceled"
                          ? "bg-red-100 text-red-700"
                          : ""
                      }`}
                    >
                      {o.paymentStatus || "n/a"}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {o.createdAt
                      ? new Date(o.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminMenu;
