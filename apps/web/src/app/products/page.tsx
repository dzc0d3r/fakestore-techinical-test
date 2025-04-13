import Products from "@/components/products";

function Page() {
  return (
    <section className="container mx-auto flex min-h-screen flex-col space-y-12 pb-44">
      <h1 className="text-primary/85 my-10 text-4xl font-semibold">
        All Products
      </h1>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        <Products />
      </div>
    </section>
  );
}

export default Page;
