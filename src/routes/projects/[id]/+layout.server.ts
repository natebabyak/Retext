import { db } from "#lib/server/db/drizzle.ts";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ params }) => {
  const { id } = params;

  const project = await db.query.project.findFirst({
    with: {
      collaborators: true,
      files: true,
    },
    where: {
      id: id,
    },
  });

  return { project };
};
