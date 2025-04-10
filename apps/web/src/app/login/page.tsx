import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {redirect} from "next/navigation"
import LoginForm from "@/components/auth/login/login-form"
import {auth} from "@/auth"


export default async function Page(): Promise<JSX.Element> {
  const session = await auth()
  if (session) {
    redirect("/")
    
  }
  return (
    <main className="min-h-screen grid place-content-center -mt-7">
        <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Log in</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
    </main>
  )
}
