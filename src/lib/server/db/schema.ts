import { defineRelations, sql } from "drizzle-orm";
import {
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

export const snippetLanguage = pgEnum("snippet_language", ["markdown", "tex"]);

export const snippetType = pgEnum("snippet_type", [
  "prompt",
  "skill",
  "snippet",
  "template",
]);

export const snippet = snakeCase.table(
  "snippet",
  {
    id: uuid()
      .primaryKey()
      .default(sql`uuidv7()`),
    authorId: text()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    title: text().notNull(),
    description: text(),
    language: snippetLanguage().notNull(),
    type: snippetType().notNull(),
    content: text().notNull(),
    usageCount: integer().notNull().default(0),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("snippet_author_id_idx").on(table.authorId),
    index("snippet_language_idx").on(table.language),
    index("snippet_type_idx").on(table.type),
  ],
);

export const tag = snakeCase.table("tag", {
  id: uuid()
    .primaryKey()
    .default(sql`uuidv7()`),
  value: text().notNull().unique(),
});

export const snippetsToTags = snakeCase.table(
  "snippets_to_tags",
  {
    snippetId: uuid()
      .notNull()
      .references(() => snippet.id, { onDelete: "cascade" }),
    tagId: uuid()
      .notNull()
      .references(() => tag.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.snippetId, table.tagId] })],
);

export const snippetsToUsers = snakeCase.table(
  "snippets_to_users",
  {
    snippetId: uuid()
      .notNull()
      .references(() => snippet.id, { onDelete: "cascade" }),
    userId: text()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.snippetId, table.userId] })],
);

export const relations = defineRelations(
  { snippet, tag, user, snippetsToTags, snippetsToUsers },
  (r) => ({
    snippet: {
      author: r.one.user({
        from: r.snippet.authorId,
        to: r.user.id,
      }),
      tags: r.many.tag({
        from: r.snippet.id.through(r.snippetsToTags.snippetId),
        to: r.tag.id.through(r.snippetsToTags.tagId),
      }),
    },
    tag: {
      snippets: r.many.snippet(),
    },
  }),
);
