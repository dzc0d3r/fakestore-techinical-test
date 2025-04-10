"use client"

import {
  Dialog,
  DialogContent,  
} from "@/components/ui/dialog"
import { useState } from "react"
import {useRouter} from "next/navigation"
import SignUpForm from "@/components/auth/signup/signup-form"

export default function DialogCloseButton(): JSX.Element {
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(true)
  const handleDialog =  (): void => {
    setIsOpen(!isOpen)
    /**
     * Note: this takes us back to /login since we came from /login
     */
    router.back()
    router.back()
  }
  return (
    <Dialog onOpenChange={handleDialog} open={isOpen}>
        
      <DialogContent className="gap-2 p-10 grid place-content-center max-w-md md:max-w-lg  lg:max-w-lg ">
          <h3 className="text-2xl font-medium">Sign Up</h3>
          <p className="text-sm mb-5 -mt-1 text-muted-foreground">Enter your information to create an account</p>
          
          <SignUpForm />
      </DialogContent>
      
    </Dialog>
  )
}
