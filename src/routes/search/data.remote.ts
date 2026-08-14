import { db } from "#lib/server/db/drizzle.ts";
import { query } from "$app/server";


export const getSnippets = query(async () => {
  const snippets = await db.query.
});
