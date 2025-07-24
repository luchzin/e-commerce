import { drizzle } from "drizzle-orm/node-postgres";
import { reset, seed } from "drizzle-seed";
import * as schema from './schema'
async function main() {
  const db = drizzle(process.env.DATABASE_URL!);
  await reset(db, schema);
  await seed(db, schema).refine((f) => ({
    users: {
      columns: {},
      count: 20,
      with: {
        posts: 10,
      },
    },
  }));
}
main();
