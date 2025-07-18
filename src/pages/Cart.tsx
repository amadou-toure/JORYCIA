import { Minus, Plus, X, ArrowLeft, CreditCard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/cart.context.tsx";
import { usePayment } from "../contexts/payment.context.tsx";
import { useUser } from "../contexts/user.context.tsx";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, subtotal } = useCart();
  const { proceedToPayment } = usePayment();
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div className="pt-28 pb-20 bg-[#f8f5f1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif mb-10">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-16 rounded-xl">
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 ">
            <div className="lg:col-span-2 ">
              <div className="bg-white p-6 shadow-sm mb-6 rounded-3xl">
                <div className="hidden md:grid md:grid-cols-6 text-sm text-gray-500 pb-3 border-b">
                  <div className="md:col-span-3">Product</div>
                  <div className="text-center">Price</div>
                  <div className="text-center">Quantity</div>
                  <div className="text-right">Total</div>
                </div>

                {cart.map((item) => (
                  <div
                    key={item.product?.id ?? "unknown"}
                    className="py-6 border-b last:border-b-0"
                  >
                    <div className="md:grid md:grid-cols-6 flex flex-col gap-4">
                      <div className="md:col-span-3 flex">
                        <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-md">
                          <img
                            src={item.product?.image?.[0] ?? ""}
                            alt={item.product?.name ?? ""}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex flex-col justify-center">
                          <h3 className="text-lg font-medium">
                            {item.product?.name ?? ""}
                          </h3>
                          {/*<p className="text-sm text-gray-500">{item.size}</p>*/}
                          <button
                            onClick={() =>
                              item.product?.id &&
                              removeFromCart(item.product.id)
                            }
                            className="text-gray-500 hover:text-gray-700 text-sm flex items-center mt-1 md:hidden"
                          >
                            <X className="w-4 h-4 mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-center">
                        <span className="text-gray-900">
                          ${item.product?.price ?? 0}
                        </span>
                      </div>

                      <div className="flex items-center justify-center">
                        <div className="flex border border-gray-300">
                          <button
                            onClick={() =>
                              item.product?.id &&
                              updateQuantity(item.product.id, -1)
                            }
                            className="px-3 py-1 bg-gray-50 hover:bg-gray-100"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-1 flex items-center justify-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              item.product?.id &&
                              updateQuantity(item.product.id, 1)
                            }
                            className="px-3 py-1 bg-gray-50 hover:bg-gray-100"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end">
                        <span className="text-gray-900 font-medium md:text-right">
                          $
                          {((item.product?.price ?? 0) * item.quantity).toFixed(
                            2
                          )}
                        </span>
                        <button
                          onClick={() =>
                            item.product?.id && removeFromCart(item.product.id)
                          }
                          className="text-gray-500 hover:text-gray-700 hidden md:block"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/collections"
                className="inline-flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Link>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white p-6 shadow-sm rounded-3xl">
                <h2 className="text-xl font-serif mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                </div>
                <span className="text-gray-600">Methode de paiement</span>
                <button
                  onClick={() => {
                    user ? proceedToPayment(cart) : navigate("/LogIn");
                  }}
                  className="rounded-3xl mt-4 mb-4 w-full bg-gray-900 text-white py-3 px-6 flex items-center justify-center hover:bg-gray-800 transition-colors"
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  proceder au paiement
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
