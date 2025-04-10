"use client"


import {
  Dialog,
  DialogContent,  
} from "@/components/ui/dialog"
import { useState } from "react"
import {useRouter} from "next/navigation"
import LoginForm from "@/components/auth/login/login-form"

export default function DialogCloseButton(): JSX.Element {
  
  const router = useRouter() 
  const [isOpen, setIsOpen] = useState(true)
  const handleDialog = (): void => {
    setIsOpen(!isOpen)
    router.back()
  }

  return (
    <Dialog onOpenChange={handleDialog} open={isOpen}>
        
      <DialogContent className="grid place-content-center max-w-sm md:max-w-lg  lg:max-w-lg ">
        <h3 className="text-2xl font-medium">Login</h3>
        
        <p className="text-sm mb-5 -mt-1 text-muted-foreground"><span className="text-green-700">USER: username = mor_2314, password = 83r5^_</span>
          <br/> <span className="text-red-700">ADMIN: username = johnd, password = m38rmF$</span></p>

          <LoginForm  closeModal={() => { setIsOpen(!open); }} />
      </DialogContent>
      
    </Dialog>
  )
}
