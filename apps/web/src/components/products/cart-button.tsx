"use client"
import { useSession } from "next-auth/react"
import type { Product } from "api"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useContext } from "react"
import { CartContext } from "@/providers/cart-provider"

interface AdminActionProps {
    product: Product,   
}

export default function CartButton({ product }: AdminActionProps): React.JSX.Element {
   const {addToCart} = useContext(CartContext)
   const {data: session} = useSession()

   const handleAddToCart = (): void => {
    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      quantity: 1
    })

   }
   return (
    <>
    {session?.user.role === "user" && (
        <div className="flex flex-row justify-end mb-5 z-10" >
         
         <Button className="rounded-full flex gap-1 hover:scale-105" onClick={handleAddToCart} size="icon">
            <ShoppingCart size="16" /> 
         </Button>
         

        </div>
    )}
    </>
  )
}
