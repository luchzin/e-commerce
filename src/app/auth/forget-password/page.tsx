"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import { z } from "zod";
import { useState, useTransition } from "react";
import { sendResetPasswordEmail } from "../../../action/sendResetPasswordEmail";
import { Mail } from "lucide-react";

export const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export default function ForgetPassword() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="bg-[#F8F8F8] h-full flex items-center justify-center">
      <form
        action={(formData) => {
          startTransition(async () => {
            const email = formData.get("email") as string;
            const validation = signupSchema.safeParse({ email });

            if (!validation.success) {
              setError(validation.error.message);
              return;
            }

            setError(null); // clear error if valid
            const res = await sendResetPasswordEmail(formData);
            if (res.success) {
              setSuccess(true);
            } else {
              setSuccess(false);
              setError(res.error ?? null);
            }
          });
        }}
        className="flex flex-col gap-4 max-w-[90%] sm:max-w-[50%]"
      >
        <div className="flex items-center justify-center gap-2 mb-4 flex-col">
          <h1 className="font-stretch-expanded text-2xl font-bold">
            Forgot Your Password?
          </h1>
          <p>
            Please enter your email, and check your mailbox to get the reset
            password link.
          </p>
        </div>

        <div className="flex flex-col gap-2 mb-2">
          <Label htmlFor="email">Email</Label>
          <Input
            disabled={success || isPending}
            type="email"
            id="email"
            name="email"
            placeholder="Email"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        {success ? (
          <div className="text-green-600 flex flex-row gap-3  border border-green-900 p-2 rounded-sm  drop-shadow-sm">
            <Mail />
            Succcessfully sent Email
          </div>
        ) : null}
        <Button
          disabled={success || isPending}
          className="text-white bg-red-600 drop-shadow-md hover:bg-red-500"
        >
          Submit
        </Button>

        <div className="flex justify-center text-sm gap-2">
          <p>Back to</p>
          <Link href={"/auth/signin"} className="text-red-400">
            Signin
          </Link>
        </div>
      </form>
    </div>
  );
}
