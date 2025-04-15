import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Logo from "@/public/logo.png";
import { AlignLeft, CircleUser, LogOut, Search, Settings, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Cart from "./cart";
import LoginButton from "./login-button";


export default async function NaVBar(): Promise<JSX.Element> {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 bg-white bg-opacity-80 px-4 shadow-sm backdrop-blur-lg backdrop-filter md:px-6">
      <nav className="hidden flex-col gap-2 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-2">
        <Link
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
          href="/"
        >
          <Image
            alt="FakeStore Inc"
            height={120}
            placeholder="blur"
            src={Logo}
            width={120}
          />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Link className="text-primary/80 hover:text-foreground" href="/about">
          <Button variant="ghost">About</Button>
        </Link>
        <Link className="text-primary/80 hover:text-foreground" href="privacy">
          <Button variant="ghost">Privacy</Button>
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="shrink-0 md:hidden" size="icon" variant="ghost">
            <AlignLeft className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              className="flex items-center gap-2 text-lg font-semibold"
              href="/"
            >
              <Image
                alt="FakeStore Inc"
                height={50}
                placeholder="blur"
                src={Logo}
                width={50}
              />
              <span className="sr-only">Acme Inc</span>
            </Link>

            <div className="mt-5 grid gap-4">
              <Link
                className="text-primary/80 hover:text-foreground"
                href="/about"
              >
                About
              </Link>
              <Link
                className="text-primary/80 hover:text-foreground"
                href="privacy"
              >
                Privacy
              </Link>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
            <Input
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              placeholder="Search products..."
              type="search"
            />
          </div>
        </form>
        <Cart />

        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full" size="icon" variant="secondary">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44 p-5">
              {session?.user?.role === "admin" && (
                <DropdownMenuItem
                  asChild
                  className="outline-none hover:cursor-pointer"
                >
                  <Link
                    className="lg:text-md flex w-full flex-row gap-2 font-medium"
                    href="/admin"
                  >
                    <Shield className="left-2" /> Admin Area
                  </Link>
                </DropdownMenuItem>
              )}

              <DropdownMenuItem
                asChild
                className="outline-none hover:cursor-pointer"
              >
                <Link
                  className="lg:text-md flex w-full flex-row gap-2 font-medium"
                  href="/profile"
                >
                  <Settings className="left-2" /> Settings
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <form
                action={async (): Promise<undefined> => {
                  "use server";
                  await signOut();
                }}
              >
                <Button
                  className="relative w-full"
                  size="sm"
                  type="submit"
                  variant="destructive"
                >
                  <LogOut className="absolute left-3" /> Logout
                </Button>
              </form>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <LoginButton />
        )}
      </div>
    </header>
  );
}