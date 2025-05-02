import { Link } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10 w-full max-w-md space-y-6">
        <h2 className="text-2xl font-serif text-gray-800 text-center font-semibold">
          Menu d'administration
        </h2>
        <nav className="space-y-4">
          <Link
            to="/admin/products"
            className="block w-full text-center bg-black text-white py-2 px-4 rounded-xl hover:bg-gray-800 transition font-serif"
          >
            Gestion des Produits
          </Link>
          <Link
            to="/admin/users"
            className="block w-full text-center bg-black text-white py-2 px-4 rounded-xl hover:bg-gray-800 transition font-serif"
          >
            Gestion des Utilisateurs
          </Link>
          <Link
            to="/admin/orders"
            className="block w-full text-center bg-black text-white py-2 px-4 rounded-xl hover:bg-gray-800 transition font-serif"
          >
            Gestion des Commandes
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default AdminMenu;
