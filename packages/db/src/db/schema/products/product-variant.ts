import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { products } from ".";
import { timestampFields } from "@utils/timestamp";
import { numeric } from "drizzle-orm/pg-core";
import { integer } from "drizzle-orm/pg-core";
import { boolean } from "drizzle-orm/pg-core";

export const productVariants = pgTable("product_variants", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id),
  sku: varchar("sku", { length: 100 }).notNull(),
  price: numeric("price", {
    precision: 10,
    scale: 2,
    mode: "number",
  }).notNull(),
  costPrice: numeric("cost_price", {
    precision: 10,
    scale: 2,
    mode: "number",
  }).notNull(),
  salePrice: numeric("sale_price", {
    precision: 10,
    scale: 2,
    mode: "number",
  }).notNull(),
  stock: integer("stock").notNull().default(0),
  isDefault: boolean("is_default").notNull().default(false),
  ...timestampFields,
});

export type selectProductVariant = typeof productVariants.$inferSelect;
export type insertProductVariant = typeof productVariants.$inferInsert;
