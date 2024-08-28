import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
import productsRouter from "./routes/product.route.js";
import brandsRouter from "./routes/brand.route.js";
import categoriesRouter from "./routes/category.route.js";
import usersRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import cartRouter from "./routes/cart.route.js";
import ordersRouter from "./routes/order.route.js";
import cookieParser from "cookie-parser";
import nodemailer from "nodemailer";
import { User } from "./model/user.model.js";
import crypto from "crypto";
dotenv.config();

const app = express();
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

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

app.post("/api/mail", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    var token = crypto.randomBytes(64).toString("hex");
    user.resetPasswordToken = token;
    await user.save();

    const to = req.body.email;
    const resetPageLink =
      "http://localhost:5173/reset-password?token=" +
      token +
      "&email=" +
      req.body.email;
    const subject = "Reset password for Ecommerce website user";
    const html = `<P>Click <a style='color:blue' href='${resetPageLink}'>here</a> to Reset your password</p>`;
    const text = "This is reset password action";
    const info = await transporter.sendMail({
      from: '"MERN:Ecommerce Website" <dummyhiren090@gmail.com>', // sender address
      to,
      subject,
      html,
      text,
    });
    res.json(info);
  } else {
    res.status(400).json({ message: "Invalid User" });
  }
});

app.post("/api/reset-password", async (req, res) => {
  const { token, email, password } = req.body;
  const user = await User.findOne({
    email: email,
    resetPasswordToken: token,
  });
  if (user) {
    const hashedpassword = bcryptjs.hashSync(password, 10);
    user.password = hashedpassword;
    await user.save();

    const to = req.body.email;
    const subject = "Password successfully reset";
    const html = `<P>Click <a style='color:blue' href={'/'}>here</a> go to login</p>`;
    const text = "This is  success reset password action";
    const info = await transporter.sendMail({
      from: '"MERN:Ecommerce Website" <dummyhiren090@gmail.com>', // sender address
      to,
      subject,
      html,
      text,
    });
    res.json(info);
  } else {
    res.status(400).json({ message: "Invalid User" });
  }
});

app.use((err, req, res, next) => {
  const statuscode = err.statuscode || 500;
  const message = err.message || "internal Server Error";
  return res.status(statuscode).json({ success: false, statuscode, message });
});

app.listen(8000, () => {
  console.log("server started");
});
