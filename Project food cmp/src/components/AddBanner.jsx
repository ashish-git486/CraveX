import React, { useState, useEffect } from "react";

const images = [
  "https://b.zmtcdn.com/data/o2_assets/e067a1cf0d3fe27b366402b98b994e9f1716296909.png",
  "https://b.zmtcdn.com/data/o2_assets/85e14f93411a6b584888b6f3de3daf081716296829.png",
  "https://b.zmtcdn.com/data/o2_assets/e067a1cf0d3fe27b366402b98b994e9f1716296909.png",
];

export default function Add() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <div className="flex flex-col justify-center w-full h-auto ">
      {/* Image */}
      <img
        src={images[current]}
        alt={`Slide ${current}`}
        className=" w-full max-h-90 object-auto rounded-xl shadow-lg transition-all duration-700"
      />
    
      {/* Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full ${
              current === index ? "bg-orange-500 scale-110" : "bg-gray-300"
            } transition-all duration-300`}
          />
        ))}
      </div>
    </div>
  );
}

