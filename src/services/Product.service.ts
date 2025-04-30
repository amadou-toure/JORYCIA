import axios from "axios";
import { Product } from "../models/Product.model.ts";

const PERFUME_API_URL = import.meta.env.VITE_API_URL; // Ensure the URL is correctly formatted

const ProductService = {
  getAllProducts: async () => {
    const response = await axios.get(PERFUME_API_URL + "/product/"); // Adjust the endpoint if necessary
    const products: Product[] = response.data;
    return products;
  },
  getOneProduct: async (ID: string) => {
    const response = await axios.get(PERFUME_API_URL + "/product/" + ID);
    const product: Product = { ...response.data, ID: ID };
    return product;
  },
  createProduct: async (product: Product) => {
    const response = await axios.post(PERFUME_API_URL + "/product", product);
    return response.data;
  },
  updateProduct: async (id: string, product: Product) => {
    const response = await axios.put(
      PERFUME_API_URL + "/product/" + id,
      product
    );
    return response.data;
  },
  deleteProduct: async (ID: string) => {
    const response = await axios.delete(PERFUME_API_URL + "/product/" + ID);
    return response.data;
  },
};

export default ProductService;
