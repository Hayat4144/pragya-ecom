import { httpStatus, httpStatusCode } from "@customtype/http";
import {
  addProductAttributeValueReq,
  updateProductAttributeValueReq,
} from "@customtype/products/attribute";
import ProductAttributeService from "@services/products/product-attributes";
import ApiError from "@utils/api-error";
import asyncHandler from "@utils/async-handler";
import { sendResponse } from "@utils/base-response";
import logger from "@utils/logger";
import { Request, Response } from "express";

const attributeService = new ProductAttributeService();

const updateProductAttributeValue = asyncHandler(
  async (req: Request, res: Response) => {
    const { value, attributeValueId }: updateProductAttributeValueReq =
      req.body;

    const attribute = await attributeService.updateAttributeValue(
      attributeValueId,
      { value },
    );

    if (!attribute) {
      logger.error("Attribute value does not exist.");
    }

    const message = `Attribute value updated successfully`;

    logger.info(message);

    return sendResponse(res, httpStatusCode.OK, httpStatus.SUCCESS, message);
  },
);

const getProductAttributeValues = asyncHandler(
  async (req: Request, res: Response) => {
    const { attributeId } = req.params;
    if (!attributeId) {
      throw new ApiError(
        "Attribute id is required",
        httpStatusCode.BAD_REQUEST,
      );
    }
    const attributes = await attributeService.getAttributeValues(attributeId);

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

const addProductAttributeValue = asyncHandler(
  async (req: Request, res: Response) => {
    const { value, attributeId }: addProductAttributeValueReq = req.body;
    const attribute = await attributeService.addAttributeValue({
      value,
      attributeId,
    });

    if (!attribute) {
      logger.error("Something went wrong.");
      throw new ApiError("Something went wrong.", httpStatusCode.BAD_REQUEST);
    }

    const message = `Attribute value added successfully.`;
    logger.info(message);

    return sendResponse(res, httpStatusCode.OK, httpStatus.SUCCESS, message);
  },
);

export {
  addProductAttributeValue,
  getProductAttributeValues,
  updateProductAttributeValue,
};
