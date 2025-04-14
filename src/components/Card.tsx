import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

import { useState } from "react";
import { CartDrawer } from "./CartDrawer.tsx";
import { useCart } from "../data/contexts/cart.context.tsx";
import { Product } from "../models/Product.model";
import {CustomRating} from "../components/Rating.tsx";
import {useNavigate} from "react-router-dom";


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
            backgroundImage: `url(http://localhost:8080${product.Image[1]})`, // Corrected URL
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover", // or 'contain' if you prefer the image to be fully visible
            backgroundPosition: "center",
          }}
      >
        <div onClick={() => (navigate(`/product/${product.ID}`))} className=" w-full h-[80%] mt-0 mb-4">

        </div>

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
              <p>{product.Price} CA$</p>
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
        src={`http://localhost:8080${product.Image[0]}`} // Corrected URL
        alt={product.Name}
        className={`w-full h-auto} rounded-xl mb-4 object-cover`} // Added height class
      />
      <h3 className="text-lg tracking-widest font-semibold text-gray-800 uppercase">
        {product.Name}
      </h3>
      <p className="text-sm text-gray-600 mt-1">
        ❀ {product.Notes.join(' • ')}
      </p>
      <div className="flex justify-between ml-0 mr-4 ">
        <CustomRating RatingValue={product.Rating} />
        <span
          className="bg-[#111827] text-white px-3 py-1 rounded-full shadow-sm text-sm font-medium"
        >
          {product.Price} CA$
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
    l: "w-96 h-[500px]",
    m: "w-80 h-[400px]",
    s: "w-64 h-[300px]",
  };

  return (
      <Card className={`${cardSizeClasses[size]} bg-[#f8f5f1] flex flex-col`} onClick={() => (navigate(`/product/${product.ID}`))}>
        <CardHeader
            shadow={false}
            floated={false}
            className={`h-64 bg-transparent flex items-center justify-center ${cardSizeClasses[size]}`}
        >
          <img
              src={`http://localhost:8080${product.Image[0]}`} // Corrected URL and Image path
              alt={product.Name}
              className="w-full h-auto " // Corrected width class
        />
      </CardHeader>
      <CardBody className="grow flex flex-col justify-center">
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium">
            {product.Name}
          </Typography>
          <div className="bg-[#F7CFC5] rounded-3xl p-0 ">
            <Typography color="blue-gray" className="font-medium text-sm">
              {product.Price} CA$
            </Typography>
          </div>
        </div>
        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75"
        >
          {product.Notes.join(', ')}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          onClick={onClick}
          color="black"
          ripple={false}
          fullWidth={true}
          className="text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 mb-0"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export function Product_card({
  product,
  MobileView = false,
  size = "m", // Default size is "m"
}: {
  product: Product;
  MobileView?: boolean;
  size?: "l" | "m" | "s";
}) {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const {addToCart, cart} = useCart();

  const addProductToCart = () => {
    console.log("Product to add:", product.ID);
    cart.forEach(item => console.log("In cart:", item.ID, typeof item.ID));
    setOpen(true);
    addToCart({...product, ID: product.ID});
  };

  return (
      <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
      >
        <CartDrawer Open={open} onclick={() => setOpen(!open)}/>

        {MobileView ? (
            <MobileViewCard  product={product} onClick={addProductToCart} size={size}/>
        ) : isHovered ? (
            <MouseOverCard  product={product} onClick={addProductToCart} size={size}/>
        ) : (
            <MouseOutCard product={product} size={size}/>
        )}
      </div>
  );
}