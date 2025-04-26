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
              <Input
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                placeholder="Add image URL"
                crossOrigin="anonymous"
              />
              <Button onClick={handleAddImage} color="blue">
                Add
              </Button>
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
