import  { Product } from './Product.model.ts';
export type ProductContextType = {
    Products: Product[];
    isLoading: boolean;
    lastFetched: Date | null;
    refreshProducts: () => void;
};