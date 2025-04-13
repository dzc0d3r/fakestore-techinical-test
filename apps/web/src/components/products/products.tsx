"use client"
import { useProducts } from "api";
import SingleProduct from "./single-product";
import { Skeleton } from "@/components/ui/skeleton";

function Products() {
  const { 
    data: products, 
    isLoading, 
    error
  } = useProducts();

  if (error) return <div className="p-4 text-red-500">Error: {error.message}</div>;

  if (isLoading) {
    return (
      <>
        {/* Skeleton loading state */}
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="flex flex-col relative group">
            <div className="h-96 flex flex-col p-5 rounded hover:scale-105 transition-transform ease-out duration-200">
              <div className="absolute top-0 z-10">
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
              <div className="relative h-72 max-h-72 mb-4">
                <Skeleton className="h-full w-full rounded-lg" />
              </div>
              <div className="font-semibold flex items-center justify-between mt-4 mb-1">
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