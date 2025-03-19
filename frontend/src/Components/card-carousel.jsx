import { useState, useEffect } from "react";
import React from "react";

const images = [
  "https://placehold.co/380x200?text=1",
  "https://placehold.co/380x200?text=2",
  "https://placehold.co/380x200?text=3",
  "https://placehold.co/380x200?text=4",
  "https://placehold.co/380x200?text=5",
  "https://placehold.co/380x200?text=6",
];

const MultiItemCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemsPerSlide = 3;
  const totalItems = images.length;

  // Infinite loop effect
  const infiniteImages = [...images, ...images.slice(0, itemsPerSlide)];

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === totalItems - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? totalItems - 1 : prev - 1));
  };

  return (
    <div className="relative max-w-5xl mx-auto text-center my-6">
      <h2 className="text-2xl font-light mb-4">Multi-Item Carousel</h2>

      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${activeIndex * (100 / itemsPerSlide)}%)`,
          }}
        >
          {infiniteImages.map((img, index) => {
            const position = index - activeIndex;
            let scaleClass = "scale-90 opacity-70"; // Default small size

            if (position === 0) {
              scaleClass = "scale-110 shadow-xl"; // Center card
            }

            return (
              <div
                key={index}
                className={`w-1/3 px-2 shrink-0 sm:w-1/2 md:w-1/3 transition-transform duration-500 ${scaleClass}`}
              >
                <div className="bg-red-400 shadow-md rounded-lg p-3 h-[250px] flex items-center justify-center">
                  <img src={img} alt={`Slide ${index + 1}`} className="w-full rounded h-full object-cover" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-4 rounded-full shadow-lg z-10 hover:bg-gray-600 transition"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-4 rounded-full shadow-lg z-10 hover:bg-gray-600 transition"
      >
        &#10095;
      </button>
    </div>
  );
};

export default MultiItemCarousel;
