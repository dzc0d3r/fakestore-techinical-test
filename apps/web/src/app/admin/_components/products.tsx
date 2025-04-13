'use client'
import { toast } from "react-toastify"
import { useSearchParams } from 'next/navigation'
import { 
  useProducts,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
  type Product
} from 'api'
import { useState, useEffect } from 'react'
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
  const searchParams = useSearchParams()
  const productQuery = searchParams.get('product') 
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  


  const createForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      price: 0,
      category: '',
      description: '',
    }
  })

  const editForm = useForm<z.infer<typeof formSchema>>({
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
  const selectedProduct  = products?.filter((product) => product.id == selectedId)[0]// useProduct(selectedId ?? 0)


  // Mutations
  const create = useCreateProduct()
  const update = useUpdateProduct()
  const remove = useDeleteProduct()

  useEffect(() => {
    if (editingProduct) {
      editForm.reset({
        title: editingProduct.title,
        price: editingProduct.price,
        category: editingProduct.category,
        description: editingProduct.description
      })
    }
  }, [editingProduct, editForm])

  const handleCreate = async (values: z.infer<typeof formSchema>) => {
    try {
      await create.mutateAsync({
        id: Math.floor(Math.random() * 10000),
        ...values,
        image: 'https://placehold.co/300x300/png',
        rating: { rate: 0, count: 0 }
      })
      createForm.reset()
      setCreateModalOpen(false)
      toast.success(`Successfully created product `)
    } catch (err) {
      console.error('Create error:', err)
    }
  }

  const handleUpdate = async (values: z.infer<typeof formSchema>) => {
    if (!editingProduct) return
    
    try {
      await update.mutateAsync({
        ...editingProduct,
        ...values
      })
      toast.success("Product updated successfully")
      setEditModalOpen(false)
      setEditingProduct(null)
    } catch (err) {
      console.error('Update error:', err)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await remove.mutateAsync(id)
      if (selectedId === id) setSelectedId(null)
      toast.success(`Successfully deleted product `)
    } catch (err) {
      console.error('Delete error:', err)
    }
  }

  if (error) {
    return <div className="container flex flex-col items-center justify-center min-h-screen mx-auto p-4">
      <h1 className="text-red-500 font-bold text-3xl">Error: {error.message}</h1>
      <p className="text-lg">Check your connection and try to refresh the page</p>
    </div> 
  }

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
          <Form {...createForm}>
            <form onSubmit={createForm.handleSubmit(handleCreate)} className="space-y-4">
              <FormField
                control={createForm.control}
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
                control={createForm.control}
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
                control={createForm.control}
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
                control={createForm.control}
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

      {/* Edit Product Modal */}
      <Dialog open={editModalOpen} onOpenChange={(open) => {
        if (!open) {
          setEditModalOpen(false)
          setEditingProduct(null)
        }
      }}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(handleUpdate)} className="space-y-4">
              <FormField
                control={editForm.control}
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
                control={editForm.control}
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
                control={editForm.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
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
                control={editForm.control}
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
                disabled={update.isPending}
                className="w-full"
              >
                {update.isPending ? 'Updating...' : 'Update Product'}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Products Table */}
      <div className="space-y-4">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className='bg-gray-100'>
                <TableHead className="w-[lg:700px]">Title</TableHead>
                <TableHead className="w-[lg:120px]">Price</TableHead>
                <TableHead className="w-[lg:180px]">Category</TableHead>
                <TableHead className="w-[lg:200px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array(9).fill(0).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="h-4 lg:w-[800px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 lg:w-[80px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 lg:w-[120px]" />
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
                [...(products || [])]
                  .filter(product => !productQuery || product.id === Number(productQuery))
                  .reverse()
                  .map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        {product.title}
                      </TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell className="capitalize">
                        {product.category}
                      </TableCell>
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
                            onClick={() => {
                              setEditingProduct(product)
                              setEditModalOpen(true)
                            }}
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
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </div>
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
                  <h3 className="text-lg font-medium">{selectedProduct?.title}</h3>
                  <p className="text-gray-600">${selectedProduct?.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-500 capitalize">{selectedProduct?.category}</p>
                  <p className="text-sm">{selectedProduct?.description}</p>
                  <div className="flex items-center gap-1 text-sm">
                    <span>Rating: {selectedProduct?.rating?.rate || 0}</span>
                    <span>({selectedProduct?.rating?.count || 0} reviews)</span>
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