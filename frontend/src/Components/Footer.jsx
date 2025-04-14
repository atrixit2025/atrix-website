import React from "react";
import logo from "../assets/ais-logo-3.png";
import Button from "./Button";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import Atrix_img from "../assets/footer/Asset 24.svg";

const ourServices = [
  { service_name: "Home", url: "/" },
  { service_name: "About US", url: "/about" },
  { service_name: "Services", url: "/service" },
  { service_name: "Our Portfolio", url: "/portfolio" },
  { service_name: "Career", url: "/careers" },
  { service_name: "Our Blog", url: "/blog" },
  { service_name: "FAQ", url: "/faqs" },
  { service_name: "Contact Us", url: "/contact-us" },
];

const cardsContent = [
  {
    link: "#",
    btn_name: "Facebook",
  },
  {
    link: "mailto:info@atrixitsolutions.com",
    btn_name: "Instagram",
  },
  {
    link: "#",
    btn_name: "Behance",
  },
  {
    btn_name: "Twitter",
  },
  {
    btn_name: "Linked In",
  },
];

const Footer = () => {
  return (
    <footer className="bg-cs_theme_black">
      <div className="max-w-[90%] mx-auto py-14 md:py-28 ">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between border-t border-gray-700 pt-10 ">
          {/* Logo Column */}
          <div className=" w-[200px] flex flex-col gap-5">
            <div className="img-sec">
              <img
                src={logo}
                alt="Atrix IT Solutions Logo"
                className="h-full"
              />
            </div>
          </div>

          {/* Contact Info Column */}
          <div className="md:w-1/4 flex flex-col gap-1">
            <h4 className="text-blue-400 font-bold text-lg">Email</h4>
            <p className="break-words">info@atrixitsolutions.com</p>

            <h4 className="text-blue-400 font-bold text-lg mt-4">Address</h4>
            <p className="uppercase">
              D-179 Phase, 8B, Phase 8B, Industrial Area, Sector 74, S.A.S
              Nagar, Punjab 140501
            </p>
          </div>

          {/* Navigation Links Column */}
          <div className="md:w-[250px]">
            <ul className="grid grid-cols-2 gap-4 ">
              {ourServices.map((item, index) => (
                <li
                  key={index}
                  className="hover:text-blue-400 transition-colors hover:font-extrabold  "
                >
                  <Link to={item.url}>{item.service_name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Column */}
          <div className="md:w-1/4 flex flex-col  gap-4">
            <h2 className="text-xl md:text-6xl font-bold">
              Ready to Elevate Your Brand?
            </h2>
            <div className="mt-2  ">
              <Button mybtn="Lets' Talk" btnLink="/contact-us" />
            </div>
          </div>
        </div>

        <div className="row max-w-[70%] mx-auto mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-1 pb-5">
            {cardsContent.map((item, index) => (
              <div className="link-div flex">
                <Link key={index} to={item.link} className=" ">
                  <div className="titel cursor-pointer hover:text-blue-500  group font-bold flex items-center justify-center   self-start ">
                    {item.btn_name}

                    <span className="border border-gray-400 ml-2 flex justify-center items-center h-6 w-6 rounded-full -rotate-45 group-hover:rotate-1 group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500 duration-300">
                      <FaArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="row  mx-auto border-t-1 border-gray-700 py-20  ">
          <img src={Atrix_img} alt="" />
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700  pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            © Copyright 2025 Atrix IT Solutions | All Right Reserved.
          </p>

          <ul className="flex flex-wrap gap-4 text-sm">
            <li>
              <Link to="#" className="hover:text-blue-400 transition-colors">
                Support Policy
              </Link>
            </li>
            <li className="border-l border-gray-500 pl-4">
              <Link
                to="terms-and-conditions"
                className="hover:text-blue-400 transition-colors"
              >
                Terms & Conditions
              </Link>
            </li>
            <li className="border-l border-gray-500 pl-4">
              <Link
                to="/privacy-policy"
                className="hover:text-blue-400 transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
