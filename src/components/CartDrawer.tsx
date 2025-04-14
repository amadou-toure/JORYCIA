import { Drawer, Typography, IconButton } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { ArrowLeft, CreditCard, Minus, Plus, X } from "lucide-react";
import { useCart } from "../data/contexts/cart.context.tsx";

export function CartDrawer({
  Open = false,
  onclick,
}: {
  Open: boolean;
  onclick?: () => void;
}) {
  const { cart, updateQuantity, removeFromCart, subtotal } = useCart();

  return (
    <Drawer placement={"right"} open={Open} className="p-4 bg-[#f8f5f1]/80 backdrop-blur-md rounded-l-2xl" size={500}>
      <div className="mb-6 flex items-center justify-between ">
        <Typography variant="h3" color="blue-gray">
          Your Bag
        </Typography>
        <IconButton variant="text" color="blue-gray" onClick={onclick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {cart.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-serif mb-6">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              to="/collections"
              className="inline-block bg-gray-900 text-white px-8 py-3 hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="bg-white p-6 shadow-sm mb-6 rounded-xl">
              {cart.map((item) => (
                <div key={item.Id} className="flex items-start justify-between border-b py-4 rounded-xl">
                  <div className="flex gap-4">
                    <img src={`http://localhost:8080${item.Image[0]}`} alt={item.Name} className="w-16 h-16 object-cover rounded-md" />
                    <div>
                      <h3 className="font-semibold">{item.Name}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => updateQuantity(item.Id, -1)} className="p-1 bg-gray-100 rounded hover:bg-gray-200">
                          <Minus className="w-4 h-4"/>
                        </button>
                        <span className="text-sm font-medium">{item.Quantity}</span>
                        <button onClick={() => updateQuantity(item.Id, 1)} className="p-1 bg-gray-100 rounded hover:bg-gray-200">
                          <Plus className="w-4 h-4"/>
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(item.Id)} className="mt-2 text-sm text-gray-500 hover:text-red-600">
                        <X className="inline-block w-4 h-4 mr-1" /> Remove
                      </button>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">${(item.Price * item.Quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <Link
                to="/collections"
                className="inline-flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2"/>
              Continue Shopping
            </Link>

            <div className="lg:col-span-1">
              <div className="bg-white p-6 shadow-sm">
                <h2 className="text-xl font-serif mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <button className="mt-4 mb-4 w-full bg-black text-white py-3 px-6 flex items-center justify-center rounded hover:bg-gray-900 transition">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Checkout Securely
                </button>

                <div className="mt-6 text-sm text-gray-500">
                  <p className="mb-2">We accept</p>
                  <div className="flex gap-2">
                    {['Visa', 'Mastercard', 'PayPal'].map((method) => (
                      <div key={method} className="px-3 py-1 bg-white border rounded shadow-sm">
                        {method}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
}
