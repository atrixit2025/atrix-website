import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import Button from "../Button";
import ServicesData from "../../data/ServicesData";
import Asset1 from "../../assets/ServicesIcons/Asset 2.svg";
import AOS from "aos"; // Import AOS
import "aos/dist/aos.css"; // Import AOS styles

const OurServiceCard = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <>
      <div className="container mx-auto ">
        <div className="columns-1  md:columns-2 xl:columns-3 gap-20 mt-12">
          {ServicesData.map((item, index) => (
            <div 
              key={index} 
              className="pt-18 inline-block w-full"
              data-aos="fade-up" // Add fade-up animation when the item appears
            >
              <Link to={`/service/${item.slug}`} className="cursor-pointer">
                <h3 className="sub-sec-heading font-bold flex items-center gap-2">
                  <div 
                    className="icon-bg min-w-12 h-12 relative flex justify-center items-center bg-gradient-to-r from-(--blue) to-(--green) rounded-full translate-y-2 mr-1 mb-3"
                    data-aos="zoom-in" // Zoom-in effect for the icon
                  >
                    <img
                      className="w-6 h-6 filter grayscale-100 brightness-800"
                      src={item.icon}
                      alt=""
                    />{" "}
                  </div>
                  {item.service_title}
                </h3>
              </Link>
              <ul className="mt-2 text-lg">
                {item.tags.map((tagItem, tagindex) => (
                  <li
                    key={tagindex}
                    className="flex items-center justify-between border-b-2 border-white/15 hover:border-(--green) pb-4 pt-4 group cursor-pointer hover:scale-102 duration-350"
                    data-aos="fade-left" // Add fade-left animation for the list items
                  >
                    <Link
                      to={`/service/${item.slug}`}
                      className="flex items-center justify-between w-full group-hover:text-(--green) font-bold"
                    >
                      <span>{tagItem}</span>
                      <AiOutlineArrowRight className="text-gray-500 text-2xl group-hover:text-(--green) -rotate-45 group-hover:rotate-2 transform duration-300 group" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div> 
    </>
  );
};

export default OurServiceCard;