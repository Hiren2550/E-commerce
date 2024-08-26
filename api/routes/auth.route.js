import express from "express";
import { checkAuth, createUser, login, signout } from "../controller/auth.js";

const router = express.Router();

router
  .post("/signup", createUser)
  .post("/login", login)
  .get("/checkAuth", checkAuth)
  .get("/signout", signout);
export default router;
