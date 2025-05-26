import { addCategoryReq, updateCategoryReq } from "@customtype/category";
import { httpStatus, httpStatusCode } from "@customtype/http";
import CategoryService from "@services/categories";
import ApiError from "@utils/api-error";
import asyncHandler from "@utils/async-handler";
import { sendResponse } from "@utils/base-response";
import { getSlug } from "@utils/index";
import logger from "@utils/logger";
import { insertCategory } from "@workspace/db";
import { Response, Request } from "express";

const categoryService = new CategoryService();

const updateCategory = asyncHandler(async (req: Request, res: Response) => {
  const { name, categoryId, imageUrl }: updateCategoryReq = req.body;

  const data: Partial<insertCategory> = {
    name,
    slug: getSlug(name),
    imageUrl,
  };

  const category = await categoryService.updateCategory(categoryId, data);

  if (!category) {
    logger.error("Category does not exist.");
    throw new ApiError("Category does not exist.", httpStatusCode.BAD_REQUEST);
  }

  const message = `The ${category.name} category has been updated successfully`;

  return sendResponse(res, httpStatusCode.OK, httpStatus.SUCCESS, message);
});

const getCategorySubCategories = asyncHandler(
  async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    const categories = await categoryService.getCategoriesChildren(
      categoryId as string,
    );

    if (!categories) {
      logger.error("Category not found");
      throw new ApiError("Category not found", httpStatusCode.BAD_REQUEST);
    }

    logger.info("Category fetched successfully");
    return sendResponse(
      res,
      httpStatusCode.OK,
      httpStatus.SUCCESS,
      "Category fetched successfully",
      categories,
    );
  },
);

const getCategoryById = asyncHandler(async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const category = await categoryService.getCategoryById(categoryId as string);

  if (!category) {
    logger.error("Category not found");
    throw new ApiError("Category not found", httpStatusCode.BAD_REQUEST);
  }

  logger.info("Category fetched successfully");
  return sendResponse(
    res,
    httpStatusCode.OK,
    httpStatus.SUCCESS,
    "Category fetched successfully",
    category,
  );
});

const getCategories = asyncHandler(async (req: Request, res: Response) => {
  const categories = await categoryService.getCategories();
  return sendResponse(
    res,
    httpStatusCode.OK,
    httpStatus.SUCCESS,
    "All Categories",
    categories,
  );
});

const addCategory = asyncHandler(async (req: Request, res: Response) => {
  const { name, imageUrl, parentId }: addCategoryReq = req.body;
  const categoryData: insertCategory = {
    name,
    slug: getSlug(name),
    imageUrl,
    parentId,
  };

  const category = await categoryService.addCategory(categoryData);
  if (!category) {
    logger.error("Category not added");
    throw new ApiError("Category not added", httpStatusCode.BAD_REQUEST);
  }

  const message = `The ${category.name} category has been added successfully`;
  logger.info(message);

  return sendResponse(res, httpStatusCode.OK, httpStatus.SUCCESS, message);
});

export {
  updateCategory,
  addCategory,
  getCategories,
  getCategoryById,
  getCategorySubCategories,
};
