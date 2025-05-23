import React, { useState } from "react";
// import Button from './Button'

const ProcessCards = ({ secData, targetRef }) => {
  const [activeCard, setActiveCard] = useState(0);

  return (
    <section className="process-cards-section my-36 relative z-0">
      <div className="container mx-auto">
        <h2 className="sec-heading text-center my-10">
          Our {secData.service_title} Process
        </h2>

        <div className="process-cards-wrapper flex flex-wrap gap-5 justify-center">
          {secData.process_cards.map((item, index) => {
            const isActive = activeCard === index;

            return (
              <div
                key={index}
                onClick={() => setActiveCard(index)}
                className={`relative cursor-pointer p-10 rounded-2xl bg-[var(--black)] text-white transition-all duration-500 overflow-hidden ease-in-out flex-grow
                  ${
                    isActive
                      ? "flex-grow-[2] max-w-[500px]"
                      : "flex-grow-[1] max-w-[100px]"
                  }`}
                style={{
                  minHeight: isActive ? "280px" : "400px",
                }}
              >
                {/* Background Number - Always visible */}
                <span
                  className={`absolute font-bold text-white pointer-events-none z-0 select-none leading-none transition-all duration-500
                    ${
                      isActive
                        ? "opacity-2 -bottom-10 -right-1 text-[100px] md:text-[140px]"
                        : "opacity-1 top-2 right-2 text-[40px] md:text-[60px]"
                    }`}
                >
                  0{index + 1}
                </span>

                {/* Title */}
                <div className="relative z-10 h-auto">
                  {isActive ? (
                    <h3 className="text-3xl font-bold mb-1 mt-2">
                      Hello World
                    </h3>
                  ) : (
                    <h3 className="absolute -bottom-85 left-6 right-20 transform -rotate-90 origin-bottom-left text-xl font-extrabold w-[350px] uppercase">
                      {item.title}
                    </h3>
                  )}
                </div>

                {/* Description */}
                <p
                  className={`relative z-10 pt-2 transition-all duration-500 ${
                    isActive
                      ? "text-[16px] opacity-100 mt-2"
                      : "text-[0px] opacity-0 h-0"
                  }`}
                  style={{ lineHeight: isActive ? "1.5" : "0" }}
                >
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-14 flex justify-center">
          {/* <Button mybtn="Get Your Quote Now" targetRef={targetRef} /> */}
        </div>
      </div>
    </section>
  );
};

export default ProcessCards;
