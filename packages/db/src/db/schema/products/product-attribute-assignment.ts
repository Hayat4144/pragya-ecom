import { pgTable, uuid } from "drizzle-orm/pg-core";
import { productAttributes } from "./product-attribute";
import { products } from ".";
import { boolean } from "drizzle-orm/pg-core";

export const productAttributeAssignment = pgTable(
  "product_attribute_assignment",
  {
    id: uuid().primaryKey().notNull().defaultRandom(),
    attributeId: uuid("attribute_id")
      .notNull()
      .references(() => productAttributes.id),
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id),
    isRequired: boolean("is_required").notNull().default(false),
  },
);

export type selectProductAttributeAssignment =
  typeof productAttributeAssignment.$inferSelect;
export type insertProductAttributeAssignment =
  typeof productAttributeAssignment.$inferInsert;
