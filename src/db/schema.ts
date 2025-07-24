import { sql } from "drizzle-orm";
import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
  numeric,
  jsonb,
  integer,
  primaryKey,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "@auth/core/adapters";

const commonSchema = {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
};
export const sociallink = pgTable("social_links", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  facebook: varchar("facebook", { length: 50 }),
  telegram: varchar("telegram", { length: 50 }),
  instagram: varchar("instagram", { length: 50 }),
  twitter: varchar("twitter", { length: 50 }),
});

export const users = pgTable("user", {
  ...commonSchema,
  name: text("name"),
  email: text("email").unique(),
  image: text("image"),
  bio: text("bio"),
   emailVerified: timestamp("emailVerified"),
  password: varchar("password", { length: 255 }),
  phone_number: varchar("phone_number", { length: 15 }).unique(),
  social_link_id: uuid("social_link_id").references(() => sociallink.id),
});
export const posts = pgTable("posts", {
  ...commonSchema,
  creator_id: text("creator_id")
    .references(() => users.id)
    .notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 225 }).notNull(),
  isStock: boolean("isStock").default(false),
  rating: numeric("rating", { precision: 2, scale: 1 }).default("0"),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  images: jsonb("images").notNull().default("[]"),
});

export const review = pgTable("reviews", {
  ...commonSchema,
  reviewer_id: text("reviewer_id")
    .references(() => users.id)
    .notNull(),
  content: text("content").notNull(),
  like_counts: numeric("like_counts").default("0"),
});

//for nextauth

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ]
);

export const passwordResetTokens = pgTable("password_reset_tokens", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  token: varchar("token", { length: 255 }).notNull().unique(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
  createdAt: timestamp("created_at", { mode: "date" })
    .default(sql`now()`)
    .notNull(),
});
