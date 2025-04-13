import { auth } from "@/auth";
import LoginForm from "@/components/auth/login/login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";

export default async function Page(): Promise<JSX.Element> {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return (
    <main className="-mt-7 grid min-h-screen place-content-center">
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
  );
}
