import type { Product } from "api";
import Link from "next/link";
import CartButton from "./cart-button";
import ProductImage from "./product-image";

interface ProductProps {
  product: Product;
}

function SingleProduct({ product }: ProductProps): JSX.Element {
  return (
    <div className="relative flex flex-col">
      <div className="group flex h-96 flex-col rounded p-5 transition-transform duration-200 ease-out hover:scale-105">
        <div className="absolute top-0 z-10">
          <CartButton product={product} />
        </div>
        <Link href={`/products/${product.id}`}>
          <div className="relative h-72 max-h-72">
            <ProductImage fill product={product} />
          </div>

          <div className="mb-1 mt-4 flex items-center justify-between font-semibold">
            <p className="w-44 truncate">{product.title}</p>
            <p>${product.price}</p>
          </div>

          <p className="mx-w-58 line-clamp-2 text-xs italic text-gray-600">
            {product.description}
          </p>
        </Link>
      </div>
    </div>
  );
}

export default SingleProduct;
