import { error } from "@sveltejs/kit";
import z from "zod";
import { ARTIFACT_TYPES } from "#lib/constants.ts";
import { db } from "#lib/server/db/drizzle.ts";
import { artifact, file, tag } from "#lib/server/db/schema.ts";
import { form, getRequestEvent, query } from "$app/server";

export const createArtifact = form(
  z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1).max(255).optional(),
    type: z.enum(ARTIFACT_TYPES),
    content: z.string(),
    files: z
      .array(
        z.object({
          path: z.string(),
          content: z.string(),
        }),
      )
      .min(1),
    tags: z
      .array(
        z.object({
          content: z.string(),
        }),
      )
      .max(10)
      .optional(),
  }),
  async ({ title, description, type, files, tags }) => {
    const event = getRequestEvent();
    if (!event) error(500, "Internal Server Error");

    const { user } = event.locals;
    if (!user) error(401, "Unauthorized");

    if (tags) {
      await db.insert(tag).values(tags).onConflictDoNothing();
    }

    const [{ artifactId }] = await db
      .insert(artifact)
      .values({
        userId: user.id,
        title,
        description,
        type,
      })
      .returning({
        artifactId: artifact.id,
      });

    await db.insert(file).values(
      files.map(({ path, content }) => ({
        artifactId,
        path,
        content,
      })),
    );

    if (!tags) return;

    await db
      .insert(tag)
      .values(
        tags.map(({ content }) => ({
          content,
        })),
      )
      .onConflictDoNothing({ target: tag.content });
  },
);

export const getArtifacts = query(
  z.object({
    q: z.string().optional().default(""),
  }),
  async ({ q }) => {
    const artifacts = await db.query.artifact.findMany({
      where: {
        title: {
          ilike: `%${q}%`,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return artifacts;
  },
);
