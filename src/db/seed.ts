import { db } from "./connection";
import { users } from "./schema";
import bcrypt from "bcryptjs";

async function seed() {
  try {
    console.log("🌱 Seeding database...");

    // Hash passwords
    const hashedPassword1 = await bcrypt.hash("password123", 10);
    const hashedPassword2 = await bcrypt.hash("admin123", 10);

    // Insert test users
    await db.insert(users).values([
      {
        name: "Test User",
        email: "test@example.com",
        password: hashedPassword1,
        bio: "This is a test user for authentication testing",
      },
      {
        name: "Admin User",
        email: "admin@example.com",
        password: hashedPassword2,
        bio: "This is an admin user for testing",
      },
    ]);

    console.log("✅ Database seeded successfully!");
    console.log("\n📋 Test Users Created:");
    console.log("1. Email: test@example.com, Password: password123");
    console.log("2. Email: admin@example.com, Password: admin123");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    process.exit(0);
  }
}

seed();
