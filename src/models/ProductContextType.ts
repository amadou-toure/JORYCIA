import { Product } from "./Product.model.ts";
export interface ProductContextType {
  Products: Product[];
  isLoading: boolean;
  lastFetched: Date | null;
  refreshProducts: () => void;
  fetchOneProduct: (id: string) => Promise<Product | undefined>;
  createProduct: (product: Product) => Promise<Product | undefined>;
  updateProduct: (id: string, product: Product) => Promise<Product | undefined>;
  deleteProduct: (id: string) => Promise<void>;
}
