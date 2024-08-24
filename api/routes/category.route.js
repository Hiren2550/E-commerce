import express from "express";
import {
  createCategory,
  deleteCategory,
  fetchAllCategories,
  fetchCategoryById,
  updateCategory,
} from "../controller/category.js";
const router = express.Router();

router
  .get("/", fetchAllCategories)
  .post("/", createCategory)
  .get("/:id", fetchCategoryById)
  .patch("/:id", updateCategory)
  .delete("/:id", deleteCategory);

export default router;
