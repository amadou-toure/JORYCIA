import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

import { useState } from "react";

interface Product {
  name: string;
  price: number;
  image: string;
  bg?: string;
  description: string;
}


const MouseOverCard = ({ product }: { product: Product }) => {
  return (
    <Card
      className={`w-96 h-[500px] flex flex-col`}
      style={{
        backgroundImage: `url('data:image/webp;base64,${product.bg}')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover', // or 'contain' if you prefer the image to be fully visible
        backgroundPosition: 'center'
      }}
    >
      <CardHeader shadow={false} floated={false} className="h-[80%] bg-transparent flex items-center justify-center">
       <img
          src={`data:image/webp;base64,${product.image}`}
          alt={product.name}
          className="w-[30%] h-auto object-contain"
       />
      </CardHeader>
      <CardFooter className="pb-0 mb-2">
        <Button
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
      </CardFooter>
    </Card>
  );
};

const MouseOutCard = ({ product }: { product: Product }) => {
  return (
    <Card className="w-96 h-[500px] bg-[#f8f5f1] flex flex-col">
      <CardHeader shadow={false} floated={false} className="h-64 bg-transparent flex items-center justify-center">
        <img
          src={`data:image/webp;base64,${product.image}`}
          alt={product.name}
          className="h-full w-[20] object-cover "
        />
      </CardHeader>
      <CardBody className="grow flex flex-col justify-center">
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium">
            {product.name}
          </Typography>
          <Typography color="blue-gray" className="font-medium">
            {product.price} CA$
          </Typography>
        </div>
        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75"
        >
          {product.description}
        </Typography>
      </CardBody>

    </Card>
  );
};

const MobileViewCard = ({ product }: { product: Product })=>{
  return (
      <Card className="w-96 h-[500px] bg-[#f8f5f1] flex flex-col"> {/* Set fixed height and ensure column layout */}
    <CardHeader shadow={false} floated={false} className="h-64 bg-transparent flex items-center justify-center"> {/* Center the image */}
      <img
          src={`data:image/jpeg;base64,${product.image}`}
          alt={product.name}
          className="h-full w-[20] object-cover pt-5 pb-5"
      />
    </CardHeader>
    <CardBody className="grow flex flex-col justify-center"> {/* Ensure the body takes the remaining space and centers content */}
      <div className="mb-2 flex items-center justify-between">
        <Typography color="blue-gray" className="font-medium">
          {product.name}
        </Typography>
        <Typography color="blue-gray" className="font-medium">
          {product.price} CA$ {/* Corrected currency symbol */}
        </Typography>
      </div>
      <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75"
      >
        {product.description}
      </Typography>
    </CardBody>
    <CardFooter className="pt-0">
      <Button
          color="black"
          ripple={false}
          fullWidth={true}
          className="text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 mb-0"
      >
        Add to Cart
      </Button>
    </CardFooter>
  </Card>)
}

export function Product_card({ product, MobileView = false }: { product: Product; MobileView?: boolean }) {

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {MobileView ? (<MobileViewCard product={product} />) :isHovered ? (
          <MouseOverCard product={product} />
      ) : (
          <MouseOutCard product={product} />
      ) }
    </div>
  );
}
