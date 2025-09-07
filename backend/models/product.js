import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  size: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 0 }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: String,
  images: [String],
  variants: [variantSchema]  // <-- multiple sizes with different prices
});

const Product = mongoose.model("Product", productSchema);
export default Product;
