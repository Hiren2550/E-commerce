import express from "express";
import {
  createBrand,
  deleteBrand,
  fetchAllBrands,
  fetchBrandById,
  updateBrand,
} from "../controller/brand.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router
  .get("/", fetchAllBrands)
  .post("/", verifyToken, createBrand)
  .get("/:id", verifyToken, fetchBrandById)
  .patch("/:id", verifyToken, updateBrand)
  .delete("/:id", verifyToken, deleteBrand);

export default router;
