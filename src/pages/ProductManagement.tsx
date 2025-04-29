import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import ProductService from "../services/Product.service";
import { Product } from "../models/Product.model";

export default function ProductManagement() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<Product>({
    id: "",
    name: "",
    price: 0,
    notes: [],
    rating: 0,
    image: [],
    quantity: 0,
    description: "",
    metadata: [],
    stripeProductID: "",
    stripePriceID: "",
  });
  const [newNote, setNewNote] = useState("");
  const [newImage, setNewImage] = useState("");

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        setIsLoading(true);
        try {
          const fetchedProduct = await ProductService.getOneProduct(id);
          setProduct(fetchedProduct);
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (id) {
        await ProductService.updateProduct(id, product);
      } else {
        await ProductService.createProduct(product);
      }
      navigate("/admin/products");
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      setProduct((prev) => ({
        ...prev,
        notes: [...prev.notes, newNote.trim()],
      }));
      setNewNote("");
    }
  };

  const handleRemoveNote = (index: number) => {
    setProduct((prev) => ({
      ...prev,
      notes: prev.notes.filter((_, i) => i !== index),
    }));
  };

  const handleAddImage = () => {
    if (newImage.trim()) {
      setProduct((prev) => ({
        ...prev,
        image: [...prev.image, newImage.trim()],
      }));
      setNewImage("");
    }
  };

  const handleRemoveImage = (index: number) => {
    setProduct((prev) => ({
      ...prev,
      image: prev.image.filter((_, i) => i !== index),
    }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Typography variant="h2" className="mb-8">
        {id ? "Edit Product" : "Create New Product"}
      </Typography>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="space-y-4">
          <Input
            label="Product Name"
            value={product.name}
            onChange={(e) =>
              setProduct((prev) => ({ ...prev, name: e.target.value }))
            }
            required
            crossOrigin="anonymous"
          />

          <Input
            label="Price"
            type="number"
            value={product.price}
            onChange={(e) =>
              setProduct((prev) => ({
                ...prev,
                price: parseFloat(e.target.value),
              }))
            }
            required
            crossOrigin="anonymous"
          />

          <Textarea
            label="Description"
            value={product.description}
            onChange={(e) =>
              setProduct((prev) => ({ ...prev, description: e.target.value }))
            }
            required
          />

          <div className="space-y-2">
            <Typography variant="h6">Notes</Typography>
            <div className="flex gap-2">
              <Input
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a new note"
                crossOrigin="anonymous"
              />
              <Button onClick={handleAddNote} color="blue">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.notes.map((note, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full"
                >
                  <span>{note}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveNote(index)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Typography variant="h6">Images</Typography>
            <div className="flex gap-2">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {product.image.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img}
                    alt={`Product image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <Input
            label="Quantity"
            type="number"
            value={product.quantity}
            onChange={(e) =>
              setProduct((prev) => ({
                ...prev,
                quantity: parseInt(e.target.value),
              }))
            }
            required
            crossOrigin="anonymous"
          />

          <Input
            label="Stripe Product ID"
            value={product.stripeProductID}
            onChange={(e) =>
              setProduct((prev) => ({
                ...prev,
                stripeProductID: e.target.value,
              }))
            }
            crossOrigin="anonymous"
          />

          <Input
            label="Stripe Price ID"
            value={product.stripePriceID}
            onChange={(e) =>
              setProduct((prev) => ({ ...prev, stripePriceID: e.target.value }))
            }
            crossOrigin="anonymous"
          />
        </div>

        <div className="flex gap-4">
          <Button
            type="submit"
            color="blue"
            className="w-full"
            disabled={isLoading}
          >
            {id ? "Update Product" : "Create Product"}
          </Button>
          <Button
            type="button"
            color="red"
            variant="outlined"
            onClick={() => navigate("/admin/products")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
