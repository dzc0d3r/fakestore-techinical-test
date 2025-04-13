
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button";
import {Store} from "lucide-react"
import dynamic from "next/dynamic";
import HeroImage from "@/public/hero.png";
const Products = dynamic(() => import('@/components/products'), {
  loading: () => <p>Loading...</p>,
})
export default function Home(): JSX.Element {
  return (
    <main className="min-h-screen container max-w-6xl mx-auto px-8 xl:px-0 ">
      <HeroSection />
      
      <section className="flex flex-col space-y-12 pb-44">
        <h1 className="text-4xl font-semibold text-center text-primary/85">Trending Today</h1>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  xl:gap-x-8">
          <Products />
        </div>

      </section>
    </main>
  );
}

export function HeroSection(): JSX.Element {
  return (
    <section className="py-2">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 flex text-center items-center flex-col lg:text-left mb-8 lg:mb-0">
                <h1 className="text-3xl md:text-5xl font-bold text-primary/90 leading-tight">Discover Your Style</h1>
                <p className="mt-4 text-primary/60  lg:text-lg">Discover the perfect pick for every moment — from stunning outfits and elegant jewelry to the latest electronics.<br/>
Whether you&apos;re dressing up, upgrading your tech, or finding a standout gift, our collection has everything you need to look, feel, and live your best.
            </p>
                <Link className="mt-5  flex flex-row items-center" href="/products">
                  <Button className="py-7 flex flex-row  gap-7 font-medium text-xl" size="default">Shop Now <Store/>
                  </Button>
                </Link>
            </div>
            <div className="lg:w-1/3">
                <Image 
                alt="Shop Hero Image"
                className="hidden lg:flex rounded-md"
                 placeholder="blur"  src={HeroImage} />
            </div>
        </div>
    </section>
  )
}