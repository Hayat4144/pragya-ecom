import {
  addCategory,
  getCategories,
  getCategoryById,
  getCategorySubCategories,
  updateCategory,
} from "@categories/controller";
import express, { type Router } from "express";

const categoryRouter: Router = express.Router();

categoryRouter.post("/", addCategory);
categoryRouter.get("/", getCategories);
categoryRouter.put("/", updateCategory);
categoryRouter.get("/:categoryId", getCategoryById);
categoryRouter.get("/:categoryId/subcategories", getCategorySubCategories);

export default categoryRouter;
