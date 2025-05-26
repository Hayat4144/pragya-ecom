import { timestampFields } from "@utils/timestamp";
import { relations } from "drizzle-orm";
import { AnyPgColumn } from "drizzle-orm/pg-core";
import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { products } from "../products";

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  parentId: uuid("parent_id").references((): AnyPgColumn => categories.id),
  imageUrl: text("image_url"),
  ...timestampFields,
});

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  subcategories: many(categories, { relationName: "subcategories" }),
  parent: one(categories, {
    fields: [categories.parentId],
    references: [categories.id],
    relationName: "subcategories",
  }),
  products: many(products),
}));

export type insertCategory = typeof categories.$inferInsert;
export type selectCategory = typeof categories.$inferSelect;
