"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "../db/userService";


export async function signinAction(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return { success: false, error: "Email and password are required." };
    }
    const existEmail = await getUserByEmail(email);
    if (!existEmail) {
      return {
        success: false,
        error: "Email is not found",
      };
    }
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error:
        error?.type === "CredentialsSignin"
          ? "Invalid   password."
          : "Something went wrong. Please try again.",
    };
  }
}
