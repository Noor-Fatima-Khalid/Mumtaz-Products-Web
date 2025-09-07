import express from "express";
import Order from "../models/order.js";
import { protect, admin } from "../middleware/authMiddleware.js"; // ✅ import middleware

const router = express.Router();

// @desc   Create order (logged-in user only)
// @route  POST /api/orders
router.post("/", protect, async (req, res) => {
  try {
    const order = new Order({
      ...req.body,
      user: req.user._id, // ✅ attach logged-in user
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// @desc   Get all orders (admin only)
// @route  GET /api/orders
router.get("/", protect, admin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email") // populate only safe fields
      .populate("items.product");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @desc   Get a single order by ID (user who owns it or admin)
// @route  GET /api/orders/:id
router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("items.product");

    if (!order) return res.status(404).json({ error: "Order not found" });

    // only owner or admin can view
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to view this order" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @desc   Get all orders for the logged-in user
// @route  GET /api/orders/myorders
router.get("/myorders", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
