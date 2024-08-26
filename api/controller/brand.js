import { Brand } from "../model/brand.model.js";

export const fetchAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
  } catch (error) {
    next(error);
  }
};

export const createBrand = async (req, res) => {
  const brand = new Brand(req.body);
  try {
    const newBrand = await brand.save();
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(400).json(error);
  }
};
export const fetchBrandById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const brand = await Brand.findById(id);
    res.status(200).json(brand);
  } catch (error) {
    next(error);
  }
};
export const deleteBrand = async (req, res) => {
  const id = req.params.id;
  try {
    const brand = await Brand.findByIdAndDelete(id);
    res.status(200).json({ result: "brand is deleted" });
  } catch (error) {
    res.status(400).json(error);
  }
};
export const updateBrand = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const brand = await Brand.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(brand);
  } catch (error) {
    res.status(400).json(error);
  }
};
