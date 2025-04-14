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
  size,
}: {
  onClick?: () => void;
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
          style={{
            backgroundImage: `url(http://localhost:8080${product.Image[1]})`, // Corrected URL
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover", // or 'contain' if you prefer the image to be fully visible
            backgroundPosition: "center",
          }}
      >

        <div className="flex justify-end mt-4">
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
        <div className="flex items-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${i < Math.round(product.Rating) ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
              viewBox="0 0 24 24"
            >
              <path d="M12 .587l3.668 7.431L24 9.75l-6 5.848L19.336 24 12 19.897 4.664 24 6 15.598 0 9.75l8.332-1.732z"/>
            </svg>
          ))}
          <span className="text-sm text-white ml-2">(24 avis)</span>
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
      <div className="flex justify-end mt-4">
        <span
          className="bg-[#f7cfc5] text-gray-800 px-3 py-1 rounded-full shadow-sm text-sm font-medium"
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
  const cardSizeClasses = {
    l: "w-96 h-[500px]",
    m: "w-80 h-[400px]",
    s: "w-64 h-[300px]",
  };

  return (
      <Card className={`${cardSizeClasses[size]} bg-[#f8f5f1] flex flex-col`}>
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
  const { addToCart, cart } = useCart();
  const addProductToCart = () => {
    console.log("Product to add:", product.Id, typeof product.Id);
    cart.forEach(item => console.log("In cart:", item.Id, typeof item.Id));
    setOpen(true);
    addToCart({...product, Id: product.Id});
  };

 return (
  <div
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    <CartDrawer Open={open} onclick={() => setOpen(!open)} />

    {MobileView ? (
      <MobileViewCard product={product} onClick={addProductToCart} size={size} />
    ) : isHovered ? (
      <MouseOverCard product={product} onClick={addProductToCart} size={size} />
    ) : (
      <MouseOutCard product={product} size={size} />
    )}
  </div>
);

}

const LimitedEditionSection = () => {
  return (
    <section className="bg-[#fff5f5] py-12 px-6 text-center rounded-2xl mt-10">
      <h2 className="text-2xl font-bold uppercase mb-4">Édition Limitée</h2>
      <p className="text-gray-700 max-w-xl mx-auto mb-6">
        Découvrez notre nouvelle huile de parfum en édition limitée, infusée de safran rare et de bois précieux. Disponible jusqu’à épuisement des stocks.
      </p>
      <Button color="black" ripple={false} className="px-6 py-3 text-white rounded-full hover:scale-105 transition">
        Explorer l’édition
      </Button>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-6 mt-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        <div>
          <h3 className="font-semibold mb-2">La Maison</h3>
          <ul>
            <li>Notre histoire</li>
            <li>Engagements</li>
            <li>Ingrédients</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Support</h3>
          <ul>
            <li>Contact</li>
            <li>Livraison</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Suivez-nous</h3>
          <div className="flex gap-4">
            <a href="#"><img src="/icons/instagram.svg" alt="Instagram" className="h-5 w-5" /></a>
            <a href="#"><img src="/icons/facebook.svg" alt="Facebook" className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
      <p className="text-center mt-6 text-xs text-gray-400">© {new Date().getFullYear()} JORYCIA. Tous droits réservés.</p>
    </footer>
  );
};

export { LimitedEditionSection, Footer };
