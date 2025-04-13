"use client";

import LoginForm from "@/components/auth/login/login-form";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DialogCloseButton(): JSX.Element {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const handleDialog = (): void => {
    setIsOpen(!isOpen);
    router.back();
  };

  return (
    <Dialog onOpenChange={handleDialog} open={isOpen}>
      <DialogContent className="grid max-w-sm place-content-center md:max-w-lg lg:max-w-lg">
        <h3 className="text-2xl font-medium">Login</h3>

        <p className="text-muted-foreground -mt-1 mb-5 text-sm">
          <span className="text-green-700">
            USER: username = mor_2314, password = 83r5^_
          </span>
          <br />{" "}
          <span className="text-red-700">
            ADMIN: username = johnd, password = m38rmF$
          </span>
        </p>

        <LoginForm
          closeModal={() => {
            setIsOpen(!open);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
