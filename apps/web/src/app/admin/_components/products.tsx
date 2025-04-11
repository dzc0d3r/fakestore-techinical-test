'use client'
import { 
  useProducts,
  useProduct,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
  type Product
} from 'api'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import Image from 'next/image'

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  price: z.number().min(0.01, 'Price must be at least 0.01'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(1, 'Description is required'),
})

export default function Products() {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<{
    id: number | null
    title: string
    price: number
  } | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      price: 0,
      category: '',
      description: '',
    }
  })

  // Queries
  const { 
    data: products, 
    isLoading, 
    error
  } = useProducts()
  const { data: selectedProduct } = useProduct(selectedId ?? 0)

  // Mutations
  const create = useCreateProduct()
  const update = useUpdateProduct()
  const remove = useDeleteProduct()

  const handleCreate = async (values: z.infer<typeof formSchema>) => {
    try {
      await create.mutateAsync({
        ...values,
        image: 'https://placehold.co/300x300/png',
        rating: {
          rate: 0,
          count: 0
        }
      })
      form.reset()
      setCreateModalOpen(false)
    } catch (err) {
      console.error('Create error:', err)
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct({
      id: product.id,
      title: product.title,
      price: product.price
    })
  }

  const handleUpdate = async (product: Product) => {
    if (!editingProduct?.title || !editingProduct.price) return
    try {
      await update.mutateAsync({
        ...product,
        title: editingProduct.title,
        price: editingProduct.price
      })
      setEditingProduct(null)
    } catch (err) {
      console.error('Update error:', err)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await remove.mutateAsync(id)
      if (selectedId === id) setSelectedId(null)
    } catch (err) {
      console.error('Delete error:', err)
    }
  }

  if (error) return <div className="p-4 text-red-500">Error: {error.message}</div>

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products CRUD</h1>
        <Button onClick={() => setCreateModalOpen(true)}>
          Add Product
        </Button>
      </div>

      {/* Create Product Modal */}
      <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Product</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCreate)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Product title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0.00"
                        {...field}
                        onChange={e => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="jewelery">Jewelry</SelectItem>
                        <SelectItem value="men's clothing">Mens Clothing</SelectItem>
                        <SelectItem value="women's clothing">Women Clothing</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Product description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit"
                disabled={create.isPending}
                className="w-full"
              >
                {create.isPending ? 'Creating...' : 'Create Product'}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Products Table */}
      <div className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Loading Skeletons
              Array(5).fill(0).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-7 w-[800px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-7 w-[100px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-7 w-[150px]" />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Skeleton className="h-8 w-12" />
                      <Skeleton className="h-8 w-12" />
                      <Skeleton className="h-8 w-12" />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              // Actual Data
              [...(products || [])].reverse().map((product) => (
                <TableRow key={product.id}>
                  {editingProduct?.id === product.id ? (
                    <>
                      <TableCell>
                        <Input
                          value={editingProduct.title}
                          onChange={(e) => setEditingProduct({
                            ...editingProduct,
                            title: e.target.value
                          })}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={editingProduct.price}
                          onChange={(e) => setEditingProduct({
                            ...editingProduct,
                            price: Number(e.target.value)
                          })}
                        />
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleUpdate(product)}
                            disabled={update.isPending}
                          >
                            {update.isPending ? 'Saving...' : 'Save'}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingProduct(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell className="font-medium">{product.title}</TableCell>
                      <TableCell>${product.price}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedId(product.id)}
                          >
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleEdit(product)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(product.id)}
                            disabled={remove.isPending}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Product Details Modal */}
      <Dialog open={!!selectedId} onOpenChange={(open) => !open && setSelectedId(null)}>
        <DialogContent className="sm:max-w-2xl">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle>Product Details</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Image 
                    src={selectedProduct.image} 
                    alt={selectedProduct.title}
                    width={300}
                    height={300}
                    className="w-full h-auto rounded border"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">{selectedProduct.title}</h3>
                  <p className="text-gray-600">${selectedProduct.price}</p>
                  <p className="text-sm text-gray-500">{selectedProduct.category}</p>
                  <p className="text-sm">{selectedProduct.description}</p>
                  <div className="flex items-center gap-1 text-sm">
                    <span>Rating: {selectedProduct.rating?.rate}</span>
                    <span>({selectedProduct.rating?.count} reviews)</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}