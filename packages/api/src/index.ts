import axios from "axios";
import {
  useProducts,
  useProduct,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct
} from "./hooks/use-products.js";
import type { Product } from "./types/products.js";

export const api = axios.create({
  baseURL: "https://fakestoreapi.com",
});

export {
  useProducts,
  useProduct,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct
};
export type { Product };
