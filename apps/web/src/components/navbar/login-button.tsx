"use client"
import { LogIn } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function LoginButton(): JSX.Element {
  const pathname = usePathname()
  const redirectTo = pathname !== "/login" ? `/login?url=${pathname.replace(/^\/+/, '')}`: "/"
  return (
    <Link className="flex flex-row gap-4" href={redirectTo}>
      <Button className="lex flex-row gap-1 lg:min-w-20" size="sm">
        Login <LogIn size="16" />
      </Button>     
    </Link>
  )
}

