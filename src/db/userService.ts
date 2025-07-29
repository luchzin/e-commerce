"use server";
import { db } from "./connection";
import { users } from "./schema";
import bcrypt from "bcryptjs";
import { eq, isNull, not } from "drizzle-orm";
import { Resend } from "resend";
import { EmailTemplate } from "../components/auth/email-template";

export async function createUser(arg: {
  username: string;
  email: string;
  password: string;
  bio?: string;
  phone_number?: string;
  avatar_url?: string;
  social_link_id?: string;
}) {
  const res = await db.insert(users).values({
    ...arg,
  });

  return res;
}
export async function getAllUsers() {
  const data = await db.select().from(users);
  return data;
}
export async function getUserAvatar() {
  const data = await db
    .select()
    .from(users)
    .where(not(isNull(users.image)));
  return data;
}

export async function FindUser(email: string, plainPassword: string) {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  });

  if (!user) return null;

  const isValid = await bcrypt.compare(plainPassword, user.password ?? "");
  if (!isValid) return null;

  return {
    id: user.id,
    email: user.email,
    name: user.name, // NextAuth uses `name`
    image: user.image || undefined, // optional
  };
}
export async function getUserByEmail(email: string) {
  const [user] = await db.select().from(users).where(eq(users.email, email));
  return user;
}

const resend = new Resend(process.env.AUTH_RESEND_KEY);

export async function sendEmail(email: string, resetLink: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Reset password Link",
      react: EmailTemplate({ firstName: "John", resetLink }),
    });

    if (error) {
      // console.error("Resend error:", error);
      throw new Error("Email sending failed");
    }

    return data;
  } catch (err) {
    // console.error(err);
    throw err;
  }
}

export async function getTrustedUsers(limit: number = 4) {
  const data = await db
    .select({
      id: users.id,
      name: users.name,
      image: users.image,
    })
    .from(users)
    .where(not(isNull(users.image)))
    .limit(limit);
  return data;
}
