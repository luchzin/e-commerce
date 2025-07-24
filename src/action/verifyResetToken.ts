import { db } from "@/db/connection";
import { passwordResetTokens } from "@/db/schema";
import { eq, and, gt } from "drizzle-orm";

export async function verifyResetToken(token: string) {
  const record = await db
    .select()
    .from(passwordResetTokens)
    .where(
      and(
        eq(passwordResetTokens.token, token),
        gt(passwordResetTokens.expires, new Date())
      )
    )
    .limit(1);

  return record.length ? record[0] : null;
}
