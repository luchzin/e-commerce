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
import { getUserByEmail } from "@/db/userService";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  Card,
  CardFooter,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Check } from "lucide-react";

export default function Signin() {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const [currentStep, setCurrentStep] = useState<"email" | "password">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const router = useRouter();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required.");
      return;
    }

    startTransition(async () => {
      try {
        const user = await getUserByEmail(email);
        if (!user) {
          setError("Email not found. Please check your email or sign up.");
          return;
        }

        setIsEmailVerified(true);
        setIsAnimating(true);

        // Add delay for smooth transition
        setTimeout(() => {
          setCurrentStep("password");
          setIsAnimating(false);
        }, 300);
      } catch (error) {
        setError("Something went wrong. Please try again.");
      }
    });
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!password) {
      setError("Password is required.");
      return;
    }

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        const res = await signinAction(formData);
        if (!res.success) {
          setError(res.error || "Something went wrong.");
          return;
        }

        router.push("/");
      } catch (error) {
        setError("Something went wrong. Please try again.");
      }
    });
  };

  const handleBackToEmail = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep("email");
      setPassword("");
      setError("");
      setIsEmailVerified(false);
      setIsAnimating(false);
    }, 300);
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
          <CardHeader className="text-center pb-4">
            <CardTitle className="font-stretch-expanded text-2xl font-bold bg-gradient-to-r from-red-900 via-red-500 to-red-900 dark:from-white dark:via-red-200 dark:to-white bg-clip-text text-transparent">
              Welcome Back to Tshop
            </CardTitle>
            <CardDescription>
              Please enter credentials to Sign in
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Step indicator with animation */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-500 ease-in-out transform ${
                  currentStep === "email"
                    ? "bg-red-600 dark:bg-red-500 text-white scale-110 shadow-lg"
                    : "bg-red-600 dark:bg-red-500 text-white scale-110 shadow-lg"
                }`}
              >
                {currentStep === "email" ? "1" : <Check className="w-4 h-4" />}
              </div>
              <div
                className={`w-8 h-1 transition-all duration-500 ease-in-out ${
                  currentStep === "password"
                    ? "bg-red-600 dark:bg-red-500"
                    : "bg-gray-300 dark:bg-gray-700"
                }`}
              ></div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-500 ease-in-out transform ${
                  currentStep === "password"
                    ? "bg-red-600 dark:bg-red-500 text-white scale-110 shadow-lg"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-600 scale-100"
                }`}
              >
                2
              </div>
            </div>

            {/* Container for form animations */}
            <div className="relative overflow-hidden">
              {/* Email Step with slide animation */}
              <div
                className={`transition-all duration-500 ease-in-out transform ${
                  currentStep === "email"
                    ? "translate-x-0 opacity-100"
                    : "translate-x-full opacity-0 absolute inset-0"
                }`}
              >
                <form
                  onSubmit={handleEmailSubmit}
                  className="flex flex-col gap-4"
                >
                  <div className="flex flex-col gap-3 mb-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      disabled={isPending}
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/50 dark:bg-white/10 backdrop-blur-sm border-white/30 dark:border-white/20 focus:border-red-500/50 focus:ring-red-500/20 transition-all duration-300"
                      required
                    />
                  </div>

                  {error && (
                    <div className="animate-fadeIn">
                      <p className="text-red-600 text-sm text-start">{error}</p>
                    </div>
                  )}

                  <Button
                    disabled={isPending}
                    type="submit"
                    className="text-white bg-red-600 hover:bg-red-500 transition-all duration-300 cursor-pointer w-full"
                  >
                    {isPending ? (
                      <div className="flex items-center gap-2">
                        <LoadingSpinner size="sm" className="text-white" />
                      </div>
                    ) : (
                      "Continue"
                    )}
                  </Button>
                </form>
              </div>

              {/* Password Step with slide animation */}
              <div
                className={`transition-all duration-500 ease-in-out transform ${
                  currentStep === "password"
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-full opacity-0 absolute inset-0"
                }`}
              >
                <form
                  onSubmit={handlePasswordSubmit}
                  className="flex flex-col gap-4"
                >
                  {/* Email verification badge with animation */}
                  <div className="flex items-center gap-2 mb-2 animate-fadeIn">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-sm text-green-600 font-medium">
                      Email verified
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      disabled={isPending}
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-white/50 dark:bg-white/10 backdrop-blur-sm border-white/30 dark:border-white/20 focus:border-red-500/50 focus:ring-red-500/20 transition-all duration-300"
                      required
                    />
                  </div>

                  <div
                    className={`flex ${error ? "justify-between" : "justify-end"} `}
                  >
                    {error && (
                      <div className="animate-fadeIn">
                        <p className="text-red-600 text-sm text-center">
                          {error}
                        </p>
                      </div>
                    )}
                    <Link
                      href={"/auth/forget-password"}
                      className="text-red-400 text-sm hover:text-red-600 transition-colors duration-200 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBackToEmail}
                      className="flex-1 bg-white/50 dark:bg-white/10 transition-all duration-300 cursor-pointer"
                    >
                      Back
                    </Button>
                    <Button
                      disabled={isPending}
                      type="submit"
                      className="text-white bg-red-600 flex-1 hover:bg-red-500 transition-all duration-300 cursor-pointer"
                    >
                      {isPending ? (
                        <div className="flex items-center gap-2">
                          <LoadingSpinner size="sm" className="text-white" />
                        </div>
                      ) : (
                        "Sign in"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
              <span className="text-sm text-gray-500 whitespace-nowrap">
                Or continue with
              </span>
              <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
            </div>

            <Button
              disabled={isPending}
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="bg-white/50 dark:bg-white/10 backdrop-blur-sm w-full dark:hover:bg-black/20 dark:text-white text-black border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:text-white px-4 py-2 rounded cursor-pointer"
            >
              <Image src={"/img/google.png"} alt="" width={18} height={18} />
              Sign in with Google
            </Button>
          </CardContent>

          <CardFooter className="flex justify-between items-center">
            <p className="text-sm">Don't have an account?</p>
            <Link
              href={"/auth/signup"}
              className="text-red-400 hover:text-red-600 transition-colors duration-200 text-sm hover:underline"
            >
              Sign up here
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
