import { Button, Typography, Chip, Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import { ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/solid";
import ProductService from "../services/Product.service.ts";
import { Product } from "../models/Product.model.ts";
import { useParams } from "react-router-dom";
import {CartDrawer} from "../components/CartDrawer.tsx";
import { useState, useEffect } from "react";
import {useCart} from "../data/contexts/cart.context.tsx";
import {CustomRating} from "../components/Rating.tsx"

export default function ProductDetail() {
    const {addToCart} = useCart();
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const [openAccordeon, setOpenAccordeon]= useState(false);


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
        setOpen(true);
        addToCart({...product, ID: product.ID});
    };

    if (!product) return <div className="p-10">Chargement du produit...</div>;

    return (
        <div className="flex flex-col md:flex-row px-6 py-40 gap-10 bg-[#fefaf7]">
            <CartDrawer Open={open} onclick={() => setOpen(false)} />
            {/* Left Sidebar - Thumbnails */}
            <div className="hidden md:flex flex-col gap-4 w-20">
                {product.Image.map((_, i) => (
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
                        src={`http://localhost:8080${product.Image[index]}`}
                        alt="main"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 right-4 flex gap-2">
                        <button onClick={()=>{setIndex((index - 1 + product.Image.length) % product.Image.length)}}><ChevronLeftIcon className="w-5 h-5 text-gray-700" /></button>
                        <button onClick={()=>{setIndex((index + 1) % product.Image.length)}}><ChevronRightIcon className="w-5 h-5 text-gray-700" /></button>
                    </div>
                </div>
            </div>

            {/* Product Details */}
            <div className="flex-1">
                <Typography variant="h4" className="font-bold">{product.Name}</Typography>
               <CustomRating RatingValue={product.Rating} />
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

                <Button color="black" className="w-full text-white py-3 text-sm rounded-full mb-6" onClick={addProductToCart}>
                    ADD TO CART
                </Button>

                {/* Accordion Sections */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Accordion open={openAccordeon} onClick={() => setOpenAccordeon(!openAccordeon)}
                               className="border border-gray-200 rounded-xl bg-[#fdf7f5] shadow-sm">
                        <AccordionHeader className="text-lg font-semibold text-gray-800 px-4 py-2">
                            🌸 Notes & Ingrédients
                        </AccordionHeader>
                        <AccordionBody className="text-sm text-gray-700 px-4 pb-4">
                            <p><strong>Top:</strong> {product.Notes.slice(0, 3).join(', ')}</p>
                            <p><strong>Heart:</strong> {product.Notes.slice(3, 5).join(', ')}</p>
                            <p><strong>Base:</strong> {product.Notes.slice(5).join(', ')}</p>
                        </AccordionBody>

                    </Accordion>

                    <Accordion open={false} className="border border-gray-200 rounded-xl bg-[#fdf7f5] shadow-sm">
                        <AccordionHeader className="text-lg font-semibold text-gray-800 px-4 py-2">
                            ❓ FAQ
                        </AccordionHeader>
                        <AccordionBody className="text-sm text-gray-700 px-4 pb-4 leading-relaxed">
                            Find answers about fragrance intensity, skin compatibility, sustainability, and delivery.
                        </AccordionBody>
                    </Accordion>
                    <div className="flex items-center gap-3 mb-4">
                        <Chip value="Women" className="bg-pink-100 text-pink-600 px-3 py-1"/>
                        <Chip value="Bestseller" className="bg-gray-100 text-gray-700 px-3 py-1"/>
                    </div>
                </div>
            </div>
        </div>
    );
}