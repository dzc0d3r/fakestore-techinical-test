"use client"
import { useProducts } from "api";
import SingleProduct from "./signle-product";
function Products() {
    const { 
      data: products, 
      isLoading, 
      error
    } = useProducts()
    if (error) return <div className="p-4 text-red-500">Error: {error.message}</div>
  return (
    <>
          {products?.map((product) => (
            <SingleProduct key={product.id} product={product} />
          ))}
    </>
  )
}

export default Products