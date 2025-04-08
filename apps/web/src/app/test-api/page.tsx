'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useProducts } from 'api'
import {Button} from "@/components/ui/button"
const queryClient = new QueryClient()

function ProductsList() {
  const { data: products, isLoading, error } = useProducts()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <ul className="space-y-2">
      {products?.map((product) => (
        <li key={product.id} className="border p-2 rounded">
          <h2 className="font-medium">{product.title}</h2>
          <p className="text-gray-600">${product.price}</p>
          <Button variant="destructive">click</Button>
        </li>
      ))}
    </ul>
  )
}

export default function TestApiPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <ProductsList />
      </div>
    </QueryClientProvider>
  )
}
