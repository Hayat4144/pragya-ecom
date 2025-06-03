import {
  db,
  eq,
  insertProductAttribute,
  insertProductAttributeValues,
  productAttributes,
  productAttributeValues,
} from "@workspace/db";

class ProductAttributeService {
  async updateAttributeValue(
    attributeValueId: string,
    data: Partial<insertProductAttributeValues>,
  ) {
    const [attributeValue] = await db
      .update(productAttributeValues)
      .set(data)
      .where(eq(productAttributeValues.id, attributeValueId))
      .returning({ value: productAttributeValues.value });

    return attributeValue;
  }

  async addAttributeValue(data: insertProductAttributeValues) {
    const [attributeValue] = await db
      .insert(productAttributeValues)
      .values(data)
      .returning({
        id: productAttributeValues.id,
        value: productAttributeValues.value,
      });
    return attributeValue;
  }

  async getAttributeValues(attributeId: string) {
    const attributeValues = await db.query.productAttributeValues.findMany({
      where: eq(productAttributeValues.attributeId, attributeId),
    });
    return attributeValues;
  }

  async getAttributeById(attributeId: string) {
    const [attribute] = await db
      .select()
      .from(productAttributes)
      .where(eq(productAttributes.id, attributeId));
    return attribute;
  }

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
