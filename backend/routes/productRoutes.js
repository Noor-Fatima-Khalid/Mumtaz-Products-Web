import express from "express";
import Product from "../models/product.js";
import { protect, admin } from "../middleware/authMiddleware.js"; // ✅ import middleware

const router = express.Router();

// Create product (protected: only admin)
router.post("/", protect, admin, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all products (public)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single product (public)
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update product (protected: only admin)
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete product (protected: only admin)
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get product based on availability (public)
// GET /api/products/availability/:status
router.get("/availability/:status", async (req, res) => {
  try {
    const { status } = req.params;
    let query = {};

    if (status === "in-stock") {
      query["variants.quantity"] = { $gt: 0 };
    } else if (status === "out-of-stock") {
      query["variants.quantity"] = 0;
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get product for price filter (public)
// GET /api/products/price/:min/:max
router.get("/price/:min/:max", async (req, res) => {
  try {
    const { min, max } = req.params;

    const products = await Product.find({
      "variants.price": { $gte: Number(min), $lte: Number(max) }
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
