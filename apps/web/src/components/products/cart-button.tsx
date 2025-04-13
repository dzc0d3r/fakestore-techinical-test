"use client";

import { Button } from "@/components/ui/button";
import { CartContext } from "@/providers/cart-provider";
import type { Product } from "api";
import { ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useContext } from "react";

interface AdminActionProps {
  product: Product;
}

export default function CartButton({
  product,
}: AdminActionProps): React.JSX.Element {
  const { addToCart } = useContext(CartContext);
  const { data: session } = useSession();

  const handleAddToCart = (): void => {
    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      quantity: 1,
    });
  };
  return (
    <>
      {session?.user.role === "user" && (
        <div className="z-10 mb-5 flex flex-row justify-end">
          <Button
            className="flex gap-1 rounded-full hover:scale-105"
            onClick={handleAddToCart}
            size="icon"
          >
            <ShoppingCart size="16" />
          </Button>
        </div>
      )}
    </>
  );
}
