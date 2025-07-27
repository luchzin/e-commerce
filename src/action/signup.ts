"use server";

import bcrypt from "bcryptjs";
import { createUser, getUserByEmail } from "@/db/userService";
import { SignupType } from "@/app/auth/signup/page";

export async function signupAction(data: SignupType) {
  try {
    // ✅ 1. Check if email already exists
    const existingUser = await getUserByEmail(data.email);
    if (existingUser) {
      return { success: false, error: "Email already registered." };
    }

    // ✅ 2. Hash the password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // ✅ 3. Create the user
    await createUser({
      username: data.username,
      email: data.email,
      password: hashedPassword,
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to register." };
  }
}
