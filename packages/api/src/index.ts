import axios from "axios";
import {
  useProducts,
  useProduct,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct
} from "@/hooks/use-products"
import { useAuth, type LoginCredentials, type LoginResponse } from "@/hooks/use-auth";
import type { Product } from "@/types/products";

export const api = axios.create({
  baseURL: "https://fakestoreapi.com",
});

export {
  useProducts,
  useProduct,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
  useAuth
};
export type { Product, LoginCredentials, LoginResponse };
