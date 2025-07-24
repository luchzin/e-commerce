"use server";

import { randomBytes } from "crypto";
import { addMinutes } from "date-fns";
import { db } from "@/db/connection"; // your drizzle db instance
import { passwordResetTokens } from "@/db/schema";
import { getUserByEmail } from "../db/userService";
import { sendEmail } from "@/db/userService"; // implement using nodemailer or Resend
import { eq } from "drizzle-orm";

export async function sendResetPasswordEmail(formData: FormData) {
  try {
    const email = formData.get("email") as string;

    if (!email) {
      return { success: false, error: "Email is required." };
    }

    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      return { success: false, error: "Email is not registered." };
    }

    // 1. Generate secure token
    const token = randomBytes(32).toString("hex");
    const expires = addMinutes(new Date(), 60); // expires in 1 hour

    // 2. Save token in DB (delete old ones first)
    await db
      .delete(passwordResetTokens)
      .where(eq(passwordResetTokens.email, email));

    await db.insert(passwordResetTokens).values({
      email,
      token,
      expires,
    });

    // 3. Send email with reset link
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}`;
    await sendEmail(email,resetLink);

    return { success: true };
  } catch (error) {
    // console.error(error);
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    };
  }
}
