import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../";
import { Product } from "../types/products";

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await api.get("/products");
      return data;
    },
  });
};

export const useProduct = (id: number) => {
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await api.get(`/products/${id}`);
      return data;
    },
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newProduct: Product) =>
      api.post("/products", newProduct).then((res) => res.data),
    onSuccess: (data) => {
      queryClient.setQueryData(["product", data.id], data);
      queryClient.setQueryData(["products"], (old: Product[] | undefined) =>
        old ? [...old, data] : [data],
      );
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedProduct: Product) =>
      api
        .put(`/products/${updatedProduct.id}`, updatedProduct)
        .then((res) => res.data),
    onSuccess: (data) => {
      queryClient.setQueryData(["product", data.id], data);
      queryClient.setQueryData(["products"], (old: Product[] | undefined) =>
        old ? old.map((p) => (p.id === data.id ? data : p)) : [],
      );
      queryClient.invalidateQueries({ queryKey: ["product", data.id] });
    },
    onError: (error) => {
      console.error("Error updating product:", error);
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.delete(`/products/${id}`),
    onSuccess: (_, id) => {
      queryClient.setQueryData(["products"], (old: Product[] | undefined) =>
        old ? old.filter((p) => p.id !== id) : [],
      );
      queryClient.invalidateQueries({ queryKey: ["product", id] });
    },
  });
};
