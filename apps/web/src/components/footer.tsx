import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";


export async function Footer() {
  const session = await auth();
  return (
    <footer className="bg-gray-800 py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-gray-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-gray-300">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="hover:text-gray-300">
                  All Products
                </Link>
              </li>
              <li>
                {session ? (
                  <Link href="/profile" className="hover:text-gray-300">
                    Profile
                  </Link>
                ) : (
                  <Link href="/login" className="hover:text-gray-300">
                    My Profile
                  </Link>
                )}
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Contact</h3>
            <ul className="space-y-2">
              <li>Email: support@example.com</li>
              <li>Phone: (123) 456-7890</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Newsletter</h3>
            <p className="text-gray-300">
              Subscribe to our newsletter for updates
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="Your email"
                className="border-gray-700 bg-gray-800"
              />
              <Button variant="secondary">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Weasydoo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
