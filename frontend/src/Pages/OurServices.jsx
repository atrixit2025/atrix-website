import React from "react";
import img1 from "../assets/ServicesImage/DTS_Daniel.jpg";
import img2 from ".././assets/ServicesImage/web-development.webp";
import img3 from "../assets/ServicesImage/web-development2.webp";
import OurServiceCard from "../Components/services/OurServiceCard";
import OurServicesDiscovery from "../Components/services/OurServicesDiscovery";
import OurServicesCase from "../Components/services/OurServicesCase";
import OurServicesTestimonial from "../Components/services/OurServicesTestimonial";
import Button from "../Components/Button";
import img4 from "../assets/ServicesImage/chess.webp";
import imgleft from "../assets/ServicesImage/design-hero-left.jpeg";
import imgright from "../assets/ServicesImage/design-hero-right.jpeg";

import "./ourServices.css";

const OurServices = () => {
  return (
    <>
      <div className="services-hero relative  bg-black/60 pt-55 pb-20  ">
        <div className="services-hero-text container mx-auto ">
          <h1 className="text-9xl font-[900]">
            WEBSITE <br />
            DESIGN AND <br />
            DEVELOPMENT
          </h1>
        

        <div className="hero-img-sec absolute h-[100%] top-0 right-0 w-[50%] overflow-hidden z-1 ">
          <div className="img-left overflow-hidden ">
            <img className="absolute left-0 top-0" src={imgleft} alt="" />
          </div>
         
        </div>

        <div className=" hero-img-sec2 absolute h-[90%] top-0 right-0 w-[50%] overflow-hidden -z-1 ">
        <div className="img-right overflow-hidden ">
            <img className="absolute right-0 top-0 " src={imgright} alt="" />
          </div>
      
        </div>


        </div>
      </div>

      <div className="Brand-Experience container flex  justify-between  mx-auto mt-22">
        <h2 className="w-3xl text-4xl  ">
          Web Development Creates a Digital Home That Sets the Foundation to
          Transform Your Brand Experience.
        </h2>
        <div className="Brand-Experience-img">
          <img src={img1} alt="" />
        </div>
      </div>

      <div className="web-development container mx-auto">
        <div className="web-development-img flex gap-3 ">
          <div className="img mt-30 w-[50%]">
            <img className="w-full h-full" src={img2} alt="" />
          </div>
          <div className="img-2 mb-30 w-[50%]">
            <img className="w-full h-full " src={img3} alt="" />
          </div>
          <div className="web-development-text w-4xl text-xl flex items-end bottom-0 pl-20">
            <h5>
              Your website is representative of everything your brand stands
              for—a beacon for your digital presence that everyone will refer
              to. That’s a tall order, which is why we ground ourselves in
              understanding who you are before we tackle web development.
            </h5>
          </div>
        </div>
      </div>

      <div className=" pt-55 pb-4 ">
        <div className="services-hero-text container mx-auto ">
          <h1 className="text-9xl font-[900]">
            WHY DO I NEED A <br /> NEW WEBSITE?
          </h1>
        </div>
      </div>
      <OurServiceCard />

      <OurServicesDiscovery />

      <OurServicesCase />

      <OurServicesTestimonial />

      <div className="container mx-auto my-15 ">
        <div className="row-span-12 flex justify-around p-15 bg-white/95 rounded-2xl  ">
          <div className="col-span-6 flex justify-center items-center">
            <div className="img-sec  w-[50%]">
              <img src={img4} alt="" />
            </div>
          </div>

          <div className="col-span-6 flex justify-start items-center text-center">
            <div className="brand-text-sec  text-black  ">
              <h2 className="text-6xl font-[900]">
                READY TO ELEVATE <br /> YOUR BRAND?
              </h2>
              <p className="pt-6 text-lg ">
                Let’s connect so we can understand your business objectives and
                craft a plan to exceed them.
              </p>
              <div className="btn  flex justify-center items-center mt-10">
                <Button mybtn={"LET'S TALK"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurServices;
