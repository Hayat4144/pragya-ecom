import { timestampFields } from "@utils/timestamp";
import { pgTable, uuid } from "drizzle-orm/pg-core";
import { products } from ".";
import { integer } from "drizzle-orm/pg-core";
import { text } from "drizzle-orm/pg-core";
import { varchar } from "drizzle-orm/pg-core";
import { productVariants } from "./product-variant";

export const productImage = pgTable("product_image", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id),
  displayOrder: integer("display_order").notNull().default(0),
  url: text("url").notNull(),
  altText: varchar("alt_text").notNull(),
  productVariantId: uuid("product_variant_id")
    .notNull()
    .references(() => productVariants.id),
  ...timestampFields,
});

export type selectProductImage = typeof productImage.$inferSelect;
export type insertProductImage = typeof productImage.$inferInsert;
