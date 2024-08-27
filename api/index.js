import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productsRouter from "./routes/product.route.js";
import brandsRouter from "./routes/brand.route.js";
import categoriesRouter from "./routes/category.route.js";
import usersRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import cartRouter from "./routes/cart.route.js";
import ordersRouter from "./routes/order.route.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use("/api/products", productsRouter);
app.use("/api/brands", brandsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", ordersRouter);

const main = async () => {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Database connected");
};
main().catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.json({ message: "API done" });
});

app.use((err, req, res, next) => {
  const statuscode = err.statuscode || 500;
  const message = err.message || "internal Server Error";
  return res.status(statuscode).json({ success: false, statuscode, message });
});

app.listen(8000, () => {
  console.log("server started");
});
