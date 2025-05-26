import { httpStatus, httpStatusCode } from "@customtype/http";
import { addProductReq, updateProductReq } from "@customtype/products";
import ProductService from "@services/products";
import ApiError from "@utils/api-error";
import asyncHandler from "@utils/async-handler";
import { sendResponse } from "@utils/base-response";
import { getSlug } from "@utils/index";
import logger from "@utils/logger";
import { insertProduct } from "@workspace/db";
import { type Request, type Response } from "express";

const productService = new ProductService();

const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const {
    name,
    productId,
    description,
    metaTitle,
    metaDescription,
    hasVariants,
  }: updateProductReq = req.body;

  const productData: Partial<insertProduct> = {
    name,
    slug: getSlug(name),
    description,
    metaDescription,
    metaTitle,
    hasVariants,
  };

  const product = await productService.updateProduct(productId, productData);
  if (!product) {
    logger.error("Product does not exist");
    throw new ApiError("Product does not exist", httpStatusCode.BAD_REQUEST);
  }

  const message = `The product ${product.name} has been updated successfully`;
  logger.info(message);

  return sendResponse(res, httpStatusCode.OK, httpStatus.SUCCESS, message);
});

const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await productService.getProducts();
  return sendResponse(
    res,
    httpStatusCode.OK,
    httpStatus.SUCCESS,
    "Products fetched successfully",
    products,
  );
});

const addProduct = asyncHandler(async (req: Request, res: Response) => {
  const {
    name,
    description,
    metaTitle,
    metaDescription,
    categoryId,
    hasVariants,
  }: addProductReq = req.body;

  const productData: insertProduct = {
    name,
    slug: getSlug(name),
    description,
    metaDescription,
    metaTitle,
    hasVariants,
    categoryId,
  };

  const product = await productService.addProduct(productData);
  if (!product) {
    logger.error("Something went wrong");
    throw new ApiError("Something went wrong", httpStatusCode.BAD_REQUEST);
  }

  const message = `The ${product.name} has been added successfully`;
  logger.error(message);
  return sendResponse(res, httpStatusCode.OK, httpStatus.SUCCESS, message);
});

export { addProduct, getProducts, updateProduct };
