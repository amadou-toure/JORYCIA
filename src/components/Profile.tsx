import { useState } from "react";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/user.context"; // adjust path as needed

const Profile = () => {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const { user, logout } = useUser();
  // liste des routes autorisant la transparence

  return (
    <div className="relative">
      <User
        className="h-6 w-6 cursor-pointer text-gray-800"
        onClick={() => setIsAccountOpen(!isAccountOpen)}
      />
      {isAccountOpen && user && (
        <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg overflow-hidden z-50">
          <div className="px-4 py-3 border-b">
            <p className="text-sm text-gray-600">
              Welcome back hjkl, {user.firstName}
            </p>
            <button
              onClick={logout}
              className="mt-1 text-sm text-blue-600 hover:underline"
            >
              Sign Out
            </button>
          </div>
          <ul className="py-1 text-sm text-gray-700">
            <Link to="/orders" className="px-4 py-2 hover:bg-gray-100">
              My Orders
            </Link>

            <li className="px-4 py-2 hover:bg-gray-100">Payment</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
