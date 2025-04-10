
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth()
  console.log(session?.user.role)
  if (!session || session.user.role !== "admin") return redirect("/")
 
  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  )
}
