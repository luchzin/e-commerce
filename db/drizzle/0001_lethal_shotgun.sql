ALTER TABLE "account" RENAME COLUMN "userId" TO ""userId"";--> statement-breakpoint
ALTER TABLE "account" DROP CONSTRAINT "account_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_"userId"_user_id_fk" FOREIGN KEY (""userId"") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;