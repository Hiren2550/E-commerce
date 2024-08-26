import { Cart } from "../model/cart.model.js";

export const addToCart = async (req, res) => {
  try {
    const cart = new Cart(req.body);
    const newCart = await cart.save();
    const result = await newCart.populate("product");
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const fetchCartByUser = async (req, res) => {
  const { user } = req.query;
  try {
    const cart = await Cart.find({ user: user })
      .populate("user")
      .populate("product");
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteItemFromCart = async (req, res) => {
  const id = req.params.id;
  try {
    const cart = await Cart.findByIdAndDelete(id);
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const updateCart = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const cart = await Cart.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    })
      .populate("user")
      .populate("product");
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json(error);
  }
};
