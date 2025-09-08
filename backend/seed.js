// add here for db

import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/product.js";

dotenv.config();

const products = [
  {
    name: "Pure Chakki Atta",
    description:
      "Our Pure Chakki Atta is stone-ground using traditional chakki mills, ensuring every grain of wheat retains its natural nutrients, aroma, and taste. Carefully sourced from the finest farms, this atta is rich in fiber, protein, and essential vitamins, making it the perfect choice for a healthy lifestyle. Unlike modern milling, the slow grinding process preserves the wheat’s bran and germ, giving your rotis the softness, fluffiness, and authentic taste of homemade goodness.\n\n🌾 100% Natural | No Preservatives | Rich in Fiber | Stone-Ground Goodness",
    category: "Grocery",
    images: [],
    variants: [{ size: "5kg", price: 560, quantity: 70 }]
  },
  {
    name: "Canola Cooking Oil",
    description:
      "Our Canola Cooking Oil is a pure, light, and heart-friendly choice for everyday meals. With its mild flavor and high smoke point, it is perfect for frying, sautéing, baking, or even making salad dressings. Rich in Omega-3 and low in saturated fats, this oil not only enhances the taste of your dishes but also supports a healthier lifestyle. Ideal for households that want both taste and wellness in every drop.",
    category: "Oils",
    images: [],
    variants: [
      { size: "1l", price: 800, quantity: 50 },
      { size: "500ml", price: 400, quantity: 50 }
    ]
  },
  {
    name: "Cold Pressed Mustard Oil",
    description:
      "Experience the authentic taste and aroma of mustard with our Cold Pressed Mustard Oil. Extracted using the traditional wooden press method, this oil is chemical-free and retains all its natural nutrients. Known for its pungent flavor and strong aroma, it is a kitchen essential for pickles, curries, and traditional cooking. It is also widely used for massages and natural remedies, making it a truly versatile household product.",
    category: "Oils",
    images: [],
    variants: [
      { size: "100ml (Hair)", price: 120, quantity: 50 },
      { size: "1l (Achaar)", price: 800, quantity: 50 },
      { size: "500ml (Achaar)", price: 400, quantity: 50 }
    ]
  },
  {
    name: "Butter",
    description:
      "Our freshly churned Makhan is prepared the traditional way from high-quality dairy cream, giving it a rich, creamy, and velvety texture. Perfect for spreading on parathas, making desi delicacies, or adding a natural richness to your meals, this Makhan carries the taste of homemade goodness. Packed with essential nutrients, it is a wholesome dairy delight that brings back the authentic flavors of village kitchens.",
    category: "Dairy",
    images: [],
    variants: [
      { size: "1kg", price: 1300, quantity: 30 },
      { size: "0.5kg", price: 650, quantity: 30 }
    ]
  },
  {
    name: "Ghee",
    description:
      "Our pure desi Ghee is crafted with care from fresh dairy cream, following traditional methods to give you unmatched flavor and richness. Golden in color, aromatic in taste, and wholesome in nutrition, this ghee is perfect for cooking, frying, or drizzling over hot rotis and rice. Packed with good fats and essential vitamins, it not only enhances the taste of your meals but also promotes better digestion and energy.",
    category: "Dairy",
    images: [],
    variants: [
      { size: "1kg", price: 2200, quantity: 30 },
      { size: "0.5kg", price: 1100, quantity: 30 }
    ]
  },
  {
    name: "Cold Pressed Almond Oil",
    description:
      "Our Cold Pressed Almond Oil is extracted naturally without heat, ensuring maximum retention of nutrients. Rich in Vitamin E and antioxidants, it is excellent for hair growth, glowing skin, and overall wellness. A spoonful daily can boost immunity, while external use nourishes hair and skin deeply. Pure, chemical-free, and multipurpose — this is nature’s true elixir of health and beauty.",
    category: "Oils",
    images: [],
    variants: [{ size: "100ml", price: 950, quantity: 40 }]
  },
  {
    name: "Cold Pressed Coconut Oil",
    description:
      "Extracted from fresh coconuts using the cold-press method, our Coconut Oil is pure, natural, and unrefined. Known for its countless benefits, it can be used for cooking, frying, baking, as well as hair and skincare. Its light aroma and smooth texture make it a versatile must-have in every home. Whether for healthy cooking or natural beauty care, this oil brings you the best of nature in a bottle.",
    category: "Oils",
    images: [],
    variants: [{ size: "100ml", price: 0, quantity: 40 }]
  },
  {
    name: "Cold Pressed Herbal Hair Oil",
    description:
      "Enriched with natural herbs and oils, our Cold Pressed Herbal Hair Oil is a traditional blend that strengthens roots, reduces dandruff, and promotes hair growth. Each drop is packed with nature’s goodness, helping to restore shine, thickness, and vitality to your hair. Free from chemicals and mineral oils, this is a safe, natural, and effective solution for strong and healthy hair.",
    category: "Oils",
    images: [],
    variants: [{ size: "100ml", price: 950, quantity: 40 }]
  },
  {
    name: "Dates",
    description:
      "Our premium quality Dates are naturally sweet, soft, and full of energy. Carefully hand-picked, they are rich in fiber, vitamins, and essential minerals, making them a healthy snack and a perfect natural sweetener for desserts. Ideal for breaking fasts, gifting, or enjoying with tea, these dates are nature’s candy packed with nutrition and taste.",
    category: "Dry Fruits",
    images: [],
    variants: [{ size: "1kg", price: 0, quantity: 50 }]
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ MongoDB connected");

    await Product.deleteMany(); // optional: clears old products
    await Product.insertMany(products);
    console.log("✅ Products inserted");

    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error seeding products:", err);
  }
};

seedProducts();
