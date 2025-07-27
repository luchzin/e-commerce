"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import { z } from "zod";
import { useState, useTransition } from "react";
import { sendResetPasswordEmail } from "../../../action/sendResetPasswordEmail";
import { Mail, CheckCircle, ArrowLeft } from "lucide-react";
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
  email: z.string().email("Invalid email address"),
});

export default function ForgetPassword() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

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
              Forgot Your Password?
            </CardTitle>
            <CardDescription>
              Please enter your email, and check your mailbox to get the reset
              password link.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
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
              className="space-y-4"
            >
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  disabled={success || isPending}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                  className="bg-white/50 dark:bg-white/10 backdrop-blur-sm border-white/30 dark:border-white/20 focus:border-red-500/50 focus:ring-red-500/20 transition-all duration-300"
                />
                {error && (
                  <div className="animate-fadeIn">
                    <p className="text-red-500 text-sm">{error}</p>
                  </div>
                )}
              </div>

              {success ? (
                <div className="animate-fadeIn">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
                          Email Sent Successfully!
                        </h3>
                        <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                          Check your inbox for the password reset link. If you
                          don't see it, check your spam folder.
                        </p>
                      </div>
                    </div>

                    {/* Additional info */}
                    <div className="mt-3 pt-3 border-t border-green-200 dark:border-green-800">
                      <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
                        <Mail className="w-4 h-4" />
                        <span>Reset link expires in 1 hour</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              <Button
                disabled={success || isPending}
                className="text-white bg-red-600 hover:bg-red-500 transition-all duration-300 cursor-pointer w-full"
              >
                {isPending ? (
                  <div className="flex items-center gap-2">
                    <LoadingSpinner size="sm" className="text-white" />
                  </div>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center">
            <Link
              href={"/auth/signin"}
              className="text-red-400 hover:text-red-600 transition-colors duration-200 flex items-center gap-1 text-sm hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Signin
            </Link>
          </CardFooter>
        </Card>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
