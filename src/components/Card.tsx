import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  //Button,
} from "@material-tailwind/react";

interface Product {
  name: string;
  image: string;
  price: number;
  description: string;
}

export function Product_card({ product }: { product: Product }) {
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
            ${product.price} {/* Corrected currency symbol */}
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
    </Card>
  );
}
