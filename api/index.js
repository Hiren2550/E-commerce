import express from "express";
import mongoose from "mongoose";
import productRouter from "./routes/product.route.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use("/api/products", productRouter);

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
