import { db } from "#lib/server/db/drizzle.ts";
import { query } from "$app/server";

export const getArtifacts = query(async () => {
  const artifacts = await db.query.artifact.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return artifacts;
});
