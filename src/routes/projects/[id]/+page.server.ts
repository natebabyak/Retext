import { db } from "#lib/server/db/drizzle.ts";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const { id } = params;

  const project = await db.query.project.findFirst({
    with: {
      files: true,
    },
    where: {
      id: id,
    },
  });

  return { project };
};
