import Products  from "./_components/products"
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth()
  console.log(session?.user.role)
  if (!session || session.user.role !== "admin") return redirect("/")
 
  return (
    <div className="container min-h-screen mx-auto flex flex-col space-y-12 pb-44">
      <Products />
    </div>
  )
}
