// for home page alternating info secs
import React from "react";
import {Link} from "react-router-dom"

const InfoSection = ({ title, text, buttonText, image, reverse }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-12 px-6 md:px-16 md:mx-26">
      {/* Image Section */}
      <div className={`relative ${reverse ? "md:order-2" : ""}`}>
        <div className="relative">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="rounded-2xl shadow-md w-full h-auto object-cover"
          />
          {/* <div className="absolute -top-4 -left-4 w-2 h-full bg-green-900 rounded-lg"></div> */}
        </div>
      </div>

      {/* Text Section */}
      <div className={`${reverse ? "md:order-1" : ""}`}>
        <h2 className="text-3xl font-bold text-green-900 mb-4">{title}</h2>
        <p className="text-gray-700 mb-6 leading-relaxed">{text}</p>
        {buttonText && (
          <Link to="/products" className="buttons-bg text-green-900 px-6 py-2 font-medium shadow hover:shadow-lg transition">
            {buttonText}
          </Link>
        )}
      </div>
    </div>
  );
};

export default InfoSection;
