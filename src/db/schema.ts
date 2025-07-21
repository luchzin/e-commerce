import { pgTable, uuid, varchar, text, timestamp,boolean, numeric, jsonb } from "drizzle-orm/pg-core";

const commonSchema = {
  id: uuid("id").defaultRandom().primaryKey(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
};
export const socialLinksTable = pgTable("social_links", {
  id: uuid("id").defaultRandom().primaryKey(),
  facebook: varchar("facebook", { length: 50 }).unique(),
  telegram: varchar("telegram", { length: 50 }).unique(),
  instagram: varchar("instagram", { length: 50 }).unique(),
  twitter: varchar("twitter", { length: 50 }).unique(),
});

export const usersTable = pgTable("users", {
  ...commonSchema,
  username: varchar("username", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }),
  phone_number: varchar("phone_number", { length: 15 }).unique(),
  avatar_url: text("avatar_url"),
  bio: text("bio"),
  social_link_id: uuid("social_link_id").references(() => socialLinksTable.id),
});

export const PostTable = pgTable("posts", {
    ...commonSchema,
  creator_id: uuid("creator_id").references(() => usersTable.id).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 225 }).notNull(),
  isStock: boolean("isStock").default(false),
  rating: numeric("rating", { precision: 2, scale: 1 }).default("0"),   
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  images: jsonb("images").notNull().default("[]"),
});


export const reviewTable=pgTable("reviews",{
    ...commonSchema,
  reviewer_id:uuid("reviewer_id").references(() => usersTable.id).notNull(),
  content:text("content").notNull(),
  like_counts:numeric('like_counts').default("0")
});

 