import { error } from "@sveltejs/kit";
import z from "zod";
import { db } from "#lib/server/db/drizzle.ts";
import { project } from "#lib/server/db/schema.ts";
import { form, getRequestEvent, query } from "$app/server";

export const createProject = form(
  z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
  async ({ title, description }) => {
    const event = getRequestEvent();
    if (!event) error(500, "Internal Server Error");

    const { user } = event.locals;
    if (!user) error(401, "Unauthorized");

    const [newProject] = await db
      .insert(project)
      .values({
        ownerId: user.id,
        title,
        description,
      })
      .returning();

    return newProject;
  },
);

export const getProjects = query(async () => {
  const event = getRequestEvent();
  if (!event) error(500, "Internal Server Error");

  const { user } = event.locals;
  if (!user) error(401, "Unauthorized");

  const projects = await db.query.project.findMany({
    where: {
      OR: [
        {
          ownerId: user.id,
        },
        {
          collaborators: {
            id: user.id,
          },
        },
      ],
    },
    with: {
      tags: true,
    },
  });

  return projects;
});
