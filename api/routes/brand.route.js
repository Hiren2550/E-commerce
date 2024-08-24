import express from "express";
import {
  createBrand,
  deleteBrand,
  fetchAllBrands,
  fetchBrandById,
  updateBrand,
} from "../controller/brand.js";
const router = express.Router();

router
  .get("/", fetchAllBrands)
  .post("/", createBrand)
  .get("/:id", fetchBrandById)
  .patch("/:id", updateBrand)
  .delete("/:id", deleteBrand);

export default router;
