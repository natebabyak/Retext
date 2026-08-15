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
  unique,
  uuid,
} from "drizzle-orm/pg-core";
import { ARTIFACT_TYPES } from "#lib/constants.ts";
import { user } from "./auth.schema";

export const artifactType = pgEnum("artifact_type", ARTIFACT_TYPES);

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
    type: artifactType().notNull(),
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
    index("artifact_type_idx").on(table.type),
    index("artifact_download_count_idx").on(table.downloadCount),
    index("artifact_star_count_idx").on(table.starCount),
  ],
);

export const dailyDownloadCount = snakeCase.table(
  "daily_download_count",
  {
    id: uuid()
      .primaryKey()
      .default(sql`uuidv7()`),
    artifactId: uuid()
      .notNull()
      .references(() => artifact.id, { onDelete: "cascade" }),
    date: date()
      .notNull()
      .default(sql`CURRENT_DATE`),
    count: integer().notNull().default(0),
  },
  (table) => [unique().on(table.artifactId, table.date)],
);

export const file = snakeCase.table(
  "file",
  {
    id: uuid()
      .primaryKey()
      .default(sql`uuidv7()`),
    artifactId: uuid()
      .notNull()
      .references(() => artifact.id, { onDelete: "cascade" }),
    path: text().notNull(),
    content: text().notNull(),
  },
  (table) => [unique().on(table.artifactId, table.path)],
);

export const tag = snakeCase.table("tag", {
  id: uuid()
    .primaryKey()
    .default(sql`uuidv7()`),
  content: text().notNull().unique(),
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
    file,
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
      files: r.many.file(),
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
    file: {
      artifact: r.one.artifact({
        from: r.file.artifactId,
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
