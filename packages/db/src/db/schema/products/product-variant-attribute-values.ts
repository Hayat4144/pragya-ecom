import { pgTable, uuid } from "drizzle-orm/pg-core";
import { productVariants } from "./product-variant";
import { productAttributeValues } from "./product-attribute-values";

export const productVariantAttributeValues = pgTable(
  "product_variant_attribute_values",
  {
    id: uuid().primaryKey().notNull().defaultRandom(),
    variantId: uuid("variant_id").references(() => productVariants.id),
    attributeValueId: uuid("attribute_value_id").references(
      () => productAttributeValues.id,
    ),
  },
);

export type insertProductVariantAttributeValues =
  typeof productVariantAttributeValues.$inferInsert;

export type selectProductVariantAttributeValues =
  typeof productVariantAttributeValues.$inferSelect;
