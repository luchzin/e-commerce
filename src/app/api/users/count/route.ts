import { NextResponse } from "next/server";
import { db } from "@/db/connection";
import { users } from "@/db/schema";
import { count } from "drizzle-orm";

export async function GET() {
  try {
    const result = await db.select({ count: count() }).from(users);
    const userCount = result[0]?.count || 0;

    return NextResponse.json({ count: userCount });
  } catch (error) {
    console.error("Error fetching user count:", error);
    return NextResponse.json(
      { error: "Failed to fetch user count" },
      { status: 500 }
    );
  }
}
