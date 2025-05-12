import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import OurServiceCard from "../Components/services/OurServiceCard";
import Button from "../Components/Button";
import img5 from "../assets/ServicesImage/chess_1.png";
import "./ourServices.css";
import LinkButton from "../Components/LinkButton";

const OurServices = () => {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration (in ms)
      once: true, // Animation happens once
    });
  }, []);

  return (
    <>

      <div className="services-hero relative h-full w-full z-0  pt-55 pb-20  ">
        <div className="services-hero-text  container mx-auto  ">
          <h1 className="medium-heading break-words  ">

            WEBSITE <br />
            DESIGN AND <br />
            DEVELOPMENT
          </h1>
        </div>
      </div>


      <OurServiceCard />

      {/* HOW WE DO IT */}
      <div className="container mx-auto mt-16 leading-0 w-[90%]" data-aos="fade-up">
        <h2 className="text-4xl md:text-8xl font-bold text-center py-15">
          HOW WE DO IT
        </h2>
        <div className="grid grid-cols-12 md:gap-9 space-y-5">
          <div
            className="col-span-12 md:col-span-4 border-t-1 border-white/20"
            data-aos="fade-right"
          >
            <h3 className="text-2xl md:text-3xl font-extrabold pt-10 break-words">

              START WITH <br />
              UNDERSTANDING
            </h3>
            <p className="text-lg pt-3">
              Every partnership begins with an ask. But our magic is in the
              understanding, finding the root of what needs to be solved—your
              Pivotal Problem...
            </p>
          </div>


          <div
            className="col-span-12 md:col-span-4 border-t-1 border-white/20"
            data-aos="fade-up"
          >
            <h3 className="text-2xl md:text-3xl font-extrabold pt-10 break-words">

              CRAFT <br />
              FOR IMPACT
            </h3>
            <p className="text-lg pt-3">
              With our focus clear, we build a strategic framework for brand
              positioning...
            </p>
          </div>


          <div
            className="col-span-12 md:col-span-4 border-t-1 border-white/20"
            data-aos="fade-left"
          >
            <h3 className="text-2xl md:text-3xl font-extrabold pt-10 break-words">

              ACCELERATE FOR <br />
              GROWTH
            </h3>
            <p className="text-lg pt-3">
              We never set it and forget it. We constantly monitor our
              ecosystem, analyze performance...
            </p>
          </div>
        </div>
      </div>

      {/* CTA SECTION */}

      <div
        className="container mx-auto mt-35 mb-11 w-[90%]"
        data-aos="zoom-in-up"
      >
        <div className="grid grid-cols-12 p-15 bg-[#262626] rounded-2xl">
          <div className="col-span-12 md:col-span-6 flex justify-start items-center">
            <div className="brand-text-sec">

              <h2 className="sec-heading font-[900]">
                READY TO ELEVATE <br /> YOUR BRAND?
              </h2>
              <p className="pt-6 text-lg">
                Let’s connect so we can understand your business objectives...
              </p>
              <div className="btn mt-10 flex">
                <LinkButton mybtn={"LET'S TALK"} btnLink="/contact-us" />
              </div>
            </div>
          </div>

          <div className="hidden md:col-span-6 md:flex justify-center items-center">
            <div className="img-sec w-[50%]">
              <img src={img5} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurServices;
