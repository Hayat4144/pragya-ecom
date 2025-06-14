import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { Pool, DatabaseError } from "pg";
import * as dotenv from "dotenv";
export * from "drizzle-orm";
export type { AnyPgTable } from "drizzle-orm/pg-core";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

const db = drizzle(pool, { schema });

export { db, DatabaseError };
