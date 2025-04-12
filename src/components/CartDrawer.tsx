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
    <Drawer placement={"right"} open={Open} className="p-4 bg-[#f8f5f1]"   size={500}>
      <div className="mb-6 flex items-center justify-between ">
        <Typography variant="h3" color="blue-gray">
          Cart
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
            <div className="bg-white p-6 shadow-sm mb-6">
              {cart.map((item) => (
                <div
                  key={item.Id}
                  className="flex flex-row my-4 mx-0 px-4 border  items-center justify-start "
                >
                  <img
                    src={`http://localhost:8080${item.Image[0]}`}
                    alt={item.Name}
                    className="w-[35px] h-auto ml-0 my-3"
                  />
                  <div>
                    <h3 className="font-medium">{item.Name}</h3>
                    <button
                        onClick={() => removeFromCart(item.Id)}
                        className="text-gray-500 hover:text-gray-700 text-sm flex items-center mt-1 md:hidden"
                    >
                      <X className="w-4 h-4 mr-1"/>
                      Remove
                    </button>
                    <button
                        onClick={() => updateQuantity(item.Id, -1)}
                        className="px-3 py-1 bg-gray-50 hover:bg-gray-100"
                    >
                      <Minus className="w-4 h-4"/>
                    </button>
                    <span className="px-4 py-1 flex items-center justify-center">
                          {item.Quantity}
                        </span>
                    <button
                        onClick={() => updateQuantity(item.Id, 1)}
                        className="px-3 py-1 bg-gray-50 hover:bg-gray-100"
                    >
                      <Plus className="w-4 h-4"/>
                    </button>

                  </div>
                  <div>
                     <span className="text-gray-900 font-medium md:text-right">
                        ${(item.Price * item.Quantity).toFixed(2)}
                      </span>
                    <button
                        onClick={() => removeFromCart(item.Id)}
                        className="text-gray-500 hover:text-gray-700 hidden md:block"
                    >
                      <X className="w-5 h-5"/>
                    </button>
                  </div>


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

                <button className="mt-4 mb-4 w-full bg-gray-900 text-white py-3 px-6 flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Proceed to Checkout
                </button>

                <div className="mt-6 text-sm text-gray-500">
                  <p className="mb-2">We accept:</p>
                  <div className="flex space-x-2">
                    <div className="px-2 py-1 border border-gray-200 rounded">
                      Visa
                    </div>
                    <div className="px-2 py-1 border border-gray-200 rounded">
                      Mastercard
                    </div>
                    <div className="px-2 py-1 border border-gray-200 rounded">
                      PayPal
                    </div>
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
