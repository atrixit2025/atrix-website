import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { RxArrowTopRight } from "react-icons/rx";
import "./CTASection.css"; // Custom styles
import LinkButton from "./LinkButton";

const CTASection = () => {
  useEffect(() => {
    const cta = document.querySelector(".cta-animated-block");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cta.classList.add("cta-animate-in");
          observer.unobserve(cta);
        }
      },
      { threshold: 0.3 }
    );

    if (cta) observer.observe(cta);
  }, []);

  return (
    <div className="container  mx-auto mt-14 md:mt-28">
      <div className="grid grid-cols-1 md:grid-cols-12 mt-10 bg-(--blue) rounded-xl p-6 md:p-10 cta-animated-block">
        {/* Text Section */}
        <div className="md:col-span-10 col-span-12 text-center md:text-left">
          <h3 className="text-white sub-sec-heading">
            Say Goodbye to IT Hassles – Get Expert Solutions Now!
          </h3>
        </div>

        {/* Button Section */}
        <div className="md:col-span-2 col-span-12 flex justify-center items-center md:justify-end mt-4 md:mt-0">
          <LinkButton mybtn={"Contact us!"} btnLink={"/contact-us"}>
            Contact us!
          </LinkButton>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
