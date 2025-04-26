import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Product } from "../../models/Product.model"; // Change extension if necessary
import ProductService from "../../services/Product.service"; // Change extension if necessary
import { ProductContextType } from "../../models/ProductContextType"; // Change extension if necessary
// Define the type for the ProductContext value

const ProductContext = createContext<ProductContextType>({
  Products: [],
  isLoading: false,
  lastFetched: null,
  refreshProducts: () => {},
});

// Define a provider component
export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [Products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);

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
      value={{ Products, isLoading, lastFetched, refreshProducts }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use the product context
export const useProduct = () => {
  return useContext(ProductContext);
};
