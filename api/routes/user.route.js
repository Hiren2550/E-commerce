import express from "express";
import {
  deleteUser,
  fetchAllUsers,
  fetchUserById,
  updateUser,
} from "../controller/user.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router
  .get("/", verifyToken, fetchAllUsers)
  .get("/:id", verifyToken, fetchUserById)
  .patch("/:id", verifyToken, updateUser)
  .delete("/:id", verifyToken, deleteUser);

export default router;
