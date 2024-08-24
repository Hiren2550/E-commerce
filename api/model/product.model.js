import mongoose from "mongoose";
import { Schema } from "mongoose";

const productSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: {
      type: Number,
      required: true,
      min: [1, "wrong min price"],
      max: [200000, "wrong max price"],
    },
    discountPercentage: {
      type: Number,
      min: [1, "wrong min discount percentage"],
      max: [99, "wrong max discount percentage"],
    },
    rating: {
      type: Number,
      required: true,
      min: [1, "wrong min rating "],
      max: [5, "wrong max rating"],
      default: 1,
    },
    stock: {
      type: Number,
      required: true,
      min: [0, "wrong min stock "],
      max: [1000, "wrong max stock"],
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
    reviews: { type: [Object] },
    tags: {
      type: [String],
    },
    warrantyInformation: {
      type: String,
      required: true,
    },
    shippingInformation: {
      type: String,
      required: true,
    },
    returnPolicy: {
      type: String,
      required: true,
    },
    images: { type: [String], required: true },
    thumbnail: { type: String, required: true },
  },
  { timestamps: true }
);

const virtual = productSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
productSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const Product = mongoose.model("Product", productSchema);
