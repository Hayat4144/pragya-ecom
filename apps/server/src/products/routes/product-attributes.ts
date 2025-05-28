import {
  addProductAttribute,
  getProductAttribute,
  updateProductAttribute,
} from "@products/controllers/product-attribute";
import express, { type Router } from "express";

const productAttributeRouter: Router = express.Router();

productAttributeRouter.post("/", addProductAttribute);
productAttributeRouter.get("/", getProductAttribute);
productAttributeRouter.put("/", updateProductAttribute);

export default productAttributeRouter;
