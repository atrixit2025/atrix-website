import React from "react";
import logo from "../assets/ais-logo-3.png";
import Button from "./Button";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import Atrix_img from "../assets/footer/Asset 24.svg";

const ourServices = [
  { service_name: "Home", url: "/" },
  { service_name: "About Us", url: "/about" },
  { service_name: "Services", url: "/services" },
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
    link: "https://www.instagram.com/atrixit.solutions/",
    btn_name: "Instagram",
  },
  {
    link: "https://www.behance.net/atrixit",
    btn_name: "Behance",
  },
  {
    link: "https://x.com/AtrixIT_S",
    btn_name: "Twitter",
  },
  {
    link: "https://www.linkedin.com/company/atrixitsolutions/",
    btn_name: "Linked In",
  },
];

const Footer = () => {
  return (
    <footer className="bg-cs_theme_black">
      <div className=" container  mx-auto  mt-18 pb-9  ">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between border-t border-gray-700  py-8 md:py-18 ">
          {/* Logo Column */}
          <div className=" w-[200px] flex flex-col gap-5">
            <div className="img-sec">
              <img
                src={logo}
                alt="Atrix IT Solutions Logo"
                className=""
              />
            </div>
          </div>

          {/* Contact Info Column */}
          <div className="md:w-[280px] flex flex-col gap-1">
            <h4 className="text-(--blue) font-bold text-lg">Email</h4>
            <p className="break-words">info@atrixitsolutions.com</p>

            <h4 className="text-(--blue) font-bold text-lg mt-4">Address</h4>
            <p className="uppercase">
              D-179 Phase, 8B, Phase 8B, Industrial Area, Sector 74, S.A.S
              Nagar, Punjab 140501
            </p>
          </div>

          {/* Navigation Links Column */}
          <div className="md:w-[250px] my-8 md:my-0 ">
            <ul className="grid grid-cols-2 gap-4 ">
              {ourServices.map((item, index) => (
                <li
                  key={index}
                  className="hover:text-(--blue) transition-colors hover:font-extrabold  "
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
              <Link to={'/contact-us'} > <Button mybtn="Lets' Talk" btnLink="/contact-us" /></Link>
             
            </div>
          </div>
        </div>

        <div className="">
          <div className="flex flex-wrap md:justify-center justify-start gap-4 md:gap-16 pb-10">
            {cardsContent.map((item, index) => (
              <div key={index} className="link-div flex">
                <Link key={index} to={item.link} className=" " target="_blank" >
                  <div className="titel cursor-pointer hover:text-(--blue)  group font-bold flex items-center justify-center   self-start ">
                    {item.btn_name}

                    <span className="border border-gray-400 ml-2 flex justify-center items-center h-6 w-6 rounded-full -rotate-45 group-hover:rotate-1 group-hover:bg-(--blue) group-hover:text-white group-hover:border-(--blue) duration-300">
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
        <div className="border-t border-gray-700  pt-8 flex flex-col-reverse  md:flex-row justify-between items-center gap-4 ">
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
