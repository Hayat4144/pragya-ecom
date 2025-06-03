import {
  addProductAttributeValue,
  getProductAttributeValues,
  updateProductAttributeValue,
} from "@products/controllers/product-attribute-values";
import express, { type Router } from "express";

const productAttributeValueRouter: Router = express.Router();

productAttributeValueRouter.get("/:attributeId", getProductAttributeValues);
productAttributeValueRouter.post("/", addProductAttributeValue);
productAttributeValueRouter.put("/", updateProductAttributeValue);

export default productAttributeValueRouter;
