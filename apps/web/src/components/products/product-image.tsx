"use client";

import type { Product } from "api";
import Image from "next/image";
import { useState } from "react";

interface ProductProps {
  product: Product;
  fill?: boolean;
}

function ProductImage({ product, fill }: ProductProps): JSX.Element {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {fill ? (
        <Image
          alt={product.title}
          className={`absolute z-auto object-contain duration-700 ease-in-out group-hover:opacity-75 ${
            loading
              ? "scale-100 blur-2xl grayscale"
              : "scale-100 blur-0 grayscale-0"
          }}`}
          fill
          onLoad={() => {
            setLoading(false);
          }}
          src={product.image}
        />
      ) : (
        <Image
          alt={product.title}
          className={`object-contain duration-700 ease-in-out group-hover:opacity-75 ${
            loading
              ? "scale-110 blur-2xl grayscale"
              : "scale-100 blur-0 grayscale-0"
          }}`}
          height={1000}
          onLoad={() => {
            setLoading(false);
          }}
          src={product.image}
          width={400}
        />
      )}
    </>
  );
}

export default ProductImage;
