import React from "react";
import OurServiceCard from "../Components/services/OurServiceCard";
import Button from "../Components/Button";
import img5 from "../assets/ServicesImage/chess_1.png";
import "./ourServices.css";

const OurServices = () => {
  return (
    <>
      <div className="services-hero relative h-full w-full z-0  pt-55 pb-20  ">
        <div className="services-hero-text  container mx-auto ">
          <h1 className="text-9xl font-[900]  ">
            WEBSITE <br />
            DESIGN AND <br />
            DEVELOPMENT 
          </h1>
        </div>
      </div>

      <div className="Brand-Experience container flex  justify-between  mx-auto mt-22">
        <h2 className=" text-2xl  ">
          Crafted by our team of experts and powered by cutting-edge AI
          technology, our services deliver measurable, impactful results that
          drive growth and elevate your business.
        </h2>
      </div>

      <OurServiceCard />

      {/* HOW WE DO IT */}

      <div className="container mx-auto mt-25 leading-0 ">
        <h3 className="text-8xl text-center font-extrabold py-15 "> HOW WE DO IT</h3>
        <div className="row-span-12 flex gap-9 ">
          <div className="col-span-4 border-t-1 border-white/20 w-[33.3%] ">
            <h2 className="text-5xl font-extrabold  pt-10">
              START WITH <br />
              UNDERSTANDING
            </h2>
            <p className="text-lg  pt-3 ">
              Every partnership begins with an ask. But our magic is in the
              understanding, finding the root of what needs to be solved—your
              Pivotal Problem. Pivotal Problems are the inflection point—the
              main challenge that’s impeding your progress. While not uncommon,
              they are unique to your business. Then we move with purpose
              towards elevation and meaningful opportunity.
            </p>
          </div>

          <div className="col-span-4 border-t-1 border-white/20 w-[33.3%] ">
            <h2 className="text-5xl font-extrabold  pt-10">
              CRAFT <br />
              FOR IMPACT
            </h2>
            <p className="text-lg  pt-3 ">
              With our focus clear, we build a strategic framework for brand
              positioning and messaging at the core. From there, we craft
              impactful, audience-aligned solutions designed to resonate and
              drive results.
            </p>
          </div>

          <div className="col-span-4 border-t-1 border-white/20 w-[33.3%] ">
            <h2 className="text-5xl font-extrabold  pt-10">
              ACCELERATE FOR <br />
              GROWTHG
            </h2>
            <p className="text-lg   pt-3 ">
              We never set it and forget it. We constantly monitor our
              ecosystem, analyze performance, optimize, and refine strategies
              for continuous improvement and scalability.
            </p>
          </div>
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="container mx-auto mt-35 mb-11 ">
        <div className="row-span-12 flex justify-around p-15 bg-[#262626] rounded-2xl  ">
          <div className="col-span-6 flex justify-start items-center ">
            <div className="brand-text-sec   ">
              <h2 className="text-6xl font-[900]">
                READY TO ELEVATE <br /> YOUR BRAND?
              </h2>
              <p className="pt-6 text-lg ">
                Let’s connect so we can understand your business objectives and
                craft a plan to exceed them.
              </p>
              <div className="btn   mt-10">
                <Button mybtn={"LET'S TALK"} />
              </div>
            </div>
          </div>

          <div className="col-span-6 flex justify-center items-center">
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
