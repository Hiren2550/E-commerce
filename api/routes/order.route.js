import express from "express";
import {
  createOrder,
  deleteOrder,
  fetchAllOrders,
  fetchOrderById,
  fetchOrderByUser,
  updateOrder,
} from "../controller/order.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router
  .get("/", verifyToken, fetchAllOrders)
  .post("/", verifyToken, createOrder)
  .get("/order", verifyToken, fetchOrderByUser)
  .get("/:id", verifyToken, fetchOrderById)
  .patch("/:id", verifyToken, updateOrder)
  .delete("/:id", verifyToken, deleteOrder);

export default router;
