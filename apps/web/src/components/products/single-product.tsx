
import Link from "next/link";
import type {Product} from "api"
import ProductImage from "./product-image";
import CartButton from "./cart-button";

interface ProductProps {
  product: Product;
};

function SingleProduct({ product }: ProductProps): JSX.Element {
  
  return (
    <div className="flex flex-col relative">
    <div
      className="h-96 flex flex-col p-5 group rounded hover:scale-105 transition-transform ease-out duration-200 "
      
    > 
      <div className="absolute top-0 z-10">      
        <CartButton product={product} />
      </div>
      <Link href={`/products/${product.id}`}>
        
        <div className="relative h-72 max-h-72">
          <ProductImage fill product={product} />
        </div>
      

      <div className="font-semibold flex items-center justify-between mt-4 mb-1">
        <p className="w-44 truncate">{product.title}</p>
        <p>${product.price}</p>
      </div>
      
      

      <p className="italic text-xs mx-w-58 line-clamp-2 text-gray-600">
        {product.description}
      </p>
        </Link>
    </div>
    
    </div>
  );
}

export default SingleProduct;