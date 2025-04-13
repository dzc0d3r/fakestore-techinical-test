"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { CartItem } from "@/providers/cart-provider";
import { CartContext } from "@/providers/cart-provider";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";

export default function Cart(): JSX.Element {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    deleteFromCart,
    clearCart,
    getCartTotal,
  } = useContext(CartContext);
  const [itemsInCart, setItemsInCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setItemsInCart(cartItems);
  }, [cartItems]);

  return (
    <div className="relative flex flex-row items-center gap-4">
      <Sheet>
        <SheetTrigger asChild>
          <div className="hover:cursor-pointer">
            <ShoppingCart />
            {itemsInCart.length > 0 && (
              <span className="absolute -right-1 -top-3 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[.7rem] font-medium text-white">
                {itemsInCart.length}
              </span>
            )}
          </div>
        </SheetTrigger>
        <SheetContent className="flex flex-col">
          <SheetHeader>
            <SheetTitle>Your cart</SheetTitle>
            <SheetDescription>
              Review and manage your shopping cart items
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 space-y-4 overflow-auto py-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm">${item.price.toFixed(2)}</p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 rounded-full"
                      onClick={() => removeFromCart(item)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm font-medium">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 rounded-full"
                      onClick={() => addToCart(item)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full text-red-500 hover:text-red-600"
                    onClick={() => deleteFromCart(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto space-y-4 border-t pt-4">
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>

            <Button
              onClick={clearCart}
              variant="destructive"
              className="w-full"
            >
              Clear Cart
            </Button>

            <SheetFooter>
              <SheetClose asChild>
                <Button className="w-full">Continue Shopping</Button>
              </SheetClose>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
