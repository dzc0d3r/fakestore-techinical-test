import { Metadata } from 'next'
import { User } from 'lucide-react'
import {auth} from '@/auth'
export const metadata: Metadata = {
  title: 'Profile - WeasyDoo Store',
  description: 'View your profile information',
}

export  default async function ProfilePage() {
  // Mock user data - in a real app this would come from auth/session
  const session = await auth()

  return (
    <div className="container min-h-screen flex mt-10 gap-10 mx-auto py-8 ">
      <h1 className="text-3xl font-bold  mb-8">Profile</h1>
      
      <div className="flex  gap-6 w-full">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
            <User className="w-16 h-16 text-gray-400" />
          </div>
        </div>

        <div className="text-start">
          <h2 className="text-2xl font-semibold">{session?.user.username}</h2>
          <p className="text-gray-500">Access : {session?.user.role}</p>
        </div>

        <div className="min-w-5xl flex flex-col flex-1 items-center bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-medium mb-4">Account Details</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{session?.user.email}</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}