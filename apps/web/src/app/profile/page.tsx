import { auth } from "@/auth";
import { User } from "lucide-react";
import { Metadata } from "next";
import { redirect } from "next/navigation";


export const metadata: Metadata = {
  title: "Profile - WeasyDoo Store",
  description: "View your profile information",
};

export default async function ProfilePage() {
  // Mock user data - in a real app this would come from auth/session
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="container mx-auto mt-10 flex min-h-screen gap-10 py-8">
      <h1 className="mb-8 text-3xl font-bold">Profile</h1>

      <div className="flex w-full gap-6">
        <div className="relative">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
            <User className="h-16 w-16 text-gray-400" />
          </div>
        </div>

        <div className="text-start">
          <h2 className="text-2xl font-semibold">{session?.user.username}</h2>
          <p className="text-gray-500">Access : {session?.user.role}</p>
        </div>

        <div className="min-w-5xl flex flex-1 flex-col items-center rounded-lg bg-white p-6 shadow-md">
          <h3 className="mb-4 font-medium">Account Details</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{session?.user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}