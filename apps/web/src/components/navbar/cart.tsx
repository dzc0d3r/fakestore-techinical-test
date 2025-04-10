"use client"
import { useContext ,useState, useEffect} from 'react'
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import type { CartItem } from "@/providers/cart-provider";
import { CartContext } from "@/providers/cart-provider"

export default function Cart(): JSX.Element {
  const {cartItems} = useContext(CartContext);

  const [itemsInCart, setItemsInCart] = useState<CartItem[]>([])

  useEffect(() => {
    
     setItemsInCart(cartItems)
    
  }, [cartItems])
  

  return (

    <div className="relative flex items-center gap-4 flex-row">
      
      <Sheet>
      <SheetTrigger asChild>
        <div className="hover:cursor-pointer">
          <ShoppingCart />
          {itemsInCart.length > 0 && (
            <span className="absolute -top-3 -right-1 bg-red-500 rounded-full w-4 h-4 text-[.7rem] text-white font-medium flex items-center justify-center" >
            {itemsInCart.length || null}
          </span>
          )} 
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your cart</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        {cartItems.map((item) => (
          <div key={item.id}>
           <h2>{item.name}</h2>

          </div>

        )
        )}
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
    </div>

  )
}

