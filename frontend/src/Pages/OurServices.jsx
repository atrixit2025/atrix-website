import React from "react";
import OurServiceCard from "../Components/services/OurServiceCard";
import Button from "../Components/Button";
import img5 from "../assets/ServicesImage/chess_1.png";
import "./ourServices.css";
import LinkButton from "../Components/LinkButton";

const OurServices = () => {
  return (
    <>
      <div className="services-hero relative h-full w-full z-0  pt-55 pb-20  ">
        <div className="services-hero-text  container mx-auto w-[90%] ">
          <h1 className="medium-heading break-words  ">
            WEBSITE <br />
            DESIGN AND <br />
            DEVELOPMENT 
          </h1>
        </div>
      </div>

      {/* <div className="Brand-Experience container flex  justify-between  mx-auto mt-22">
        <div className="container mx-auto w-[90%]">
        <h4 className=" text-2xl  ">
          Crafted by our team of experts and powered by cutting-edge AI
          technology, our services deliver measurable, impactful results that
          drive growth and elevate your business.
        </h4>
        </div>

      </div> */}

      <OurServiceCard />

      {/* HOW WE DO IT */}


      <div className="container mx-auto mt-16 leading-0 w-[90%] ">
        <h2 className=" text-4xl md:text-8xl font-bold text-center  py-15 "> HOW WE DO IT</h2>
        <div className=" grid  grid-cols-12  md:gap-9 space-y-5 ">
          <div className="col-span-12 md:col-span-4 border-t-1 border-white/20  ">
            <h3 className=" text-2xl  md:text-3xl font-extrabold  pt-10 break-words">
              START WITH <br />
              UNDERSTANDING
            </h3>
            <p className="text-lg  pt-3 ">
              Every partnership begins with an ask. But our magic is in the
              understanding, finding the root of what needs to be solved—your
              Pivotal Problem. Pivotal Problems are the inflection point—the
              main challenge that’s impeding your progress. While not uncommon,
              they are unique to your business. Then we move with purpose
              towards elevation and meaningful opportunity.
            </p>
          </div>

          <div className="col-span-12 md:col-span-4 border-t-1 border-white/20  ">
            <h3 className="text-2xl  md:text-3xl font-extrabold  pt-10 break-words">
              CRAFT <br />
              FOR IMPACT
            </h3>
            <p className="text-lg  pt-3 ">
              With our focus clear, we build a strategic framework for brand
              positioning and messaging at the core. From there, we craft
              impactful, audience-aligned solutions designed to resonate and
              drive results.
            </p>
          </div>

          <div className="col-span-12 md:col-span-4 border-t-1 border-white/20  ">
            <h3 className="text-2xl  md:text-3xl font-extrabold  pt-10 break-words">
              ACCELERATE FOR <br />
              GROWTHG
            </h3>
            <p className="text-lg   pt-3 ">
              We never set it and forget it. We constantly monitor our
              ecosystem, analyze performance, optimize, and refine strategies
              for continuous improvement and scalability.
            </p>
          </div>
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="container mx-auto mt-35 mb-11 w-[90%] ">
        <div className="grid grid-cols-12  p-15 bg-[#262626] rounded-2xl  ">
          <div className="col-span-12 md:col-span-6 flex justify-start items-center ">
            <div className="brand-text-sec   ">
              <h2 className="sec-heading font-[900]">
                READY TO ELEVATE <br /> YOUR BRAND?
              </h2>
              <p className="pt-6 text-lg ">
                Let’s connect so we can understand your business objectives and
                craft a plan to exceed them.
              </p>
              <div className="btn   mt-10 flex ">
                {/* <Button mybtn={"LET'S TALK"} /> */}
                <LinkButton mybtn={"LET'S TALK"} btnLink="/contact-us"></LinkButton>
              </div>
            </div>
          </div>

          <div className="hidden md:col-span-6 md:flex justify-center items-center">
            <div className="img-sec  w-[50%]">
              <img src={img5} alt="" />
            </div>
          </div>
        </div>
      </div>

      {/* <OurPortfolio /> */}
    </>
  );
};

export default OurServices;
