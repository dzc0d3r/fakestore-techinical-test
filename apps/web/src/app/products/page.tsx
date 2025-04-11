import Products from "@/components/products"
function Page() {
  return (
    <section className="container mx-auto flex flex-col space-y-12 pb-44">
        <h1 className="text-4xl font-semibold my-10 text-primary/85">All Products</h1>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  xl:gap-x-8">
          <Products />
        </div>

    </section>
  )
}

export default Page