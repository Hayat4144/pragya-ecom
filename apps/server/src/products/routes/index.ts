import { addProduct, getProducts, updateProduct } from "@products/controllers";
import express, { type Router } from "express";

const productRouter: Router = express.Router();

productRouter.post("/", addProduct);
productRouter.get("/", getProducts);
productRouter.put("/", updateProduct);

export default productRouter;
