import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import InfoSection from "../components/InfoSection"; 
import PromoBanner from "../components/PromoBanner";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    // fetch products from backend
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        setProducts(data);

        // 👉 choose which products to feature in banners by name
        const featuredNames = [
          "Pure Chakki Atta",
          "Butter",
          "Cold Pressed Herbal Hair Oil",
          "Dates",
        ];

        const mappedBanners = featuredNames
          .map((name) => data.find((p) => p.name === name))
          .filter(Boolean) // remove null if not found
          .map((p) => ({
            subtitle:
              p.name === "Pure Chakki Atta"
                ? "Wholesome Flour"
                : p.name === "Butter"
                ? "Freshly Churned"
                : p.name === "Cold Pressed Herbal Hair Oil"
                ? "Herbal Care"
                : "Nature’s Sweetness",
            title: p.name,
            description: p.description,
            image: p.images?.[0] || "/placeholder.png",
            productId: p._id, // ✅ link using actual DB id
          }));

        setBanners(mappedBanners);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    alert(`Added ${product.name} to cart`);
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      {/* Best Sellers */}
      <section className="p-12">
        <h1 className="text-5xl font-bold text-teal-700 drop-shadow-sm mb-6">
          Best Sellers
        </h1>

        <div className="flex space-x-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide p-4">
          {products.map((p) => (
            <ProductCard
              key={p._id}
              product={p}
              onAddToCart={handleAddToCart}
              variant="carousel"
            />
          ))}
        </div>
      </section>

          {/* Note */}
      <div className="mt-16 flex justify-center bg-green-gradient">
        <div className="max-w-3xl text-center py-10">
          <h3 className="text-3xl font-bold text-green-900 mb-3">
            A Return to Authentic Living
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Mumtaz Products is a movement to reconnect with our roots, restore trust in what we eat, 
            and cherish the simplicity of traditional living.
          </p>
        </div>
      </div>
      {/* Info Sections */}
      <div className="bg-green-gradient">
        <InfoSection
          title="About Us"
          text="At Mumtaz Products, we believe that purity is not just a promise—it's a way of life. From stone-ground Chakki Atta and nutrient-rich Multigrain flour to cold-pressed oils, ghee, and natural dates, our range is rooted in tradition yet crafted for modern lifestyles. Every product reflects our commitment to authenticity, quality, and health. We are here to reconnect families with food that is wholesome, natural, and true to its origin."
          buttonText="View Products"
          image="/images/about.jpg"
        />
        <InfoSection
          title="Origins"
          text="Our journey began in the heart of Punjab, where fertile lands and rich farming traditions have nourished generations. Inspired by the values of honesty, hard work, and purity, Mumtaz Products was born with a vision to provide food that is as natural as the soil it grows from. Each product is a tribute to Punjab’s heritage, carrying forward the essence of our fields to your table."
          image="/images/origins.jpg"
          buttonText="View Products"
          reverse
        />

        <InfoSection
          title="Impact"
          text="By sourcing responsibly and working closely with local farmers, Mumtaz Products helps strengthen rural communities and promote sustainable farming practices. Our cold-pressed oils and natural flours not only protect consumer health but also support eco-friendly methods that respect the earth. Every purchase contributes to healthier families, empowered farmers, and a stronger connection between people and their food."
          image="/images/impact.jpg"
          buttonText="View Products"
        />

        <InfoSection
          title="Future Plans"
          text="Looking ahead, we are committed to expanding our range of natural and organic foods while staying true to our roots in Punjab. Our focus is on innovation without compromise — introducing healthier alternatives, promoting eco-friendly packaging, and exploring global markets."
          image="/images/future.jpg"
          buttonText="View Products"
          reverse
        />

      </div>
      

      {/* Promo Banners */}
      <div className="bg-amber-gradient">
        <div className="w-full flex flex-col items-center space-y-2 py-6">
          {banners.map((banner, index) => (
            <PromoBanner
              key={banner.productId}
              {...banner}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </div>

      {/* <section className="text-center space-y-6">
          <h2 className="text-2xl font-semibold text-green-800">
            Why Choose Us?
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Because we bring you{" "}
            <span className="text-yellow-700 font-semibold">
              100% natural, chemical-free, and authentic products
            </span>{" "}
            that celebrate tradition while nourishing your modern lifestyle.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            <div className="bg-white border border-green-200 rounded-lg p-6 shadow hover:shadow-md transition">
              <h3 className="font-semibold text-green-900 mb-2">🌱 Pure</h3>
              <p className="text-gray-600 text-sm">
                Straight from trusted farms — no shortcuts, no preservatives.
              </p>
            </div>
            <div className="bg-white border border-green-200 rounded-lg p-6 shadow hover:shadow-md transition">
              <h3 className="font-semibold text-green-900 mb-2">✨ Authentic</h3>
              <p className="text-gray-600 text-sm">
                Traditional methods like stone grinding & cold pressing.
              </p>
            </div>
            <div className="bg-white border border-green-200 rounded-lg p-6 shadow hover:shadow-md transition">
              <h3 className="font-semibold text-green-900 mb-2">🤝 Sustainable</h3>
              <p className="text-gray-600 text-sm">
                Supporting local farmers & protecting the environment.
              </p>
            </div>
          </div>
        </section> */}
    </div>
  );
}
