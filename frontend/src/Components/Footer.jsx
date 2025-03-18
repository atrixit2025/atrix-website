import React from "react";
import logo from "../assets/ais-logo-3.png";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import Button from "./Button";


const ourServices = [
    { service_name: "3D Animation", url: "#" },
    { service_name: "CRM Development", url: "#" },
    { service_name: "Web Development", url: "#" },
    { service_name: "MLM Software", url: "#" },
    { service_name: "Graphic Designing", url: "#" },
    { service_name: "Metaverse Development", url: "#" },
    { service_name: "Digital Marketing", url: "#" },
    { service_name: "App Development", url: "#" },
    { service_name: "UI/UX Design & Development", url: "#" },
    { service_name: "Salesforce Development", url: "#" },
    { service_name: "AI Development", url: "#" },
    { service_name: "Software Development", url: "#" },
    { service_name: "IoT Development", url: "#" },
    { service_name: "Hire Developers", url: "#" },
    { service_name: "SAP Business One", url: "#" },
    { service_name: "AEM Development", url: "#" },
    { service_name: "Unity 3D Game Development", url: "#" },
]
const quickLinks = [
    { link_name: "Home", url: "#" },
    { link_name: "About", url: "#" },
    { link_name: "Our Blog", url: "#" },
    { link_name: "Our Portfolio", url: "#" },
    { link_name: "FAQ", url: "#" },
    { link_name: "Career", url: "#" },
    { link_name: "Contact Us", url: "#" },
]




const Footer = () => {
    return (
        <footer className="bg-cs_theme_black">
            <div className=" max-w-[90%] mx-auto flex flex-wrap md:pt-28 pt-14 md:pb-24 pb-10 ">
                <div className=" md:w-1/4 md:pr-16 ">
                    <div className=" h-16 md:h-32 w-auto md:m-0  flex ">

                        <img src={logo} alt="" />
                    </div>
                    <h4 className=" text-(--blue) mt-5 font-bold text-lg">Address</h4>
                    <p className="  uppercase" > PLOT C – 203 , PHASE – 8 B, MOHALI, MOHALI, SAS Nagar , 26-Punjab, 91-INDIA, 160070</p>


                    <h4 className="  text-(--blue) mt-5 font-bold text-lg">Email</h4>
                    <p className="break-words">info@atrixitsolutions.com</p>

                    <h4 className=" text-(--blue) mt-5 font-bold text-lg  ">Social Just You Connected Us!</h4>
                    <ul className=" flex gap-3 mt-3 md:justify-start  ">
                        <li className="w-8 h-8 border border-(--black)  bg-(--black) hover:bg-gradient-to-r from-(--blue) to-(--green) flex justify-center items-center rounded-full cursor-pointer ">
                            <FaFacebookF />
                        </li>
                        <li className="w-8 h-8 border border-(--black)  bg-(--black) hover:bg-gradient-to-r from-(--blue) to-(--green) flex justify-center items-center rounded-full cursor-pointer ">
                            <FaXTwitter />
                        </li>
                        <li className="w-8 h-8 border border-(--black)  bg-(--black) hover:bg-gradient-to-r from-(--blue) to-(--green) flex justify-center items-center rounded-full cursor-pointer">
                            <FaLinkedinIn />
                        </li>
                        <li className="w-8 h-8 border border-(--black)  bg-(--black) hover:bg-gradient-to-r from-(--blue) to-(--green) flex justify-center items-center rounded-full cursor-pointer">
                            <FaInstagram />
                        </li>
                    </ul>
                </div>
                <div className="md:w-3/4 flex flex-wrap ">
                    <div className="w-full md:w-3/6 uppercase ">
                        <h4 className=" mt-10 md:mt-0 text-2xl font-bold inline-block pb-2 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-cs_white after:to-cs_theme_black">
                            Our Services
                        </h4>

                        <ul className="mt-5 text-sm columns-2  space-y-4 ">
                            {ourServices.map((item, index) => (
                                <li className="hover:text-(--blue)" key={index}> <a href={item.url}>{item.service_name}</a> </li>

                            ))}

                        </ul>
                    </div>
                    <div className="md:w-2/4 flex flex-col md:flex-row ">
                        <div className="w-full md:w-1/3  ">
                            <h4 className="  mt-10 md:mt-0 text-2xl font-bold inline-block pb-2 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-cs_white after:to-cs_theme_black">
                                Quick Links
                            </h4>
                            <ul className="mt-5 text-sm md:columns-1 columns-2 space-y-4 uppercase ">

                                {quickLinks.map((item, index) => (
                                    <li className="hover:text-(--blue)" key={index}>
                                        <a href={item.url}>{item.link_name}</a>
                                    </li>
                                ))}

                            </ul>
                        </div>
                        <div className="mt-10 md:mt-0 w-full md:w-2/3   lg:pl-7 pl-0">
                            <h2 className=" text-xl md:text-3xl font-bold">We are dedicated to find the right solution for you.</h2>
                            <div className=" mt-5 ">
                                {/* <CsButton mybtn="Get in Touch"></CsButton> */}
                                <Button mybtn="Get in Touch"></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-cs_theme_black  max-w-[90%] mx-auto ">
                <div className="border-t border-(--black) py-8 flex justify-between flex-col md:flex-row text-cs_white  max-w-[100%]  ">
                    <div className="">
                        {" "}
                        <p className="text-sm md:text-left text-center">© Copyright 2025 Atrix IT Solutions | All Right Reserved.</p>
                    </div>
                    <ul className=" flex flex-wrap gap-4 text-sm md:justify-end justify-center md:mt-0 mt-2 ">
                        <li>
                            <p className="border-r pr-4 text-sm">Support Policy </p>
                        </li>
                        <li>
                            <a href="#" className="border-r pr-4">
                                Terms & Conditions{" "}
                            </a>
                        </li>
                        <li className="">
                            <a href="#"> Privacy Policy</a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;