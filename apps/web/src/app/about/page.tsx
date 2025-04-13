import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - WeasyDoo Store",
  description: "Learn more about WeasyDoo Store and our mission",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">About WeasyDoo Store</h1>

      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Our Story</h2>
        <p className="mb-4">
          Founded in 2023, WeasyDoo Store started as a small passion project
          with a simple goal: to provide high-quality products with exceptional
          customer service. What began as a modest online shop has grown into a
          trusted ecommerce destination serving customers worldwide.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Our Mission</h2>
        <p className="mb-4">
          We believe shopping should be easy, enjoyable, and accessible to
          everyone. That&apos;s why we&apos;ve partnered with FakeStoreAPI to
          bring you a seamless shopping experience with a wide selection of
          products at competitive prices.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Our Team</h2>
        <p className="mb-4">
          The WeasyDoo team is made up of passionate individuals dedicated to
          making your shopping experience exceptional. From our customer service
          representatives to our tech team, everyone works together to ensure
          you get the best products and service possible.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Our Products</h2>
        <p className="mb-4">
          We carefully curate our product selection to bring you the best
          quality items. Whether you&apos;re shopping for electronics, clothing,
          or home goods, you can trust that every product in our store meets our
          high standards.
        </p>
      </section>
    </div>
  );
}
