import express from "express";
import {
  createProduct,
  deleteProduct,
  fetchAllProducts,
  fetchAllProductsByFilter,
  fetchProductById,
  updateProduct,
} from "../controller/product.js";
const router = express.Router();

router
  .post("/", createProduct)
  .get("/", fetchAllProductsByFilter)
  .get("/:id", fetchProductById)
  .patch("/:id", updateProduct)
  .delete("/:id", deleteProduct);

export default router;
