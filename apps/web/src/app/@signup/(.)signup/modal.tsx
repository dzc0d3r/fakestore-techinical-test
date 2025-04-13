"use client";

import SignUpForm from "@/components/auth/signup/signup-form";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DialogCloseButton(): JSX.Element {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(true);
  const handleDialog = (): void => {
    setIsOpen(!isOpen);
    /**
     * Note: this takes us back to /login since we came from /login
     */
    router.back();
    router.back();
  };
  return (
    <Dialog onOpenChange={handleDialog} open={isOpen}>
      <DialogContent className="grid max-w-md place-content-center gap-2 p-10 md:max-w-lg lg:max-w-lg">
        <h3 className="text-2xl font-medium">Sign Up</h3>
        <p className="text-muted-foreground -mt-1 mb-5 text-sm">
          Enter your information to create an account
        </p>

        <SignUpForm />
      </DialogContent>
    </Dialog>
  );
}
