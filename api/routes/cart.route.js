import express from "express";

import {
  addToCart,
  deleteItemFromCart,
  fetchCartByUser,
  updateCart,
} from "../controller/cart.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router
  .post("/", verifyToken, addToCart)
  .get("/", verifyToken, fetchCartByUser)
  .delete("/:id", verifyToken, deleteItemFromCart)
  .patch("/:id", verifyToken, updateCart);

export default router;
