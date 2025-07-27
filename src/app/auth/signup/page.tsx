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
import PasswordStrengthIndicator from "@/components/comp-51";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  Card,
  CardFooter,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[0-9]/, "Password must contain at least 1 number")
    .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter"),
});

export type SignupType = z.infer<typeof signupSchema>;

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupType>({
    resolver: zodResolver(signupSchema),
  });

  const [serverError, setServerError] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const password = watch("password", "");

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

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
    <div className="bg-[#F8F8F8] dark:bg-black h-full flex items-center justify-center relative overflow-hidden">
      {/* Glass Liquid Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-red-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-red-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Floating particles */}
        <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-white/30 rounded-full animate-bounce"></div>
        <div
          className="absolute top-2/3 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-bounce"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-2/3 w-1.5 h-1.5 bg-white/25 rounded-full animate-bounce"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-1/4 right-1/4 w-1 h-1 bg-white/35 rounded-full animate-bounce"
          style={{ animationDelay: "2.5s" }}
        ></div>

        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-purple-500/5 to-transparent"></div>
      </div>

      {/* Main Form Container */}
      <div className="relative z-10 w-full max-w-md mx-auto p-8">
        <Card className="relative border-white/20 dark:border-white/10 shadow-2xl bg-white/10 dark:bg-white/5 backdrop-blur-xl">
          <CardHeader className="text-center">
            <CardTitle className="font-stretch-expanded text-2xl font-bold bg-gradient-to-r from-red-900 via-red-500 to-red-900 dark:from-white dark:via-red-200 dark:to-white bg-clip-text text-transparent">
              Create Your{" "}
              <span className="bg-gradient-to-r from-red-600 to-red-400 text-transparent bg-clip-text">
                Tshop
              </span>{" "}
              Account
            </CardTitle>
            <CardDescription>Join us and start shopping today</CardDescription>
          </CardHeader>

          <CardContent className="space-y-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  disabled={isPending}
                  type="text"
                  id="username"
                  {...register("username")}
                  placeholder="Username"
                  className="bg-white/50 dark:bg-white/10 backdrop-blur-sm border-white/30 dark:border-white/20 focus:border-red-500/50 focus:ring-red-500/20 transition-all duration-300"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  disabled={isPending}
                  type="email"
                  id="email"
                  {...register("email")}
                  placeholder="Email"
                  className="bg-white/50 dark:bg-white/10 backdrop-blur-sm border-white/30 dark:border-white/20 focus:border-red-500/50 focus:ring-red-500/20 transition-all duration-300"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    disabled={isPending}
                    type={isPasswordVisible ? "text" : "password"}
                    id="password"
                    className="pe-9 bg-white/50 dark:bg-white/10 backdrop-blur-sm border-white/30 dark:border-white/20 focus:border-red-500/50 focus:ring-red-500/20 transition-all duration-300"
                    placeholder="Password"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex h-full w-9 items-center justify-center text-muted-foreground/80 hover:text-foreground transition-colors"
                    onClick={togglePasswordVisibility}
                    disabled={isPending}
                    aria-label={
                      isPasswordVisible ? "Hide password" : "Show password"
                    }
                  >
                    {isPasswordVisible ? (
                      <EyeOffIcon size={16} />
                    ) : (
                      <EyeIcon size={16} />
                    )}
                  </button>
                </div>
                <PasswordStrengthIndicator password={password} />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {serverError && (
                <p className="text-red-600 text-center text-sm">
                  {serverError}
                </p>
              )}

              <Button
                type="submit"
                className="text-white bg-red-600 drop-shadow-md hover:bg-red-500 w-full"
                disabled={isPending}
              >
                {isPending ? (
                  <div className="flex items-center gap-2">
                    <LoadingSpinner size="sm" className="text-white" />
                  </div>
                ) : (
                  "Signup"
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center items-center">
            <p className="text-sm">Already have an account?</p>
            <Link
              href={"/auth/signin"}
              className="text-red-400 hover:text-red-600 transition-colors duration-200 text-sm hover:underline ml-1"
            >
              Sign in here
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
