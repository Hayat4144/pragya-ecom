import {
  db,
  insertProductVariant,
  productVariants,
  productVariantAttributeValues,
  TransactionRollbackError,
} from "@workspace/db";
import ProductService from ".";
import ApiError from "@utils/api-error";
import { httpStatusCode } from "@customtype/http";
import logger from "@utils/logger";

class ProductVariantService extends ProductService {
  constructor() {
    super();
  }

  async addProductVariant(
    data: insertProductVariant,
    attributeValueIds?: string[],
  ) {
    try {
      const result = await db.transaction(async (tx) => {
        const [variant] = await tx
          .insert(productVariants)
          .values(data)
          .returning({ id: productVariants.id });

        if (!variant) {
          return tx.rollback();
        }

        if (attributeValueIds?.length) {
          const variantAttributeValues = await Promise.all(
            attributeValueIds.map((item) =>
              tx
                .insert(productVariantAttributeValues)
                .values({
                  attributeValueId: item,
                  variantId: variant.id,
                })
                .returning({ id: productVariantAttributeValues.id }),
            ),
          );

          // Check if any insert failed
          if (
            variantAttributeValues.some(
              (assigned) => !assigned || assigned.length === 0,
            )
          ) {
            return tx.rollback();
          }
        }

        return variant;
      });

      return result;
    } catch (error) {
      logger.error(error);
      if (error instanceof TransactionRollbackError) {
        throw new ApiError(
          "Failed to add product variant",
          httpStatusCode.BAD_REQUEST,
        );
      }
      throw new ApiError("Something went wrong", httpStatusCode.BAD_REQUEST);
    }
  }
}

export default ProductVariantService;
