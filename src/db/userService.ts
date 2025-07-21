import { usersTable } from "./schema";
import { eq } from "drizzle-orm";
 import { db } from "./connection";
 
// export async function createUser(data: typeof usersTable.$inferInsert) {
//   const [user] = await db.insert(usersTable).values(data).returning();
//   return user;
// }

// export async function getUsers() {
//   const users = await db.select().from(usersTable);
//   console.log("✅ All users:", users);
//   return users;
// }

// export async function getUserByEmail(email: string) {
//   const [user] = await db
//     .select()
//     .from(usersTable)
//     .where(eq(usersTable.email, email));
//   console.log("✅ Found user:", user);
//   return user;
// }

// export async function updateUser(email: string, newData: Partial<typeof usersTable.$inferInsert>) {
//   await db.update(usersTable).set(newData).where(eq(usersTable.email, email));
//   console.log(`✅ User updated: ${email}`);
// }

// export async function deleteUser(email: string) {
//   await db.delete(usersTable).where(eq(usersTable.email, email));
//   console.log(`✅ User deleted: ${email}`);
// }
