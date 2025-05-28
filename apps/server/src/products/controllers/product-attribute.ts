import { httpStatus, httpStatusCode } from "@customtype/http";
import ProductAttributeService from "@services/products/product-attributes";
import ApiError from "@utils/api-error";
import asyncHandler from "@utils/async-handler";
import { sendResponse } from "@utils/base-response";
import { getSlug } from "@utils/index";
import logger from "@utils/logger";
import { insertProductAttribute } from "@workspace/db";
import { Request, Response } from "express";

const productAttributeService = new ProductAttributeService();

const updateProductAttribute = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, productAttributeId } = req.body;

    const attributeData: Partial<insertProductAttribute> = {
      name,
      slug: getSlug(name),
    };

    const attribute = await productAttributeService.updateAttribute(
      productAttributeId,
      attributeData,
    );

    if (!attribute) {
      logger.error("Something went wrong.");
      throw new ApiError("Something went wrong.", httpStatusCode.BAD_REQUEST);
    }

    const message = `The ${attribute.name} attribute has been updated successfully.`;

    return sendResponse(
      res,
      httpStatusCode.OK,
      httpStatus.SUCCESS,
      message,
      attribute,
    );
  },
);

const getProductAttribute = asyncHandler(
  async (req: Request, res: Response) => {
    const attributes = await productAttributeService.getAttributes();
    logger.info("Attributes fetched successfully");
    return sendResponse(
      res,
      httpStatusCode.OK,
      httpStatus.SUCCESS,
      "Attributes fetched successfully",
      attributes,
    );
  },
);

const addProductAttribute = asyncHandler(
  async (req: Request, res: Response) => {
    const { name } = req.body;

    const attributeData: insertProductAttribute = {
      name,
      slug: getSlug(name),
    };

    const attribute = await productAttributeService.addAttribute(attributeData);

    if (!attribute) {
      logger.error("Something went wrong.");
      throw new ApiError("Something went wrong.", httpStatusCode.BAD_REQUEST);
    }

    const message = `The ${attribute.name} attribute has been added successfully.`;
    logger.info(message);

    return sendResponse(res, httpStatusCode.OK, httpStatus.SUCCESS, message);
  },
);

export { addProductAttribute, getProductAttribute, updateProductAttribute };
