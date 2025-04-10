import axios from "axios";
import {
  useProducts,
  useProduct,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct
} from "@/hooks/use-products"
import type { Product } from "@/types/products";
import { Jwt } from "jsonwebtoken";

export type LoginCredentials = {
  username: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export const api = axios.create({
  baseURL: "https://fakestoreapi.com",
});

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {
  useProducts,
  useProduct,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct
};
export type { Product };
