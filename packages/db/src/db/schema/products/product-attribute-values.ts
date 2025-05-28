import { timestampFields } from "@utils/timestamp";
import { pgTable, uuid, integer, varchar } from "drizzle-orm/pg-core";
import { productAttributes } from "./product-attribute";

export const productAttributeValues = pgTable("product_attribute_values", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  value: varchar("value", { length: 100 }).notNull(),
  attributeId: uuid("attribute_id")
    .notNull()
    .references(() => productAttributes.id),
  displayOrder: integer("display_order").notNull().default(0),
  ...timestampFields,
});

export type selectProductAttributeValues =
  typeof productAttributeValues.$inferSelect;
export type insertProductAttributeValues =
  typeof productAttributeValues.$inferInsert;
