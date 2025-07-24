ALTER TABLE "account" RENAME COLUMN ""userId"" TO "user_id";--> statement-breakpoint
ALTER TABLE "account" DROP CONSTRAINT "account_"userId"_user_id_fk";
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;