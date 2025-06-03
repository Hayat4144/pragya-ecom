CREATE TABLE "product_variant_attribute_values" (
	"variant_id" uuid,
	"attribute_value_id" uuid
);
--> statement-breakpoint
ALTER TABLE "product_variant_attribute_values" ADD CONSTRAINT "product_variant_attribute_values_variant_id_product_item_id_fk" FOREIGN KEY ("variant_id") REFERENCES "public"."product_item"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_variant_attribute_values" ADD CONSTRAINT "product_variant_attribute_values_attribute_value_id_product_attribute_values_id_fk" FOREIGN KEY ("attribute_value_id") REFERENCES "public"."product_attribute_values"("id") ON DELETE no action ON UPDATE no action;