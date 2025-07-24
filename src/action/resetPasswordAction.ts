"use server";

import { hash } from "bcryptjs";
import { db } from "@/db/connection";
import { users, passwordResetTokens } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifyResetToken } from "@/action/verifyResetToken";
import { signIn } from "../auth";

export async function resetPasswordAction(
  token: string,
  password: FormDataEntryValue | null
) {
  try {
    if (!password || typeof password !== "string") {
      return { success: false, error: "Password is required" };
    }

    // 1. Check if token is valid again (security)
    const tokenRecord = await verifyResetToken(token);

    if (!tokenRecord) {
      return { success: false, error: "Invalid or expired token" };
    }

    // 2. Hash password
    const hashedPassword = await hash(password, 10);

    // 3. Update user password
    await db
      .update(users)
      .set({ password: hashedPassword })
      .where(eq(users.email, tokenRecord.email));

    // 4. Delete token after use
    await db
      .delete(passwordResetTokens)
      .where(eq(passwordResetTokens.token, token));

    await signIn("credentials", {
      email: tokenRecord.email,
      password: password, // ✅ plain password (NextAuth will check & create session)
      redirect: false,
    });
    return { success: true };
  } catch (error) {
    // console.error(error);
    return { success: false, error: "Something went wrong" };
  }
}
