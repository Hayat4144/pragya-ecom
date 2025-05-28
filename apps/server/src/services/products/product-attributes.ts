import {
  db,
  eq,
  insertProductAttribute,
  productAttributes,
} from "@workspace/db";

class ProductAttributeService {
  async updateAttribute(
    attributeId: string,
    data: Partial<insertProductAttribute>,
  ) {
    const [attribute] = await db
      .update(productAttributes)
      .set(data)
      .where(eq(productAttributes.id, attributeId))
      .returning({
        name: productAttributes.name,
      });
    return attribute;
  }

  async getAttributes() {
    const attributes = await db.query.productAttributes.findMany();
    return attributes;
  }

  // async getAttributesByProductId(productId: string) {
  //   const attributes = await db.query.productAttributes.findMany({
  //     where: eq(productAttributes.productId, productId),
  //   });
  //   return attributes;
  // }

  async addAttribute(data: insertProductAttribute) {
    const [attribute] = await db
      .insert(productAttributes)
      .values(data)
      .returning({
        name: productAttributes.name,
      });
    return attribute;
  }

  async deleteAttribute(attributeId: string) {
    const [attribute] = await db
      .delete(productAttributes)
      .where(eq(productAttributes.id, attributeId))
      .returning({
        id: productAttributes.id,
        name: productAttributes.name,
      });
    return attribute;
  }
}

export default ProductAttributeService;
