import { NextRequest, NextResponse } from "next/server";
import { getTrustedUsers } from "@/db/userService";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "4");

    const users = await getTrustedUsers(limit);

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching trusted users:", error);
    return NextResponse.json(
      { error: "Failed to fetch trusted users" },
      { status: 500 }
    );
  }
}
