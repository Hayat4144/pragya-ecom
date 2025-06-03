import { httpStatus, httpStatusCode } from "@customtype/http";
import { addProductVariantReq } from "@customtype/products";
import ProductVariantService from "@services/products/product-variants";
import asyncHandler from "@utils/async-handler";
import { sendResponse } from "@utils/base-response";
import logger from "@utils/logger";
import { insertProductVariant } from "@workspace/db";
import { Request, Response } from "express";

const productVariantService = new ProductVariantService();

const addProductVariant = asyncHandler(async (req: Request, res: Response) => {
  const {
    productId,
    price,
    stock,
    salePrice,
    costPrice,
    isDefault,
    attributeValueIds,
  }: addProductVariantReq = req.body;

  const productVariantData: insertProductVariant = {
    productId,
    sku: Date.now().toString(),
    price,
    stock,
    salePrice,
    costPrice,
    isDefault,
  };

  const variant = await productVariantService.addProductVariant(
    productVariantData,
    attributeValueIds,
  );
  if (!variant) {
    logger.error("Something went wrong. Please try again.", httpStatusCode);
  }

  return sendResponse(
    res,
    httpStatusCode.OK,
    httpStatus.SUCCESS,
    "Product item added successfully",
    productVariantData,
  );
});

export { addProductVariant };
