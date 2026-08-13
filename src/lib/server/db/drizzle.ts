import { drizzle } from "drizzle-orm/node-postgres";
import { DATABASE_URL } from "$app/env/private";

export const db = drizzle(DATABASE_URL);
