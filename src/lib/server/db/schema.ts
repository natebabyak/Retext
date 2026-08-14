import { defineRelations, sql } from "drizzle-orm";
import {
  date,
  index,
  integer,
  pgEnum,
  primaryKey,
  snakeCase,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { user } from "./auth.schema";

export const artifactLanguage = pgEnum("artifact_language", [
  "latex",
  "markdown",
]);

export const artifactType = pgEnum("artifact_type", [
  "prompt",
  "skill",
  "snippet",
  "template",
]);

export const artifact = snakeCase.table(
  "artifact",
  {
    id: uuid()
      .primaryKey()
      .default(sql`uuidv7()`),
    userId: text()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    title: text().notNull(),
    description: text(),
    language: artifactLanguage().notNull(),
    type: artifactType().notNull(),
    content: text().notNull(),
    downloadCount: integer().notNull().default(0),
    starCount: integer().notNull().default(0),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("artifact_user_id_idx").on(table.userId),
    index("artifact_language_idx").on(table.language),
    index("artifact_type_idx").on(table.type),
  ],
);

export const dailyDownloadCount = snakeCase.table(
  "daily_download_count",
  {
    artifactId: uuid()
      .notNull()
      .references(() => artifact.id, { onDelete: "cascade" }),
    date: date()
      .notNull()
      .default(sql`CURRENT_DATE`),
    count: integer().notNull().default(0),
  },
  (table) => [primaryKey({ columns: [table.artifactId, table.date] })],
);

export const tag = snakeCase.table("tag", {
  id: uuid()
    .primaryKey()
    .default(sql`uuidv7()`),
  text: text().notNull().unique(),
});

export const artifactsToTags = snakeCase.table(
  "artifacts_to_tags",
  {
    artifactId: uuid()
      .notNull()
      .references(() => artifact.id, { onDelete: "cascade" }),
    tagId: uuid()
      .notNull()
      .references(() => tag.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.artifactId, table.tagId] })],
);

export const artifactsToUsers = snakeCase.table(
  "artifacts_to_users",
  {
    artifactId: uuid()
      .notNull()
      .references(() => artifact.id, { onDelete: "cascade" }),
    userId: text()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.artifactId, table.userId] })],
);

export const relations = defineRelations(
  {
    artifact,
    dailyDownloadCount,
    tag,
    user,
    artifactsToTags,
    artifactsToUsers,
  },
  (r) => ({
    artifact: {
      author: r.one.user({
        from: r.artifact.userId,
        to: r.user.id,
        alias: "artifact_author",
      }),
      dailyDownloadCounts: r.many.dailyDownloadCount(),
      starredBy: r.many.user({
        from: r.artifact.id.through(r.artifactsToUsers.artifactId),
        to: r.user.id.through(r.artifactsToUsers.userId),
        alias: "artifact_starred_by",
      }),
      tags: r.many.tag({
        from: r.artifact.id.through(r.artifactsToTags.artifactId),
        to: r.tag.id.through(r.artifactsToTags.tagId),
      }),
    },
    dailyDownloadCount: {
      artifact: r.one.artifact({
        from: r.dailyDownloadCount.artifactId,
        to: r.artifact.id,
      }),
    },
    tag: {
      artifacts: r.many.artifact(),
    },
    user: {
      authoredArtifacts: r.many.artifact({
        alias: "artifact_author",
      }),
      starredArtifacts: r.many.artifact({
        alias: "artifact_starred_by",
      }),
    },
  }),
);

export * from "./auth.schema";
