import { useState, useEffect } from "react";
import React from "react";

const cards = [
  { id: 1, title: "Card 1" },
  { id: 2, title: "Card 2" },
  { id: 3, title: "Card 3" },
  { id: 4, title: "Card 4" },
  { id: 5, title: "Card 5" },
  { id: 6, title: "Card 6" },
];

const CardCarousel = () => {
  const [index, setIndex] = useState(1); // Start from second card
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return; // Prevent multiple clicks
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500); // Lock animation for 500ms

    setIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);

    setIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto p-4 overflow-hidden">
      {/* Carousel Container */}
      <div className="flex justify-center items-center space-x-4 transition-transform duration-500 ease-in-out transform">
        {[
          cards[(index - 1 + cards.length) % cards.length], // Previous Card
          cards[index], // Center Card
          cards[(index + 1) % cards.length], // Next Card
        ].map((card, i) => {
          const isCenter = i === 1; // Middle Card
          return (
            <div
              key={card.id}
              className={`transition-all duration-500 ease-in-out flex items-center justify-center bg-blue-500 text-white font-bold rounded-lg ${
                isCenter
                  ? "w-64 h-48 text-xl scale-110 shadow-lg"
                  : "w-48 h-36 text-lg opacity-75 scale-90"
              }`}
            >
              {card.title}
            </div>
          );
        })}
      </div>

      {/* Left Button */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-700 text-white px-3 py-2 rounded-full shadow-md hover:bg-gray-900 transition duration-300"
      >
        ◀
      </button>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-700 text-white px-3 py-2 rounded-full shadow-md hover:bg-gray-900 transition duration-300"
      >
        ▶
      </button>
    </div>
  );
};

export default CardCarousel;
