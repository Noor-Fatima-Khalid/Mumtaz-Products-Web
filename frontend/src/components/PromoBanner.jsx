import React from "react";
import {Link} from "react-router-dom"

const PromoBanner = ({
  subtitle,
  title,
  description,
  highlight,
  image,
  reverse = false,
  buttonText = "Shop Now",
  productId,
}) => {
  return (
    <div className="border border-green-200 bg-green-50">
      <div
        className={`w-full lg:w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 ${
          reverse ? "md:[direction:rtl]" : ""
        }`}
      >
        {/* TEXT */}
        <div
          className={`p-8 md:p-12 flex flex-col justify-center space-y-4 ${
            reverse ? "md:[direction:ltr]" : ""
          }`}
        >
          {subtitle && (
            <p className="uppercase tracking-wide text-sm text-gray-500">
              {subtitle}
            </p>
          )}
          <h2 className="text-3xl md:text-4xl font-bold text-green-900">
            {title}
          </h2>
          <p
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          {highlight && (
            <p className="italic text-gray-800">{highlight}</p>
          )}
          <Link to={`/product/${productId}`}
           className="border border-yellow-600 text-yellow-700 px-6 py-3 w-fit hover:shadow-lg transition">
            {buttonText}
          </Link>
        </div>

        {/* IMAGE */}
        <div className="w-full h-full">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
