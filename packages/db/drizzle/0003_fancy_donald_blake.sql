ALTER TABLE "product_item" RENAME TO "product_variants";--> statement-breakpoint
ALTER TABLE "product_image" RENAME COLUMN "product_item_id" TO "product_variant_id";--> statement-breakpoint
ALTER TABLE "product_variants" DROP CONSTRAINT "product_item_product_id_products_id_fk";
--> statement-breakpoint
ALTER TABLE "product_image" DROP CONSTRAINT "product_image_product_item_id_product_item_id_fk";
--> statement-breakpoint
ALTER TABLE "product_variant_attribute_values" DROP CONSTRAINT "product_variant_attribute_values_variant_id_product_item_id_fk";
--> statement-breakpoint
ALTER TABLE "product_variant_attribute_values" ADD COLUMN "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_image" ADD CONSTRAINT "product_image_product_variant_id_product_variants_id_fk" FOREIGN KEY ("product_variant_id") REFERENCES "public"."product_variants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_variant_attribute_values" ADD CONSTRAINT "product_variant_attribute_values_variant_id_product_variants_id_fk" FOREIGN KEY ("variant_id") REFERENCES "public"."product_variants"("id") ON DELETE no action ON UPDATE no action;