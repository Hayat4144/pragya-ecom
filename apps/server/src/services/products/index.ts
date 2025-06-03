import { httpStatusCode } from "@customtype/http";
import ApiError from "@utils/api-error";
import logger from "@utils/logger";
import {
  db,
  eq,
  insertProduct,
  productAttributeAssignment,
  products,
  TransactionRollbackError,
} from "@workspace/db";

class ProductService {
  async updateProduct(productId: string, data: Partial<insertProduct>) {
    const [product] = await db
      .update(products)
      .set(data)
      .where(eq(products.id, productId))
      .returning({ id: products.id, name: products.name });
    return product;
  }

  async getProducts() {
    const products = await db.query.products.findMany();
    return products;
  }

  async addProduct(data: insertProduct, attributeIds?: string[]) {
    try {
      const result = await db.transaction(async (tx) => {
        const [product] = await tx
          .insert(products)
          .values(data)
          .returning({ id: products.id, name: products.name });

        if (!product) {
          return tx.rollback();
        }

        if (data.hasVariants && attributeIds && attributeIds.length) {
          const assignedAttributes = await Promise.all(
            attributeIds.map((attributeId) => {
              return tx
                .insert(productAttributeAssignment)
                .values({
                  productId: product.id,
                  attributeId,
                })
                .returning({ id: productAttributeAssignment.id });
            }),
          );

          if (
            assignedAttributes.some((assignedAttribute) => !assignedAttribute)
          ) {
            return tx.rollback();
          }
        }

        return product;
      });

      return result;
    } catch (error) {
      logger.error(error);
      if (error instanceof TransactionRollbackError) {
        throw new ApiError(
          "Something went wrong ,while creating product",
          httpStatusCode.BAD_REQUEST,
        );
      }
      throw new ApiError("Something went wrong", httpStatusCode.BAD_REQUEST);
    }
  }
}

export default ProductService;
