import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Fetch product from backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);

        // ✅ default to first variant
        if (data.variants && data.variants.length > 0) {
          setSelectedVariant(data.variants[0]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10">Loading product...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  if (!product) {
    return <p className="text-center mt-10">Product not found</p>;
  }

  return (
    <div className="bg-green-50 min-h-screen px-6 py-10 flex justify-center">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-5 gap-10">
        
        {/* LEFT (Images) */}
        <div className="lg:col-span-3 flex flex-col items-center">
          <div className="bg-white rounded-lg shadow-lg flex items-center justify-center w-full max-w-md">
            <img
              src={product.images?.[0] || "/placeholder.png"}
              alt={product.name}
              className="w-full object-contain max-h-[500px] p-6"
            />
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-3 gap-4 mt-6 w-full max-w-md">
            {(product.images && product.images.length > 0
              ? product.images
              : ["/placeholder.png", "/placeholder.png", "/placeholder.png"]
            ).map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt=""
                className="rounded-md shadow"
              />
            ))}
          </div>
        </div>

        {/* RIGHT (Details) */}
        <div className="lg:col-span-2 flex flex-col space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
          
          {/* ✅ Dynamic Price */}
          <p className="text-xl font-semibold text-gray-700">
            Rs.{selectedVariant?.price} PKR
          </p>
          
          <p className="text-sm text-gray-500">
            <Link to="/shipping" className="hover:underline hover:text-amber-700"> Shipping </Link>
            calculated at checkout.
          </p>

          {/* ✅ Size selection */}
          {product.variants && product.variants.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Size</p>
              <div className="flex gap-2">
                {product.variants.map((variant, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 py-2 rounded-full font-semibold ${
                      selectedVariant?.size === variant.size
                        ? "bg-yellow-600 text-white"
                        : "bg-green-900 text-white"
                    }`}
                  >
                    {variant.size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <p className="text-sm font-medium mb-2">Quantity</p>
            <div className="flex items-center border border-gray-400 w-fit">
              <button
                className="px-3 py-2"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                className="px-3 py-2"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <button className="w-full py-3 border border-yellow-600 text-yellow-700 font-medium rounded shadow hover:bg-yellow-50">
            Add to Cart
          </button>
          <button className="w-full py-3 bg-yellow-600 text-white font-medium rounded shadow hover:bg-yellow-700">
            Buy it Now
          </button>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
