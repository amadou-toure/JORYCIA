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

const MouseOverCard = ({
  product,
  onClick,
}: {
  onClick?: () => void;
  product: Product;
}) => {
  return (
    <Card
      className={`w-96 h-[500px] flex flex-col`}
      style={{
        backgroundImage: `url(http://localhost:8080${product.Image[1]})`, // Corrected URL
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover", // or 'contain' if you prefer the image to be fully visible
        backgroundPosition: "center",
      }}
    >
      <CardHeader
        shadow={false}
        floated={false}
        className="h-[80%] bg-transparent flex items-center justify-center"
      >
        <div></div>

      </CardHeader>
      <CardFooter className="pb-0 mb-2">
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
      </CardFooter>
    </Card>
  );
};

const MouseOutCard = ({ product }: { product: Product }) => {
  return (
    <Card className="w-96 h-[500px] bg-[#f8f5f1] flex flex-col">
      <CardHeader
        shadow={false}
        floated={false}
        className="h-64 bg-transparent flex items-center justify-center"
      >
        <img
          src={`http://localhost:8080${product.Image[0]}`} // Corrected URL
          alt={product.Name}
          className="h-auto w-[30%] object-cover" // Corrected width class
        />
      </CardHeader>
      <CardBody className="grow flex flex-col justify-center">
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium">
            {product.Name}
          </Typography>
          <div className="bg-[#F7CFC5] rounded-3xl p-2 ">
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
    </Card>
  );
};

const MobileViewCard = ({
  product,
  onClick,
}: {
  product: Product;
  onClick?: () => void;
}) => {
  return (
    <Card className="w-96 h-[500px] bg-[#f8f5f1] flex flex-col">
      <CardHeader
        shadow={false}
        floated={false}
        className="h-64 bg-transparent flex items-center justify-center"
      >
        <img
          src={`http://localhost:8080${product.Image[0]}`} // Corrected URL and Image path
          alt={product.Name}
          className="h-auto w-[30%] object-cover pt-5 pb-5" // Corrected width class
        />
      </CardHeader>
      <CardBody className="grow flex flex-col justify-center">
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium">
            {product.Name}
          </Typography>
          <div className="bg-[#F7CFC5] rounded-3xl p-2 ">
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
          {product.Notes.join(', ')} ,
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
}: {
  product: Product;
  MobileView?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, cart } = useCart();
  const addProductToCart = () => {
    setOpen(true);
    addToCart(product);
  };

  // Remove this line if you don't need it for debugging
  console.log(cart);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CartDrawer Open={open} onclick={() => setOpen(!open)} />

      {MobileView ? (
        <MobileViewCard product={product} onClick={addProductToCart} />
      ) : isHovered ? (
        <MouseOverCard product={product} onClick={addProductToCart} />
      ) : (
        <MouseOutCard product={product} />
      )}
    </div>
  );
}
