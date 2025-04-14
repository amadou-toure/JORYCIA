import { Button, Typography, Chip, Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from "@heroicons/react/24/solid";
import ProductService from "../services/Product.service.ts";
import { Product } from "../models/Product.model.ts";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
    const fetchProduct = async () => {
        if (id) {
            const fetchedProduct = await ProductService.getOneProduct(id);
            setProduct(fetchedProduct);
        }
    };
    fetchProduct();
}, [id]);


    if (!product) return <div className="p-10">Chargement du produit...</div>;

    return (
        <div className="flex flex-col md:flex-row px-6 py-10 gap-10 bg-[#fefaf7]">
            {/* Left Sidebar - Thumbnails */}
            <div className="hidden md:flex flex-col gap-4 w-20">
                {[1, 2, 3, 4, 5].map((_, i) => (
                    <img
                        key={i}
                        src={`http://localhost:8080${product.Image[i]}`}
                        alt="thumbnail"
                        className="rounded-lg cursor-pointer border border-gray-300 hover:border-gray-700"
                    />
                ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 flex justify-center items-center">
                <div className="relative w-full max-w-sm aspect-square bg-white rounded-3xl shadow-md overflow-hidden">
                    <img
                        src={`http://localhost:8080${product.Image[0]}`}
                        alt="main"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 right-4 flex gap-2">
                        <button><ChevronLeftIcon className="w-5 h-5 text-gray-700" /></button>
                        <button><ChevronRightIcon className="w-5 h-5 text-gray-700" /></button>
                    </div>
                </div>
            </div>

            {/* Product Details */}
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                    <Chip value="Women" className="bg-pink-100 text-pink-600 px-3 py-1" />
                    <Chip value="Bestseller" className="bg-gray-100 text-gray-700 px-3 py-1" />
                </div>
                <Typography variant="h4" className="font-bold">{product.Name}</Typography>
                <div className="flex items-center gap-1 text-yellow-600 text-sm mb-2">
                    {[...Array(4)].map((_, i) => (
                        <StarIcon key={i} className="w-4 h-4 text-yellow-600" />
                    ))}<span className="text-gray-500 ml-2">({product.Rating})</span>
                </div>
                <Typography className="text-gray-600 text-sm mb-1">{product.Description}</Typography>
                <Typography className="text-gray-600 text-sm mb-3">
                    Inspired by <strong>{product.Notes}</strong> (Retail: {product.Price})
                </Typography>
                <Typography className="text-sm text-gray-600 mb-4">
                    Scent Intensity Scale: <span className="text-red-500 font-semibold">{product.Rating}</span> ● ● ● ● ○
                </Typography>

                <div className="flex items-center gap-2 mb-6">
                    <Chip icon={<span className="text-xl">📦</span>} value="Free returns" className="bg-gray-100 text-gray-700 px-3 py-1" />
                    <a href="#" className="text-sm text-blue-500 underline">learn more</a>
                </div>

                <Button color="black" className="w-full text-white py-3 text-sm rounded-full mb-6">
                    ADD TO CART
                </Button>

                {/* Accordion Sections */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Accordion open={false} className="border border-gray-300 rounded-xl">
                        <AccordionHeader>About</AccordionHeader>
                        <AccordionBody>
                            A sweet floral blend with notes of marshmallow, jasmine, and neroli.
                        </AccordionBody>
                    </Accordion>
                    <Accordion open={false} className="border border-gray-300 rounded-xl">
                        <AccordionHeader>Notes & Ingredients</AccordionHeader>
                        <AccordionBody>
                            Top: Marshmallow, Neroli
                            <br />Heart: Jasmine, Orange Blossom
                            <br />Base: Musk, Amber
                        </AccordionBody>
                    </Accordion>
                    <Accordion open={false} className="border border-gray-300 rounded-xl">
                        <AccordionHeader>Shipping + Returns</AccordionHeader>
                        <AccordionBody>
                            Free shipping on orders over C$50. Returns accepted within 30 days.
                        </AccordionBody>
                    </Accordion>
                    <Accordion open={false} className="border border-gray-300 rounded-xl">
                        <AccordionHeader>FAQs</AccordionHeader>
                        <AccordionBody>
                            Questions about fragrance intensity, skin type compatibility, or sustainability?
                        </AccordionBody>
                    </Accordion>
                </div>
            </div>
        </div>
    );
}