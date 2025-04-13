"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useProducts } from "api";
import SingleProduct from "./single-product";

function Products() {
  const { data: products, isLoading, error } = useProducts();

  if (error)
    return <div className="p-4 text-red-500">Error: {error.message}</div>;

  if (isLoading) {
    return (
      <>
        {/* Skeleton loading state */}
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="group relative flex flex-col">
            <div className="flex h-96 flex-col rounded p-5 transition-transform duration-200 ease-out hover:scale-105">
              <div className="absolute top-0 z-10">
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
              <div className="relative mb-4 h-72 max-h-72">
                <Skeleton className="h-full w-full rounded-lg" />
              </div>
              <div className="mb-1 mt-4 flex items-center justify-between font-semibold">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-12" />
              </div>
              <div className="space-y-1">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5" />
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      {products?.map((product) => (
        <SingleProduct key={product.id} product={product} />
      ))}
    </>
  );
}

export default Products;
