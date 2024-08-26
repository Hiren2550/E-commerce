import express from "express";
import {
  createProduct,
  deleteProduct,
  fetchAllProducts,
  fetchAllProductsByFilter,
  fetchProductById,
  updateProduct,
} from "../controller/product.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router
  .post("/", verifyToken, createProduct)
  .get("/", fetchAllProductsByFilter)
  .get("/:id", verifyToken, fetchProductById)
  .patch("/:id", verifyToken, updateProduct)
  .delete("/:id", verifyToken, deleteProduct);

export default router;
