// best seller product card
import { Link } from 'react-router-dom';
import React from 'react'

const ProductCard = ({ product, onAddToCart, variant = "default" }) => {
  const cardWidth =
    variant === "carousel"
      ? "w-56 sm:w-60 md:w-64" // wider for Best Sellers
      : "w-40 sm:w-40 md:w-48 lg:w-44 xl:w-52"; // your current widths

  return (
    <Link
    to={`/product/${product._id}`}
      className={`rounded-lg shadow-xl/20 card-bg
        flex flex-col ${cardWidth} flex-wrap
        ms-4 h-auto
        overflow-hidden
        transition-all duration-300 ease-in-out
        hover:-translate-y-2 hover:shadow-xl
        group`}
    >
      {/* Image */}
      <div className="relative w-full h-56 aspect-[4/5] overflow-hidden">
        <img
          src={product.images?.[0] || "/haha.jpg"}
          alt={product.description}
          className="w-full h-full object-cover group-hover:hidden"
        />
        <img
          src={product.images?.[1] || "/monkey.jpg"}
          alt={product.description}
          className="w-full h-full object-cover hidden group-hover:block"
        />
      </div>

      {/* Text */}
      <div className="flex flex-col text-center px-2 py-3 flex-grow">
        <p className="text-xs sm:text-sm md:text-base lg:text-lg font-bold product-text drop-shadow-sm group-hover:underline line-clamp-2">
          {product.name}
        </p>
        <p className="product-text text-[10px] sm:text-xs md:text-sm lg:text-base mt-1">
          Rs.{Math.min(...product.variants.map(v => v.price))} PKR
        </p>
      </div>

      {/* Button */}
      <div className="px-2 pb-3">
        <button
          type="button"
          onClick={() => onAddToCart(product)}
          className="text-green-900 w-full border border-green-800 rounded-lg 
            text-[10px] sm:text-xs md:text-sm lg:text-base
            px-2 py-2
            transition-all duration-200 ease-in-out 
            hover:scale-105 hover:shadow-lg hover:border-green-800
            focus:outline-none"
        >
          BUY NOW
        </button>
      </div>
    </Link>
  );
};
export default ProductCard
