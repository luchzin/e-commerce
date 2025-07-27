import { verifyResetToken } from "@/action/verifyResetToken";
import ResetPasswordForm from "../../../components/auth/reset-password";
import { AlertTriangle, RefreshCw, ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function ResetPassword({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const token = searchParams.token;

  if (!token) {
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

        {/* Main Content Container */}
        <div className="relative z-10 w-full max-w-md mx-auto p-8">
          <div className="flex flex-col items-center gap-6 bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10 shadow-2xl p-8">
            {/* Error Icon */}
            <div className="w-16 h-16 bg-red-300/50 dark:bg-red-900/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>

            {/* Error Content */}
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Invalid Request
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                No reset token was provided. Please use the link from your email
                or request a new password reset.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Link
                href="/auth/forget-password"
                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                <Mail className="w-4 h-4" />
                Request New Reset
              </Link>
              <Link
                href="/auth/signin"
                className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const tokenRecord = await verifyResetToken(token);

  if (!tokenRecord) {
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

        {/* Main Content Container */}
        <div className="relative z-10 w-full max-w-md mx-auto p-8">
          <div className="flex flex-col items-center gap-6 bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10 shadow-2xl p-8">
            {/* Error Icon */}
            <div className="w-16 h-16 bg-red-300/50 dark:bg-red-900/20 rounded-full flex items-center justify-center">
              <RefreshCw className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>

            {/* Error Content */}
            <div className="text-center">
              <h1 className="text-2xl font-bold text-red-500 mb-2">
                Link Expired
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                This password reset link has expired or is invalid. For security
                reasons, reset links are only valid for a limited time.
              </p>
            </div>

            {/* Security Notice */}
            <div className="bg-red-50/40 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 w-full">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-red-600 dark:bg-red-400 rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-red-800 dark:text-red-200 mb-1">
                    Security Notice
                  </h3>
                  <p className="text-xs text-red-700 dark:text-red-300">
                    Password reset links expire after 1 hour for your security.
                    If you need to reset your password, please request a new
                    link.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col justify-between sm:flex-row gap-3 w-full">
              <Link
                href="/auth/forget-password"
                className={buttonVariants({
                  variant: "default",
                  className:
                    "bg-red-600 text-white hover:bg-red-500 transition-all duration-300 cursor-pointer",
                })}
              >
                <Mail className="w-4 h-4" />
                Request New Reset
              </Link>
              <Link
                href="/auth/signin"
                className={buttonVariants({
                  variant: "outline",
                  className: "px-6 py-3 cursor-pointer",
                })}
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <ResetPasswordForm token={token} />;
}
