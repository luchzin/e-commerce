"use client";
import { useRouter } from "next/navigation";
import { resetPasswordAction } from "../../action/resetPasswordAction";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { LoadingSpinner } from "../ui/loading-spinner";
import PasswordStrengthIndicator from "../comp-51";
import { EyeIcon, EyeOffIcon, CheckCircle, XCircle } from "lucide-react";
import React, { useState, useTransition } from "react";
import {
  Card,
  CardFooter,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const ResetPasswordForm: React.FC<{ token: string }> = ({ token }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [error, setError] = useState<string | null>(null);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  // Check if passwords match
  const passwordsMatch =
    password && confirmPassword && password === confirmPassword;
  const canSubmit = password && confirmPassword && passwordsMatch && !isPending;

  const handleSubmit = async (formData: FormData) => {
    // Clear previous errors
    setError(null);

    // Validate passwords match
    if (!passwordsMatch) {
      setError("Passwords do not match");
      return;
    }

    // Validate password length
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    startTransition(async () => {
      try {
        const result = await resetPasswordAction(token, password);
        if (!result.success) {
          setError(result.error || "Failed to reset password");
          return;
        }
        router.push("/");
      } catch (error) {
        setError("An unexpected error occurred");
      }
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
          <CardHeader className="text-center pb-4">
            <CardTitle className="font-stretch-expanded text-2xl font-bold bg-gradient-to-r from-red-900 via-red-500 to-red-900 dark:from-white dark:via-red-200 dark:to-white bg-clip-text text-transparent">
              Reset Your Password
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Please enter your new password
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form action={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-3">
                <Label
                  htmlFor="password"
                  className="text-gray-700 dark:text-gray-200 font-medium"
                >
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    disabled={isPending}
                    type={isPasswordVisible ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter your new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pe-9 bg-white/50 dark:bg-white/10 backdrop-blur-sm border-white/30 dark:border-white/20 focus:border-purple-500/50 focus:ring-purple-500/20 transition-all duration-300"
                    required
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
              </div>

              <div className="flex flex-col gap-3">
                <Label
                  htmlFor="confirmPassword"
                  className="text-gray-700 dark:text-gray-200 font-medium"
                >
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    disabled={isPending}
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pe-9 bg-white/50 dark:bg-white/10 backdrop-blur-sm border-white/30 dark:border-white/20 focus:border-purple-500/50 focus:ring-purple-500/20 transition-all duration-300"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex h-full w-9 items-center justify-center text-muted-foreground/80 hover:text-foreground transition-colors"
                    onClick={toggleConfirmPasswordVisibility}
                    disabled={isPending}
                    aria-label={
                      isConfirmPasswordVisible
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {isConfirmPasswordVisible ? (
                      <EyeOffIcon size={16} />
                    ) : (
                      <EyeIcon size={16} />
                    )}
                  </button>
                </div>

                {/* Password match indicator */}
                {confirmPassword && (
                  <div className="flex items-center gap-2 text-sm">
                    {passwordsMatch ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-green-600 dark:text-green-400">
                          Passwords match
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-red-500" />
                        <span className="text-red-600 dark:text-red-400">
                          Passwords do not match
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Error message */}
              {error && (
                <div className="bg-red-50/80 dark:bg-red-900/20 backdrop-blur-sm border border-red-200/50 dark:border-red-800/50 rounded-lg p-4">
                  <p className="text-red-600 dark:text-red-400 text-sm">
                    {error}
                  </p>
                </div>
              )}

              <Button
                className="bg-red-600 hover:bg-red-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] w-full"
                type="submit"
                disabled={!canSubmit}
              >
                {isPending ? (
                  <div className="flex items-center gap-2">
                    <LoadingSpinner size="sm" className="text-white" />
                  </div>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default ResetPasswordForm;
