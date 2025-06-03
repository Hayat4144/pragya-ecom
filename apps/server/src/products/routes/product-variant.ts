import { addProductVariant } from "@products/controllers/product-variant";
import express, { Router } from "express";

const productVariantRouter: Router = express.Router();

productVariantRouter.post("/", addProductVariant);

export default productVariantRouter;
