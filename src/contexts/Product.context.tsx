import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Product } from "../models/Product.model"; // Change extension if necessary
import ProductService from "../services/Product.service"; // Change extension if necessary
import { ProductContextType } from "../models/ProductContextType"; // Change extension if necessary
// Define the type for the ProductContext value

const ProductContext = createContext<ProductContextType>({
  Products: [],
  isLoading: false,
  lastFetched: null,
  refreshProducts: () => {},
  fetchOneProduct: (id: string) => Promise.resolve(undefined),
  createProduct: (product: Product) => Promise.resolve(undefined),
  updateProduct: (id: string, product: Product) => Promise.resolve(undefined),
  deleteProduct: (id: string) => Promise.resolve(undefined),
});

// Define a provider component
export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [Products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);

  const fetchOneProduct = async (id: string) => {
    setIsLoading(true);
    try {
      const fetchedProduct: Product = await ProductService.getOneProduct(id);
      return fetchedProduct;
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    setIsLoading(true);
    try {
      await ProductService.deleteProduct(id);
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const createProduct = async (product: Product) => {
    setIsLoading(true);
    try {
      const createdProduct: Product = await ProductService.createProduct(
        product
      );
      return createdProduct;
    } catch (error) {
      console.error("Error creating product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProduct = async (id: string, product: Product) => {
    setIsLoading(true);
    try {
      const updatedProduct: Product = await ProductService.updateProduct(
        id,
        product
      );
      return updatedProduct;
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const fetchedProducts: Product[] = await ProductService.getAllProducts();
      setProducts(fetchedProducts.sort((a, b) => b.rating - a.rating));
      setLastFetched(new Date());
      console.log(Products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const refreshProducts = async () => {
    setIsLoading(true);
    await fetchProducts();
    console.log(Products);
  };

  return (
    <ProductContext.Provider
      value={{
        Products,
        isLoading,
        lastFetched,
        refreshProducts,
        fetchOneProduct,
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use the product context
export const useProduct = () => {
  return useContext(ProductContext);
};
