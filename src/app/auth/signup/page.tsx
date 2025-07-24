"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { signupAction } from "@/action/signup"; 
export const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type SignupType = z.infer<typeof signupSchema>;

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupType>({
    resolver: zodResolver(signupSchema),
  });

  const [serverError, setServerError] = useState("");
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: SignupType) => {
    setServerError("");

    startTransition(async () => {
      const res = await signupAction(data);

      if (!res.success) {
        setServerError(res.error || "Something went wrong.");
        return;
      }

      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirectTo: "/",
      });
    });
  };

  return (
    <div className="bg-[#F8F8F8] h-full flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full max-w-md"
      >
        <div className="flex items-center justify-center gap-2 mb-4 flex-col">
          <h1 className="font-stretch-expanded text-2xl font-bold">
            Create Your Tshop Account
          </h1>
          <p>Please enter your credentials to Sign up</p>
        </div>

        <div className="flex flex-col gap-2 mb-2">
          <Label htmlFor="username">Username</Label>
          <Input
            disabled={isPending}
            type="text"
            id="username"
            {...register("username")}
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 mb-2">
          <Label htmlFor="email">Email</Label>
          <Input
            disabled={isPending}
            type="email"
            id="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            disabled={isPending}
            type="password"
            id="password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {serverError && (
          <p className="text-red-600 text-center text-sm">{serverError}</p>
        )}

        <Button
          type="submit"
          className="text-white bg-red-600 drop-shadow-md hover:bg-red-500"
          disabled={isPending}
        >
          {isPending ? "Signing up..." : "Signup"}
        </Button>

        <div className="flex text-sm flex-row gap-2 justify-center">
          <p>Already have an account?</p>
          <Link href={"/auth/signin"} className="text-red-400">
            Sign in here
          </Link>
        </div>
      </form>
    </div>
  );
}
