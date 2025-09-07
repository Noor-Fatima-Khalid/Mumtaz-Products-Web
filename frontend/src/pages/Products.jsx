import { useState, useRef, useEffect } from "react";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [openFilter, setOpenFilter] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const filterRef = useRef(null);
  const [cart, setCart] = useState([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item._id === product._id);
      if (existing) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // 🔹 Fetch products from backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setOpenFilter(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleAvailability = (option) => {
    if (availability.includes(option)) {
      setAvailability(availability.filter((item) => item !== option));
    } else {
      setAvailability([...availability, option]);
    }
  };

  return (
    <div className="bg-green-50 min-h-screen flex flex-col py-10">
      {/* Centralized wrapper for all content */}
      <div className="w-full max-w-screen-xl mx-auto px-3 sm:px-4 md:px-10 lg:px-12 flex flex-col">
        {/* Page heading */}
        <h1 className="text-2xl sm:text-3xl font-bold heading-teal drop-shadow-sm mb-10 text-center sm:text-left">
          Shop Our Range
        </h1>

        {/* Filters (Desktop) */}
        <div ref={filterRef} className="mb-6 hidden sm:block">
          <h1 className="text-base font-medium heading-teal mb-2 sm:mb-0">
            Filters:
          </h1>
          <div className="flex flex-row gap-3 sm:gap-6 mt-1 sm:mt-0 sm:ml-4">
            {/* Availability Filter */}
            <div className="relative">
              <button
                onClick={() =>
                  setOpenFilter(openFilter === "availability" ? null : "availability")
                }
                className="flex text-gray-700 items-center gap-2 px-2 py-1 hover:underline"
              >
                Availability <span className="text-xs">▼</span>
              </button>
              {openFilter === "availability" && (
                <div className="absolute mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-400 p-3 z-10">
                  <p className="text-sm mb-2 text-gray-800">Availability</p>
                  <label className="flex items-center gap-2 cursor-pointer text-gray-800">
                    <input
                      type="checkbox"
                      checked={availability.includes("in-stock")}
                      onChange={() => toggleAvailability("in-stock")}
                    />
                    In stock
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer mt-2 text-gray-800">
                    <input
                      type="checkbox"
                      checked={availability.includes("out-of-stock")}
                      onChange={() => toggleAvailability("out-of-stock")}
                    />
                    Out of stock
                  </label>
                </div>
              )}
            </div>

            {/* Price Filter */}
            <div className="relative">
              <button
                onClick={() => setOpenFilter(openFilter === "price" ? null : "price")}
                className="flex items-center gap-2 text-gray-700 px-2 py-1 hover:underline"
              >
                Price <span className="text-xs">▼</span>
              </button>
              {openFilter === "price" && (
                <div className="absolute w-68 mt-2 w-64 bg-white shadow-lg rounded-md border border-gray-400 p-3 z-10">
                  <p className="text-sm mb-2 text-gray-800">Enter Price Range</p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <div className="flex items-center gap-1">
                      <p className="text-gray-800">Rs.</p>
                      <input
                        type="number"
                        placeholder="From"
                        value={priceRange.min}
                        onChange={(e) =>
                          setPriceRange({ ...priceRange, min: e.target.value })
                        }
                        className="w-20 sm:w-24 border border-gray-500 rounded px-2 py-1 text-gray-800"
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <p className="text-gray-800">Rs.</p>
                      <input
                        type="number"
                        placeholder="To"
                        value={priceRange.max}
                        onChange={(e) =>
                          setPriceRange({ ...priceRange, max: e.target.value })
                        }
                        className="w-20 sm:w-24 border border-gray-500 rounded px-2 py-1 text-gray-800"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => setOpenFilter(null)}
                    className="mt-3 px-3 py-1 bg-nav text-white rounded-md w-full"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Filters button (Mobile only) */}
        <div className="sm:hidden mb-4">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="text-nav ms-4 font-medium hover:underline underline-offset-4 transition-colors"
          >
            Filters
          </button>
        </div>

        {/* Mobile Slide-in Filters Panel */}
        {mobileFiltersOpen && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setMobileFiltersOpen(false)}
            ></div>

            {/* Panel */}
            <div className="fixed top-0 right-0 h-full w-72 max-w-full bg-green-50 shadow-lg z-50 transform transition-transform duration-300">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-800">Filter and sort</h2>
                <button onClick={() => setMobileFiltersOpen(false)}>✕</button>
              </div>
              <div className="p-4 space-y-6">
                {/* Availability */}
                <div>
                  <p className="font-medium text-gray-700 mb-2">Availability</p>
                  <label className="flex items-center gap-2 cursor-pointer text-gray-800">
                    <input
                      type="checkbox"
                      checked={availability.includes("in-stock")}
                      onChange={() => toggleAvailability("in-stock")}
                    />
                    In stock
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer mt-2 text-gray-800">
                    <input
                      type="checkbox"
                      checked={availability.includes("out-of-stock")}
                      onChange={() => toggleAvailability("out-of-stock")}
                    />
                    Out of stock
                  </label>
                </div>

                {/* Price */}
                <div>
                  <p className="font-medium text-gray-700 mb-2">Price</p>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="From"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange({ ...priceRange, min: e.target.value })
                      }
                      className="w-20 border border-gray-500 rounded px-2 py-1 text-gray-800"
                    />
                    <span>-</span>
                    <input
                      type="number"
                      placeholder="To"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange({ ...priceRange, max: e.target.value })
                      }
                      className="w-20 border border-gray-500 rounded px-2 py-1 text-gray-800"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom actions */}
              <div className="absolute bottom-0 w-full border-t p-4 flex justify-between items-center">
                <button
                  onClick={() => {
                    setAvailability([]);
                    setPriceRange({ min: "", max: "" });
                  }}
                  className="text-red-500 text-sm"
                >
                  Remove all
                </button>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="bg-nav text-white px-4 py-2 rounded"
                >
                  Apply
                </button>
              </div>
            </div>
          </>
        )}

        {/* Product Cards Section */}
        {loading ? (
          <p className="text-center text-gray-600">Loading products...</p>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-1 md:gap-4">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} onAddToCart={handleAddToCart} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
