import Link from "next/link"
import {
  CircleUser, AlignLeft, Search,
  Shield, Settings,
  LogOut
}
  from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"
import Logo from "@/public/logo.png"
import LoginButton from "./login-button"
import Cart from "./cart"
import { auth, signOut } from "@/auth"



export default async function NaVBar(): Promise<JSX.Element> {


  const session = await auth()


  return (
    <header className="sticky backdrop-blur-lg bg-white backdrop-filter  bg-opacity-80 top-0 shadow-sm flex h-16 items-center gap-4 px-4 md:px-6 z-50">
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
        <Link
          className="text-primary/80 hover:text-foreground"
          href="/about"
        >
          <Button variant="ghost">About</Button>
        </Link>
        <Link
          className="text-primary/80 hover:text-foreground"
          href="privacy"
        >
          <Button variant="ghost">Privacy</Button>
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            className="shrink-0 md:hidden"
            size="icon"
            variant="ghost"
          >
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

            <div className="grid gap-4 mt-5">
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
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
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
              {session?.user.role === "admin" && (
                <DropdownMenuItem asChild className="hover:cursor-pointer outline-none ">
                  <Link className="flex flex-row gap-2 lg:text-md w-full font-medium" href="/admin" >
                    <Shield className=" left-2" /> Admin Area
                  </Link>
                </DropdownMenuItem>

              )}
              
              <DropdownMenuItem asChild className="hover:cursor-pointer outline-none ">
                <Link className="flex flex-row gap-2 lg:text-md w-full font-medium" href="/profile" >
                  <Settings className=" left-2" /> Settings
                </Link>
              </DropdownMenuItem>

              
              <DropdownMenuSeparator />
              <form
                action={async (): Promise<undefined> => {
                  "use server";
                  await signOut();

                }}
              >
                <Button className="w-full relative" size="sm" type="submit" variant="destructive">
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


  )
}
