import React, { useRef, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

import ServiceHeroBanner from "../Components/services/ServiceHeroBanner";
import WebDevelopment from "../Components/services/WebDevelopment";
import ServicesCards from "../Components/services/ServicesCards";
import WhyNeedBranding from "../Components/services/WhyNeedBranding";
import WhyAtrix from "../Components/services/whyAtrix";
import ProcessCards from "../Components/ProcessCards";
import ServiceFrom from "../Components/services/ServiceFrom";
import OurPortfolio from "../Components/OurPortfolio";
import FaqSection from "../Components/FaqSection";
import Button from "../Components/Button";

import img1 from "../assets/ServicesImage/Logistics.png"
import ServicesData from "../data/ServicesData";
import "./Service.css";

const Service = () => {
  const { service_id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef(null);

  // Find the matched service
  const filteredService = ServicesData.find((item) => item.slug === service_id);

  // Redirect to 404 if ID is invalid
  useEffect(() => {
    if (!service_id || service_id === "undefined" || !filteredService) {
      navigate("/page-not-found", { replace: true });
    }
  }, [location.pathname]);

  // Don't render if invalid (avoid flicker)
  if (!filteredService) return null;

  return (
    <>
      <style>
        {`
          #mybtn2 button:hover {
            background-color: white;
            color: var(--blue);
          }
        
        `}
      </style>

      <div className="pt-[150px]">
        <ServiceHeroBanner />

        <div className=" container  mx-auto md:mt-40 mt-10  " >
          <h1 className="medium-heading  font-bold text-center">{filteredService.service_title}</h1>
        </div>

        <WebDevelopment secData={filteredService} targetRef={formRef} />
        <ServicesCards secData={filteredService} />
        <WhyNeedBranding secData={filteredService} targetRef={formRef} />

        <div className="img-se">
          <img className="w-full" src={img1} alt="" />
        </div>


        <WhyAtrix secData={filteredService} />
        <ProcessCards secData={filteredService} targetRef={formRef} />

        <div className="container mx-auto my-16">
          <h2 className="max-w-[800px] mx-auto text-2xl md:text-3xl lg:text-5xl font-bold relative">
            <FaQuoteLeft className="absolute -top-0.5 -translate-y-full text-(--blue) text-2xl mb-8" />
            {filteredService.quote}
            <FaQuoteRight className="absolute right-0 text-(--blue) text-2xl mt-2" />
          </h2>
        </div>

        {/* CTA Section */}
        <div className="container  mx-auto mt-28 service-cta">
          <div className="row grid grid-cols-1 md:grid-cols-12 mt-10 bg-(--blue) rounded-xl p-6 md:p-10">
            <div className="lg:col-span-10 col-span-12 text-center md:text-left">
              <h2 className="sec-heading font-bold">
                Ready to take your brand to the next level?
              </h2>
              <p className="mt-1 max-w-[800px]">
                We’re here to help you create an identity that’s powerful and memorable. Let’s work together to make your brand stand out. Get in touch today, and let’s bring your vision to life!
              </p>
            </div>
            <div
              id="mybtn2"
              className="lg:col-span-2 col-span-12 flex justify-center items-center lg:justify-end mt-4 lg:mt-0"
            >
              <Button mybtn="Contact us!" targetRef={formRef} />
            </div>
          </div>
        </div>

        {/* Scroll target form */}
        <div ref={formRef}>
          <ServiceFrom />
        </div>

        <OurPortfolio />
        <FaqSection secData={filteredService} />
      </div>
    </>
  );
};

export default Service;
