import express from "express";
import {
  createCategory,
  deleteCategory,
  fetchAllCategories,
  fetchCategoryById,
  updateCategory,
} from "../controller/category.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router
  .get("/", fetchAllCategories)
  .post("/", verifyToken, createCategory)
  .get("/:id", verifyToken, fetchCategoryById)
  .patch("/:id", verifyToken, updateCategory)
  .delete("/:id", verifyToken, deleteCategory);

export default router;
