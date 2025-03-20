import { useState, useEffect } from "react";
import React from "react";

const slides = [
  { text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", clintName: "Hello 1", companyName:"Aptix" },
  { text: "sdgsdgsd, jnvkusdvyhsdvnsdk;hivgr", clintName: "Hello 2", companyName:"Aptix" },
  { text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.", clintName: "Hello 3", companyName:"Aptix" },
  { text: "Lorem, ipsum dolor sit amoremque.", clintName: "Hello 4", companyName:"Aptix" },
  { text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.", clintName: "Hello 5", companyName:"Aptix" },
];

const MultiItemCarousel = () => {
  const [index, setIndex] = useState(0);
  const itemsPerSlide = 3;

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [index]);

  const nextSlide = () => {
    setIndex((prev) => prev + 1);
  };

  return (
    <div className="relative max-w-[1400px] mx-auto text-center my-6  ">
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${(index % slides.length) * (100 / itemsPerSlide)}%)`,
          }}
        >
          {[...slides, ...slides].map((slide, i) => (

            <div key={i} className="w-1/3 px-2 shrink-0">
              <div className="bg-[rgb(68,67,67)] shadow-md rounded-lg p-5 min-w-[300px] flex flex-col justify-between items-start relative min-h-[500px] ">

                
                <p className="text-white text-lg font-semibold px-5 pt-25 w-full">{slide.text}</p>
               
               

                <p className="absolute bottom-16 px-5 text-sm text-white">{slide.clintName}</p>

                <p className="absolute bottom-10 px-5 text-sm text-white">{slide.companyName}</p>

              </div>
            </div>
          ))}
        </div>
      </div>



      {/* Navigation Buttons */}
      <button
        onClick={() => setIndex((prev) => prev - 1)}
        className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-4 rounded-full shadow-lg hover:bg-gray-600 transition"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-[-50px] top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-4 rounded-full shadow-lg hover:bg-gray-600 transition"
      >
        &#10095;
      </button>
    </div>
  );
};

export default MultiItemCarousel;
