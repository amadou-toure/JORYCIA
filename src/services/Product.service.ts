import axios from "axios";
import { Product, ProductCreate } from "../models/Product.model";

const PERFUME_API_URL = import.meta.env.VITE_API_URL; // Ensure the URL is correctly formatted
const params = {
  headers: {
    Authorization: `${localStorage.getItem("token")}`,
  },
};

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
  createProduct: async (product: ProductCreate) => {
    if (params.headers.Authorization === null) {
      throw new Error("User not authenticated");
    }
    const response = await axios.post(
      PERFUME_API_URL + "/product/",
      product,
      params
    );
    return response.data;
  },
  updateProduct: async (id: string, product: Product) => {
    const response = await axios.put(
      PERFUME_API_URL + "/product/" + id,
      product,
      params
    );
    return response.data;
  },
  deleteProduct: async (ID: string) => {
    const response = await axios.delete(
      PERFUME_API_URL + "/product/" + ID,
      params
    );
    return response.data;
  },
};

export default ProductService;
