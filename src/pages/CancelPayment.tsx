import { Link } from "react-router-dom";

const CancelPayment = () => {
  return (
    <div className="min-h-screen bg-[#f8f5f1] flex items-center justify-center">
      <div className="text-center">
        <div className="text-red-500 mb-4">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-serif mb-4">checkout cancelled</h2>
        <p className="text-gray-600 mb-8">
          Your payment has been cancelled. Please try again later.
        </p>
        <Link
          to="/cart"
          className="inline-block bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors"
        >
          Return to Cart
        </Link>
      </div>
    </div>
  );
};

export default CancelPayment;
