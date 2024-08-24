import { Category } from "../model/category.model.js";

export const fetchAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const createCategory = async (req, res) => {
  const category = new Category(req.body);
  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const fetchCategoryById = async (req, res) => {
  const id = req.params.id;
  try {
    const category = await Category.findById(id);
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json(error);
  }
};
export const deleteCategory = async (req, res) => {
  const id = req.params.id;
  try {
    const category = await Category.findByIdAndDelete(id);
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json(error);
  }
};
export const updateCategory = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const category = await category.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json(error);
  }
};
