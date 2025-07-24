"use client";
import { useRouter } from "next/navigation";
import { resetPasswordAction } from "../../action/resetPasswordAction";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import React from "react";

const ResetPasswordForm: React.FC<{ token: string }> = ({ token }) => {
  const router = useRouter();
  return (
    <div className="bg-[#F8F8F8] h-full flex items-center justify-center">
      <form
        action={async (formData) => {
          const result = await resetPasswordAction(
            token,
            formData.get("password")
          );
          if (!result.success) {
            router.push("/auth/login");
          }
          router.push("/");
        }}
        className="flex flex-col gap-4"
      >
        <div className="flex items-center justify-center gap-2 mb-4 flex-col">
          <h1 className="font-stretch-expanded text-2xl font-bold">
            Reset Your Password
          </h1>
          <p>Please enter your new password</p>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm password"
          />
        </div>

        <Button
          className="text-white bg-red-600 drop-shadow-md hover:bg-red-500"
          type="submit"
        >
          Reset password
        </Button>
      </form>
    </div>
  );
};
export default ResetPasswordForm;
