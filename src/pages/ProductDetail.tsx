import { Button, Typography, Chip } from "@material-tailwind/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import ProductService from "../services/Product.service.ts";
import { Product } from "../models/Product.model.ts";
import { useParams } from "react-router-dom";
import { CartDrawer } from "../components/CartDrawer.tsx";
import { useState, useEffect } from "react";
import { useCart } from "../contexts/cart.context.tsx";
import { CustomRating } from "../components/Rating.tsx";

export default function ProductDetail() {
  const { addToCart } = useCart();
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const fetchedProduct = await ProductService.getOneProduct(id);
        setProduct(fetchedProduct);
      }
    };
    fetchProduct();
  }, [id]);
  const addProductToCart = () => {
    if (!product) return;
    setOpen(true);
    addToCart(product, 1);
  };

  if (!product) return <div className="p-10">Chargement du produit...</div>;

  return (
    <div className="flex flex-col pt-28 md:flex-row px-4 md:px-8 lg:px-16 py-20 gap-8 md:gap-12 bg-[#fefaf7] min-h-screen">
      <CartDrawer Open={open} onclick={() => setOpen(false)} />

      {/* Left Sidebar - Thumbnails */}
      <div className="hidden md:flex flex-col gap-4 w-24 ">
        {product.image.map((_, i) => (
          <div
            key={i}
            className={`relative rounded-xl cursor-pointer border-2 transition-all duration-300 ${
              index === i
                ? "border-gray-900 scale-105"
                : "border-gray-200 hover:border-gray-400"
            }`}
            onClick={() => setIndex(i)}
          >
            <img
              src={product.image[i]}
              alt="thumbnail"
              className="w-full h-24 object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 flex justify-center items-start">
        <div className="relative w-full max-w-lg aspect-square bg-white rounded-3xl shadow-lg overflow-hidden group">
          <img
            src={product.image[index]}
            alt="main"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => {
                setIndex(
                  (index - 1 + product.image.length) % product.image.length
                );
              }}
              className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
            >
              <ChevronLeftIcon className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={() => {
                setIndex((index + 1) % product.image.length);
              }}
              className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
            >
              <ChevronRightIcon className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex-1 max-w-xl mt-8">
        <div className="space-y-6">
          <div>
            <Typography variant="h3" className="font-bold text-3xl mb-2">
              {product.name}
            </Typography>
            <div className="flex items-center gap-2 mb-4">
              <CustomRating RatingValue={product.rating} />
              <span className="text-sm text-gray-500">
                ({product.rating} reviews)
              </span>
            </div>
          </div>

          <Typography className="text-gray-600 text-base leading-relaxed">
            {product.description}
          </Typography>

          <div className="flex items-center gap-2">
            <Typography className="text-2xl font-bold">
              ${product.price}
            </Typography>
            <Chip
              value="Free shipping"
              className="bg-green-50 text-green-700 px-3 py-1 text-sm"
              icon={<span className="text-lg">🚚</span>}
            />
          </div>

          <Button
            color="black"
            className="w-full text-white py-3 text-sm rounded-full mb-6 hover:bg-gray-800 transition-colors"
            onClick={addProductToCart}
          >
            ADD TO CART
          </Button>

          {/* Notes & FAQ Sections */}
          <div className="space-y-6">
            {/* Notes Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🌸</span>
                <Typography variant="h5" className="font-semibold">
                  Fragrance Notes
                </Typography>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-pink-50 rounded-xl p-4">
                  <Typography
                    variant="h6"
                    className="text-pink-700 font-medium mb-2"
                  >
                    Top Notes
                  </Typography>
                  <div className="space-y-1">
                    {product.notes.slice(0, 3).map((note, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span>
                        {note}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4">
                  <Typography
                    variant="h6"
                    className="text-purple-700 font-medium mb-2"
                  >
                    Heart Notes
                  </Typography>
                  <div className="space-y-1">
                    {product.notes.slice(3, 5).map((note, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                        {note}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-amber-50 rounded-xl p-4">
                  <Typography
                    variant="h6"
                    className="text-amber-700 font-medium mb-2"
                  >
                    Base Notes
                  </Typography>
                  <div className="space-y-1">
                    {product.notes.slice(5).map((note, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                        {note}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">❓</span>
                <Typography variant="h5" className="font-semibold">
                  Frequently Asked Questions
                </Typography>
              </div>
              <div className="space-y-4">
                <div className="border-b border-gray-100 pb-4">
                  <Typography
                    variant="h6"
                    className="text-gray-900 font-medium mb-2"
                  >
                    What is the fragrance intensity?
                  </Typography>
                  <Typography className="text-sm text-gray-600">
                    Our fragrances are designed to be long-lasting with moderate
                    projection, perfect for everyday wear.
                  </Typography>
                </div>
                <div className="border-b border-gray-100 pb-4">
                  <Typography
                    variant="h6"
                    className="text-gray-900 font-medium mb-2"
                  >
                    Is this fragrance suitable for sensitive skin?
                  </Typography>
                  <Typography className="text-sm text-gray-600">
                    All our products are dermatologically tested and suitable
                    for most skin types.
                  </Typography>
                </div>
                <div className="border-b border-gray-100 pb-4">
                  <Typography
                    variant="h6"
                    className="text-gray-900 font-medium mb-2"
                  >
                    What is your sustainability policy?
                  </Typography>
                  <Typography className="text-sm text-gray-600">
                    We are committed to sustainable practices, using
                    eco-friendly packaging and responsibly sourced ingredients.
                  </Typography>
                </div>
                <div>
                  <Typography
                    variant="h6"
                    className="text-gray-900 font-medium mb-2"
                  >
                    How long does shipping take?
                  </Typography>
                  <Typography className="text-sm text-gray-600">
                    Standard shipping takes 3-5 business days. Express shipping
                    options are available at checkout.
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Chip
              value="Women"
              className="bg-pink-100 text-pink-600 px-3 py-1 hover:bg-pink-200 transition-colors"
            />
            <Chip
              value="Bestseller"
              className="bg-gray-100 text-gray-700 px-3 py-1 hover:bg-gray-200 transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
