"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useState, useTransition } from "react";
import { signinAction } from "@/action/signin";
import { useRouter } from "next/navigation";
export default function Signin() {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  return (
    <div className="bg-[#F8F8F8] h-full flex items-center justify-center">
      <div className="flex flex-col gap-4 w-full max-w-md p-6">
        <div className="flex items-center justify-center gap-2 mb-4 flex-col">
          <h1 className="font-stretch-expanded text-2xl font-bold">
            Welcome Back to Tshop
          </h1>
          <p>Please enter credentials to Sign in</p>
        </div>

        {/* ✅ Email/Password Form */}
        <form
          className="flex flex-col gap-4"
          action={(formData) => {
            startTransition(async () => {
              const res = await signinAction(formData);
              if (!res.success) {
                setError(res.error || "Something went wrong.");
              }
              router.push("/");
            });
          }}
        >
          <div className="flex flex-col gap-2 mb-2">
            <Label htmlFor="email">Email</Label>
            <Input
              disabled={isPending}
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              disabled={isPending}
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>
          <div className="flex justify-end">
            <Link
              href={"/auth/forget-password"}
              className="text-red-400 text-sm"
            >
              Forgot password?
            </Link>
          </div>

          {/* ✅ Show Error */}
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <Button
            disabled={isPending}
            type="submit"
            className="text-white bg-red-600 drop-shadow-md hover:bg-red-500"
          >
            Sign in
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[#F8F8F8] text-gray-500">OR</span>
          </div>
        </div>

        <Button
          disabled={isPending}
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="  bg-white text-black border border-gray-200  hover:bg-gray-300 px-4 py-2 rounded"
        >
          <Image src={"/img/google.png"} alt="" width={25} height={25} />
          Sign in with Google
        </Button>

        <div className="flex text-sm gap-2 flex-row justify-between">
          <p>Don't have an account?</p>
          <Link href={"/auth/signup"} className="text-red-400">
            Sign up here
          </Link>
        </div>
      </div>
    </div>
  );
}
