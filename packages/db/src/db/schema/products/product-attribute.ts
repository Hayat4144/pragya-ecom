import { timestampFields } from "@utils/timestamp";
import { pgTable, uuid, boolean, varchar } from "drizzle-orm/pg-core";

export const productAttributes = pgTable("product_attributes", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 120 }).notNull(),
  isVariantAttribute: boolean("is_variant_attribute").notNull().default(false),
  ...timestampFields,
});

export type selectProductAttribute = typeof productAttributes.$inferSelect;
export type insertProductAttribute = typeof productAttributes.$inferInsert;
