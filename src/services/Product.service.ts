import axios from 'axios';
import { Product } from "../models/Product.model.ts";

const PERFUME_API_URL = 'http://localhost:8080'; // Ensure the URL is correctly formatted

const ProductService = {
    getAllProducts: async () => {
        const response = await axios.get(PERFUME_API_URL + '/product/'); // Adjust the endpoint if necessary
        const products: Product[] = response.data;
        return products;
    },
    getOneProduct: async (id: number) => {
        const response = await axios.get(PERFUME_API_URL + '/product/' + id);
        const product: Product = { ...response.data, id: id };
        return product;
    },
    AddProduct: async (product: Product) => {
        const response = await axios.post(PERFUME_API_URL + '/product', product);
        return response.data;
    },
    DeleteProduct: async (id: number) => {
        const response = await axios.delete(PERFUME_API_URL + '/product/' + id);
        return response.data;
    }
};

export default ProductService;
