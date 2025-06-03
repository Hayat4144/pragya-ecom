import {
  db,
  insertProductAttributeAssignment,
  productAttributeAssignment,
} from "@workspace/db";

class ProductAttributeAssignment {
  async assignAttributeToProduct(data: insertProductAttributeAssignment) {
    const [result] = await db
      .insert(productAttributeAssignment)
      .values(data)
      .returning({ id: productAttributeAssignment.id });
    return result;
  }
}

export default ProductAttributeAssignment;
