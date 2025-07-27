import { auth } from "../auth";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { signIn, signOut } from "../auth";
import { redirect } from "next/navigation";
import { signupAction } from "../action/signup";
import { ThemeToggle } from "@/components/theme-toggle";

export default async function Home() {
  const session = await auth();

  async function handleSignIn(formData: FormData) {
    "use server";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      redirect("/");
    } catch (error) {
      console.error("Sign in error:", error);
    }
  }

  async function handleSignUp(formData: FormData) {
    "use server";
    const username = formData.get("username") as string;
    const email = formData.get("signup-email") as string;
    const password = formData.get("signup-password") as string;

    const result = await signupAction({
      username,
      email,
      password,
    });

    if (result.success) {
      // Auto sign in after successful signup
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      redirect("/");
    }
  }

  async function handleSignOut() {
    "use server";
    await signOut();
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      Home
    </div>
  );
}
