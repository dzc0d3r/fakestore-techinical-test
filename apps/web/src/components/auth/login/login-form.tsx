"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

interface LoginFormProps {
  closeModal?: () => void;
  backURL?: string;
}

const formSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Username must be at least 4 characters long" })
    .max(50),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters long" })
    .max(50),
});

export default function LoginForm({ closeModal }: LoginFormProps): JSX.Element {
  const searchParams = useSearchParams();
  const redirectTo = `/${searchParams.get("url") ?? "/"}`;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    const login = await signIn("credentials", {
      username: values.username,
      password: values.password,
      callbackUrl: redirectTo,
      redirect: false,
    });
    if (login?.error === "CredentialsSignin") {
      toast.error("Wrong username or password");
    } else {
      await signIn("credentials", {
        username: values.username,
        password: values.password,
        callbackUrl: redirectTo,
      });
      toast.success(`Welcome back, ${values.username}!`);
    }
  }
  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} />
              </FormControl>

              <FormMessage className="animate-pulse text-sm text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your password"
                  {...field}
                  type="password"
                />
              </FormControl>

              <FormMessage className="animate-pulse text-sm text-red-500" />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Login
        </Button>

        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link className="underline" href="/signup">
            <Button onClick={closeModal} variant="link">
              Sign up
            </Button>
          </Link>
        </div>
      </form>
    </Form>
  );
}
