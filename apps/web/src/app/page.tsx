import { Button } from "@/components/ui/button";
import HeroImage from "@/public/hero.png";
import { Store } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

const Products = dynamic(() => import("@/components/products"), {
  loading: () => <p>Loading...</p>,
});
export default function Home(): JSX.Element {
  return (
    <main className="container mx-auto min-h-screen max-w-6xl px-8 xl:px-0">
      <HeroSection />

      <section className="flex flex-col space-y-12 pb-44">
        <h1 className="text-primary/85 text-center text-4xl font-semibold">
          Trending Today
        </h1>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          <Products />
        </div>
      </section>
    </main>
  );
}

function HeroSection(): JSX.Element {
  return (
    <section className="py-2">
      <div className="container mx-auto flex flex-col items-center justify-between px-4 lg:flex-row">
        <div className="mb-8 flex flex-col items-center text-center lg:mb-0 lg:w-1/2 md:text-start md:items-start">
          <h1 className="text-primary/90 text-3xl font-bold leading-tight md:text-5xl ">
            Discover Your Style
          </h1>
          <p className="text-primary/60 mt-4 lg:text-lg">
            Discover the perfect pick for every moment — from stunning outfits
            and elegant jewelry to the latest electronics.
            <br />
            Whether you&apos;re dressing up, upgrading your tech, or finding a
            standout gift, our collection has everything you need to look, feel,
            and live your best.
          </p>
          <Link className="mt-5 flex flex-row items-center" href="/products">
            <Button
              className="flex flex-row gap-7 py-7 text-xl font-medium"
              size="default"
            >
              Shop Now <Store />
            </Button>
          </Link>
        </div>
        <div className="lg:w-1/3">
          <Image
            alt="Shop Hero Image"
            className="hidden rounded-md lg:flex"
            placeholder="blur"
            src={HeroImage}
          />
        </div>
      </div>
    </section>
  );
}
