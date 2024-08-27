import { User } from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const createUser = async (req, res, next) => {
  try {
    const { name, email, role, password } = req.body;
    const hashedpassword = bcryptjs.hashSync(password, 10);
    const user = new User({ name, email, role, password: hashedpassword });
    const doc = await user.save();
    const token = jwt.sign({ id: doc.id }, process.env.JWT_SECRET);
    res.cookie("access_token", token, { httpOnly: true }).status(201).json(doc);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(400).json({ message: "No such user" });
    } else if (bcryptjs.compareSync(password, user.password)) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      // console.log(token);
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(user);
    } else {
      res.status(400).json({ message: "Wrong Crendentials" });
    }
  } catch (error) {
    next(error);
  }
};

export const checkAuth = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    if (!token) return next(errorHandler(401, "Unauthorized"));
    const info = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = info;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({ message: "user has been logged out" });
  } catch (error) {
    next(error);
  }
};
