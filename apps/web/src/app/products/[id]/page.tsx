import { auth } from "@/auth";
import ProductImage from "@/components/products/product-image";
import { Button } from "@/components/ui/button";
import type { Product } from "api";
import { Settings } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: {
    id: string;
  };
}

async function ProductPage({
  params: { id },
}: ProductPageProps): Promise<JSX.Element> {
  const session = await auth();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
    );
    const product = (await res.json()) as Product;

    return (
      <main className="container mx-auto mt-5">
        <div className="mt-15 relative flex max-w-5xl flex-col items-center justify-center gap-8 px-4 pb-5 md:flex-row">
          <ProductImage product={product} />
          <div className="absolute right-0 top-0 z-10">
            {session?.user.role === "admin" && (
              <div className="mb-5 flex flex-row justify-end gap-1">
                <Link href={`/admin?product=${product.id}`}>
                  <Button
                    className="rounded-sm bg-slate-700 text-sm hover:scale-105 hover:bg-slate-500"
                    size="default"
                  >
                    Manage Product
                    <Settings size="16" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
          <div className="divide-y">
            <div className="space-y-2 pb-8">
              <h1 className="text-2xl font-bold md:text-3xl">
                {product.title}
              </h1>
              <h2 className="text-primary/70 text-xl font-medium md:text-3xl">
                ${product.price}
              </h2>
            </div>

            <div className="pt-8">
              <p className="text-xs md:text-sm">{product.description}</p>
            </div>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.log(error);
    notFound();
  }
}

export default ProductPage;
