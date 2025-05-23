import { useState, useEffect } from "react";
import {
  Button,
  Input,
  Spinner,
  Textarea,
  Typography,
  Alert,
} from "@material-tailwind/react";
import { Product, ProductCreate } from "../../models/Product.model";
import * as base64 from "@ethersproject/base64";
import { useProduct } from "../../contexts/Product.context";
import Table from "../../components/Table";
import { X } from "lucide-react";
import MessageBox from "../../components/MessageBox";

export default function ProductManagement() {
  const [isOpen, setIsOpen] = useState(false);
  const [dialog, setDialog] = useState({
    isOpen: false,
    title: "",
    message: "",
    buttons: null as React.ReactNode | null,
  });
  const {
    Products,
    fetchOneProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    isLoading,
  } = useProduct();
  const [product, setProduct] = useState<Product>({
    name: "",
    price: 0,
    notes: [],
    rating: 0,
    image: [],
    inStock: 1,
    description: "",
    metadata: [],
    stripeProductID: "",
    stripePriceID: "",
  });

  const [newProduct, setNewProduct] = useState<ProductCreate>({
    name: "",
    price: 0,
    notes: [],
    rating: 0,
    image: [],
    description: "",
    inStock: 1,
  });
  const [newNote, setNewNote] = useState("");
  const [selected, setSelected] = useState(false);

  const handleSelectedProduct = (id: string) => {
    setSelected(!selected); //bascule entre true et false. permet d'afficher le bouton modifier se suprimer
    fetchOneProduct(id).then((selectedProduct) => {
      if (selectedProduct) {
        setProduct(selectedProduct);
        console.log(product);
      }
    });
  };

  const handleUpdateButton = () => {
    setIsOpen(true);
  };

  const handleDeleteButton = () => {
    if (product.id) {
      console.log("handleDeleteButton: ", product.id, dialog.isOpen);
      setDialog({
        isOpen: true,
        title: "Delete Product",
        message: "Are you sure you want to delete this product?",
        buttons: (
          <div className="flex flex-row gap-2 ml-5 ">
            <Button
              onClick={() => {
                if (product.id) {
                  deleteProduct(product.id);
                  setDialog({ ...dialog, isOpen: false });
                }
                setDialog({ ...dialog, isOpen: false });
                setIsOpen(false);
              }}
              color="red"
            >
              confirmer
            </Button>
            <Button onClick={() => setDialog({ ...dialog, isOpen: false })}>
              Annuler
            </Button>
          </div>
        ),
      });
    } else {
      alert("Please select a product to delete");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (product.id && product.id !== "") {
      updateProduct(product.id, product);
      setIsOpen(false);
    } else {
      createProduct(newProduct as Product);
      isLoading
        ? MessageBox({
            isOpen: true,
            title: "Error",
            message: "Please wait for the product to be created",
            buttons: null,
          })
        : setIsOpen(false);
    }
  };
  const handleAddNote = () => {
    if (newNote.trim()) {
      product.id !== ""
        ? setProduct((prev) => ({
            ...prev,
            notes: [...prev.notes, newNote.trim()],
          }))
        : setNewProduct((prev) => ({
            ...prev,
            notes: [...prev.notes, newNote.trim()],
          }));
      setNewNote("");
    }
  };

  const handleRemoveNote = (index: number) => {
    {
      product.id !== ""
        ? setProduct((prev) => ({
            ...prev,
            notes: prev.notes.filter((_, i) => i !== index),
          }))
        : setNewProduct((prev) => ({
            ...prev,
            notes: prev.notes.filter((_, i) => i !== index),
          }));
    }
  };

  const handleAddImage = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const base64Image = base64.encode(new Uint8Array(buffer));
    product.id !== ""
      ? setProduct((prev) => ({
          ...prev,
          image: [...prev.image, base64Image],
        }))
      : setNewProduct((prev) => ({
          ...prev,
          image: [...prev.image, base64Image],
        }));
  };

  const handleRemoveImage = (index: number) => {
    product.id !== ""
      ? setProduct((prev) => ({
          ...prev,
          image: prev.image.filter((_, i) => i !== index),
        }))
      : setNewProduct((prev) => ({
          ...prev,
          image: prev.image.filter((_, i) => i !== index),
        }));
  };

  const renderEditForm = () => (
    <form
      onSubmit={handleSubmit}
      className="relative space-y-6 w-[90%] max-w-2xl bg-white mt-[10%] mb-8 p-6 rounded-xl shadow-lg border border-gray-200 overflow-y-auto max-h-[80%]"
    >
      <Typography variant="h2" className="mb-8">
        Edit Product
      </Typography>
      <X
        className="absolute top-3 right-7 cursor-pointer"
        onClick={() => {
          setIsOpen(false);
          setProduct({
            id: "",
            name: "",
            price: 0,
            notes: [],
            rating: 0,
            image: [],
            description: "",
            inStock: 1,
            metadata: [],
            stripeProductID: "",
            stripePriceID: "",
          });
        }}
      />
      <Input
        label="Product Name"
        value={product.name}
        onChange={(e) =>
          setProduct((prev) => ({
            ...prev,
            name: e.target.value,
          }))
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
          setProduct((prev) => ({
            ...prev,
            description: e.target.value,
          }))
        }
        required
      />
      <Input
        label="In Stock"
        type="number"
        value={product.inStock}
        onChange={(e) =>
          setProduct((prev) => ({
            ...prev,
            inStock: parseInt(e.target.value),
          }))
        }
        required
        crossOrigin="anonymous"
      />
      <div className="space-y-2 w-full">
        <Typography variant="h6">Notes</Typography>
        <div className="flex gap-2">
          <Input
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a new note"
            crossOrigin="anonymous"
          />
          <Button onClick={handleAddNote} color="black">
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

      <div className="space-y-2 w-full">
        <Typography variant="h6">Images</Typography>
        <div className="flex gap-2 w-full">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50"
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
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleAddImage(file);
                }}
              />
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

      <div className="flex gap-4">
        <Button
          type="submit"
          color="black"
          className="w-full"
          disabled={isLoading}
        >
          Update Product
        </Button>
        <Button
          type="button"
          color="black"
          variant="outlined"
          onClick={() => {
            setIsOpen(false);
            setProduct({
              id: "",
              name: "",
              price: 0,
              notes: [],
              rating: 0,
              image: [],
              description: "",
              inStock: 1,
              metadata: [],
              stripeProductID: "",
              stripePriceID: "",
            });
          }}
        >
          Cancel
        </Button>
      </div>
    </form>
  );

  const renderCreateForm = () => (
    <form
      onSubmit={handleSubmit}
      className="relative space-y-6 w-[90%] max-w-2xl bg-white mt-[10%] mb-8 p-6 rounded-xl shadow-lg border border-gray-200 overflow-y-auto max-h-[80%]"
    >
      <Typography variant="h2" className="mb-8">
        Create New Product
      </Typography>
      <X
        className="absolute top-3 right-7 cursor-pointer"
        onClick={() => {
          setIsOpen(false);
          setNewProduct({
            name: "",
            price: 0,
            notes: [],
            rating: 0,
            image: [],
            description: "",
            inStock: 1,
          });
        }}
      />
      <Input
        label="Product Name"
        value={newProduct.name}
        onChange={(e) =>
          setNewProduct((prev) => ({
            ...prev,
            name: e.target.value,
          }))
        }
        required
        crossOrigin="anonymous"
      />
      <Input
        label="Price"
        type="number"
        value={newProduct.price}
        onChange={(e) =>
          setNewProduct((prev) => ({
            ...prev,
            price: parseFloat(e.target.value),
          }))
        }
        required
        crossOrigin="anonymous"
      />
      <Textarea
        label="Description"
        value={newProduct.description}
        onChange={(e) =>
          setNewProduct((prev) => ({
            ...prev,
            description: e.target.value,
          }))
        }
        required
      />
      <Input
        label="Quantity"
        type="number"
        value={newProduct.inStock}
        onChange={(e) =>
          setNewProduct((prev) => ({
            ...prev,
            inStock: parseInt(e.target.value),
          }))
        }
        required
        crossOrigin="anonymous"
      />
      <div className="space-y-2 w-full">
        <Typography variant="h6">Notes</Typography>
        <div className="flex gap-2">
          <Input
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a new note"
            crossOrigin="anonymous"
          />
          <Button onClick={handleAddNote} color="black">
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {newProduct.notes.map((note, index) => (
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

      <div className="space-y-2 w-full">
        <Typography variant="h6">Images</Typography>
        <div className="flex gap-2 w-full">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50"
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
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleAddImage(file);
                }}
              />
            </label>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {newProduct.image.map((img, index) => (
            <div key={index} className="relative group">
              <img
                src={`data:image/webp;base64,${img}`}
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

      <div className="flex gap-4">
        <Button
          type="submit"
          color="black"
          loading={isLoading}
          disabled={isLoading}
          className="w-full"
          onClick={() => handleSubmit}
        >
          {isLoading ? "Loading..." : "Create Product"}
        </Button>
        <Button
          type="button"
          color="black"
          disabled={isLoading}
          variant="outlined"
          onClick={() => {
            setIsOpen(false);
            setNewProduct({
              name: "",
              price: 0,
              notes: [],
              rating: 0,
              image: [],
              description: "",
              inStock: 1,
            });
          }}
        >
          Cancel
        </Button>
      </div>
    </form>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner height={100} width={100} />
      </div>
    );
  }

  return (
    <div className="container relative mx-auto px-4 pt-[10%]">
      <MessageBox
        isOpen={dialog.isOpen}
        title={dialog.title}
        message={dialog.message}
        buttons={dialog.buttons}
      />
      <div className="flex flex-col justify-between items-center mb-8">
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 ">
            <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"></div>
            {product.id !== "" ? renderEditForm() : renderCreateForm()}
          </div>
        )}
        <Table
          setSelectedId={handleSelectedProduct}
          name="Produits"
          data={Products.map((p) => ({
            image: (
              <img
                src={p.image[0]}
                alt="img"
                className="w-16 h-16 object-cover rounded "
              />
            ),
            name: p.name,
            description: p.description,
            inStock: p.inStock,
            price: `${p.price} $CA`,
            notes: p.notes.join(", "),
            id: p.id,
          }))}
          columns={[
            "image",
            "name",
            "description",
            "inStock",
            "price",
            "notes",
          ]}
        />
        <div className="flex justify-center items-center w-[50%]">
          {selected ? (
            <>
              <Button color="white" onClick={handleUpdateButton}>
                Modifier le produit
              </Button>
              <Button color="red" onClick={handleDeleteButton}>
                Supprimerle produit
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsOpen(true)}>Ajouter un produit</Button>
          )}
        </div>
      </div>
    </div>
  );
}
