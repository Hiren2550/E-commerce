import express from "express";
import mongoose from "mongoose";
import productsRouter from "./routes/product.route.js";
import brandsRouter from "./routes/brand.route.js";
import categoriesRouter from "./routes/category.route.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use("/api/products", productsRouter);
app.use("/api/brands", brandsRouter);
app.use("/api/categories", categoriesRouter);

const main = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
  console.log("Database connected");
};
main().catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.json({ message: "API done" });
});

app.listen(8000, () => {
  console.log("server started");
});
