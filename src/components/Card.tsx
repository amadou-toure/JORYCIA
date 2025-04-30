import { Button } from "@material-tailwind/react";

import { useState } from "react";
import { CartDrawer } from "./CartDrawer.tsx";
import { useCart } from "../data/contexts/cart.context.tsx";
import { Product } from "../models/Product.model";
import { CustomRating } from "../components/Rating.tsx";
import { useNavigate } from "react-router-dom";

const MouseOverCard = ({
  product,
  onClick,
  size,
}: {
  onClick?: () => void;
  onCardClick?: () => void;
  product: Product;
  size: "l" | "m" | "s";
}) => {
  const navigate = useNavigate();
  const containerClasses = {
    l: "w-96 h-[540px]",
    m: "w-80 h-[440px]",
    s: "w-64 h-[340px]",
  };

  return (
    <div
      className={`${containerClasses[size]} rounded-2xl shadow-md bg-[#fcf9f7] p-4 hover:shadow-lg transition`}
      style={{
        backgroundImage: `url(${product.image[1]})`, // Corrected URL
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover", // or 'contain' if you prefer the image to be fully visible
        backgroundPosition: "center",
      }}
    >
      <div
        onClick={() => navigate(`/product/${product.id}`)}
        className=" w-full h-[80%] mt-0 mb-4"
      ></div>

      <div className="flex flex-col justify-end mt-4 mb-0">
        <Button
          onClick={onClick}
          color="black"
          ripple={false}
          fullWidth={true}
          className="text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 flex-row justify-between"
        >
          <div className="flex flex-row justify-between">
            <p>Add to Cart</p>
            <p>{product.price} CA$</p>
          </div>
        </Button>
      </div>
    </div>
  );
};

const MouseOutCard = ({
  product,
  size,
}: {
  product: Product;
  size: "l" | "m" | "s";
}) => {
  const containerClasses = {
    l: "w-96 h-[540px]",
    m: "w-80 h-[440px]",
    s: "w-64 h-[340px]",
  };

  return (
    <div
      className={`${containerClasses[size]} rounded-2xl shadow-md bg-[#fcf9f7] p-4 hover:shadow-lg transition`}
    >
      <img
        src={product.image[0]} // Corrected URL
        alt={product.name}
        className={`w-full h-auto} rounded-xl mb-4 object-cover`} // Added height class
      />
      <h3 className="text-lg tracking-widest font-semibold text-gray-800 uppercase">
        {product.name}
      </h3>
      <p className="text-sm text-gray-600 mt-1">
        ❀ {product.notes.join(" • ")}
      </p>
      <div className="flex justify-between ml-0 mr-4 ">
        <CustomRating RatingValue={product.rating} />
        <span className="bg-[#111827] text-white px-3 py-1 rounded-full shadow-sm text-sm font-medium">
          {product.price} CA$
        </span>
      </div>
    </div>
  );
};

const MobileViewCard = ({
  product,
  onClick,
  size,
}: {
  product: Product;
  onClick?: () => void;
  size: "l" | "m" | "s";
}) => {
  const navigate = useNavigate();
  const cardSizeClasses = {
    l: "w-96 h-[580px]",
    m: "w-80 h-[480px]",
    s: "w-64 h-[380px]",
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className={`${cardSizeClasses[size]} rounded-2xl shadow-md bg-[#fcf9f7] p-4 hover:shadow-lg transition`}
    >
      <img
        src={product.image[0]}
        alt={product.name}
        className={`w-full h-auto} rounded-xl mb-4 object-cover`}
      />
      <h3 className="text-lg tracking-widest font-semibold text-gray-800 uppercase">
        {product.name}
      </h3>
      <p className="text-sm text-gray-600 mt-1">
        ❀ {product.notes.join(" • ")}
      </p>
      <CustomRating RatingValue={product.rating} />
      <div className="flex justify-between ml-0 mr-0 ">
        <span className="bg-[#111827] flex items-center justify-center rounded-full text-white w-20 text-center text-sm">
          {product.price} CA$
        </span>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
          color="black"
          ripple={false}
          fullWidth={false}
          className="rounded-full text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 flex-row justify-center items-center w-[200px]"
        >
          <div className="flex flex-row justify-center items-center">
            <p>Add to Cart</p>
          </div>
        </Button>
      </div>
    </div>
  );
};

export function Product_card({
  product,
  MobileView = false,
  size = "m",
}: {
  product: Product;
  MobileView?: boolean;
  size?: "l" | "m" | "s";
}) {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, cart } = useCart();

  const addProductToCart = () => {
    console.log("Product to add:", product.id);
    cart.forEach((item) => console.log("In cart:", item.id, typeof item.id));
    setOpen(true);
    addToCart({ ...product, id: product.id });
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CartDrawer Open={open} onclick={() => setOpen(!open)} />

      {MobileView ? (
        <MobileViewCard
          product={product}
          onClick={addProductToCart}
          size={size}
        />
      ) : isHovered ? (
        <MouseOverCard
          product={product}
          onClick={addProductToCart}
          size={size}
        />
      ) : (
        <MouseOutCard product={product} size={size} />
      )}
    </div>
  );
}
