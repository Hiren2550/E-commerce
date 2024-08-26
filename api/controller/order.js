import { Order } from "../model/order.model.js";

export const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    const newOrder = await order.save();
    const doc = await newOrder.populate("user");
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};
export const fetchAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const fetchOrderById = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Order.findById(id).populate("user");
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};
export const updateOrder = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const doc = await Order.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).populate("user");
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};
export const deleteOrder = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Order.findByIdAndDelete(id);
    res.status(200).json({ meassage: "Order is deleted" });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const fetchOrderByUser = async (req, res) => {
  const { user } = req.query;
  try {
    const order = await Order.find({ user: user }).populate("user");
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json(error);
  }
};
