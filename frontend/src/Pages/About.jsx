import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import OurSolution from "../Components/OurSolution";
import OurPortfolio from "../Components/OurPortfolio";
import Marquee from "react-fast-marquee";
import icon1 from "../assets/AboutUs/Transparency.svg";
import icon2 from "../assets/AboutUs/growth-support.svg";
import icon3 from "../assets/AboutUs/Good-Culture.svg";
import icon4 from "../assets/AboutUs/5day-working.svg";
import Button from "../Components/Button";

import icon5 from "../assets/AboutUs/keys-sec/Culture.svg";
import icon6 from "../assets/AboutUs/keys-sec/Innovation.svg";
import icon7 from "../assets/AboutUs/keys-sec/Integrity.svg";
import icon8 from "../assets/AboutUs/keys-sec/Kindness.svg";
import icon9 from "../assets/AboutUs/keys-sec/value.svg";
import icon10 from "../assets/AboutUs/keys-sec/Agile-Solutions.svg";
import About_video from "../assets/AtrixHomevideo.mp4";

import About_sec_scroll from "../Components/About_sec_scroll";


import { RxArrowTopRight } from "react-icons/rx";
import ValueCards from "../Components/career/ValueCards";
import TestimonialsCards from "../Components/TestimonialsCards";
import Behance from "../Components/Behanceshowpost/Behance";
import thumbnail1 from "../assets/thumbnail-1.jpg";


const cards = [
  { id: 1, title: "Card 1", color: "bg-red-500" },
  { id: 2, title: "Card 2", color: "bg-blue-500" },
  { id: 3, title: "Card 3", color: "bg-green-500" },
  { id: 4, title: "Card 4", color: "bg-yellow-500" },
  { id: 5, title: "Card 5", color: "bg-purple-500" },
  { id: 6, title: "Card 6", color: "bg-pink-500" },
];

const About = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    if (index < cards.length - 3) {
      setIndex(index + 1);
    }
  };

  const prevSlide = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

 

  const ValueCardheading = [
    {
      secHeading: "Our Keys",
      secSubHeading: "What sets us apart"
    }
  ]

  const ValueCardContent = [
    {
      icon: icon5,
      title: "Values",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus qui quidem praesentium?",
    },
    {
      icon: icon6,
      title: "Innovation ",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus qui quidem praesentium?",
    },
    {
      icon: icon7,
      title: "Integrity",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus qui quidem praesentium?",
    },
    {
      icon: icon8,
      title: "Agile Solutions",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus qui quidem praesentium?",
    },
    {
      icon: icon9,
      title: "Culture",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus qui quidem praesentium?",
    },
    {
      icon: icon10,
      title: "Kindness",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus qui quidem praesentium?",
    },
  ];


  return (
    <>
      {/* video-section */}

      <div className="video-sec mx-6 pt-38">
        <div className="pointer-events-none  ">
          <video
            className="  rounded-xl "
            src={About_video}
             poster={thumbnail1}
            autoPlay
            muted
            loop
            controls={false}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>


      {/* About-heading and img-tex section */}
      <div className="Page-heading text-center mt-10 md:mt-22 px-4">
        <h1 className="medium-heading">About Us</h1>
        <p className="mx-auto max-w-3xl text-sm md:text-base lg:text-lg text-white/55 mt-4">
          We develop creative solutions that generate actual results. With tailored technology solutions, our team of experts is committed to helping your company grow and achieve long-term success.
        </p>
      </div>

      <About_sec_scroll />

      {/* text-marquee-section */}
      <div className="relative marquee-sec text-2xl md:text-6xl font-bold mt-8 md:mt-22   ">   <div>
        <Marquee speed={30} className="overflow-hidden text-[#8d8d8d]">
         VISIONARY . INNOVATIVE . EFFICIENT . GLOBAL . PROFESSIONAL . ACCESSIBLE . USER-CENTRIC . EMPOWERING . TRUSTWORTHY . SCALABLE. 
        </Marquee>
      </div>

        <div>
          <Marquee
            speed={30}
            direction="right"
            className="overflow-hidden mt-1 text-[#8d8d8d]"
          > &nbsp; VISIONARY . INNOVATIVE . EFFICIENT . GLOBAL . PROFESSIONAL . ACCESSIBLE . USER-CENTRIC . EMPOWERING . TRUSTWORTHY . SCALABLE .  
          </Marquee>
        </div>

        <div>
          <Marquee speed={30} className="overflow-hidden mt-1 text-[#8d8d8d]  ">
           USER-CENTRIC . EMPOWERING . TRUSTWORTHY . SCALABLE . VISIONARY . INNOVATIVE . EFFICIENT . GLOBAL . PROFESSIONAL . ACCESSIBLE . 
          </Marquee>
        </div>
      </div>

      {/* Our Keys section */}


      {/* Heading */}
      <ValueCards />

      {/* CTA-section */}
      <div className="container mx-auto mt-14 md:mt-28  w-[90%] ">
        <div className="row grid grid-cols-1 md:grid-cols-12 mt-10 bg-(--blue) rounded-xl p-6 md:p-10">

          {/* Text Section */}
          <div className="md:col-span-10 col-span-12 text-center md:text-left">
            <h3 className="text-white sub-sec-heading">
              Say Goodbye to IT Hassles – Get Expert Solutions Now!
            </h3>
          </div>

          {/* Button Section */}
          <div className="md:col-span-2 col-span-12 flex justify-center items-center md:justify-end mt-4 md:mt-0 ">
            <Link to='/contact-us' className="bg-(--white)  font-extrabold text-(--blue) px-4 py-2  duration-300  rounded-lg  cursor-pointer  flex items-center gap-2 group hover:scale-104  ">Contact us!<span className="  ">
              <RxArrowTopRight className=" group-hover:rotate-45 group-hover:scale-140 duration-250 " />
            </span></Link>
          </div>

        </div>
      </div>


      {/* Environment-section */}
      <div className="Environment-sec">
        <div className="container mx-auto  mt-14 md:mt-28  w-[90%]">
          <div className="row text-center pb-10 ">
            <div className="col">
              <p className="text-xl pb-4"> Atrix Environment</p>
              <h2 className="sec-heading">
                Thriving Together for a Better Future!
              </h2>
            </div>
          </div>

          <div className="row flex-col grid grid-cols-12 mt-10 space-y-10 ">
            <div className=" col-span-6 md:col-span-3 flex items-center flex-col ">
              <div className="image w-20 brightness-[2.5] mb-2">
                <img src={icon1} alt="" />
              </div>
              <p className="mt-2">Good Culture</p>
            </div>
            <div className=" col-span-6 md:col-span-3 flex items-center flex-col  ">
              <div className="image w-20 brightness-[2.5] mb-2 ">
                <img src={icon2} alt="" />
              </div>
              <p className="mt-2">5 Day Working</p>
            </div>
            <div className=" col-span-6 md:col-span-3 flex items-center flex-col  ">
              <div className="image w-20 brightness-[2.5] mb-2 ">
                <img src={icon3} alt="" />
              </div>
              <p className="mt-2">Growth & support  </p>
            </div>
            <div className=" col-span-6 md:col-span-3 flex items-center flex-col  ">
              <div className="image w-20 brightness-[2.5] mb-2 ">
                <img src={icon4} alt="" />
              </div>
              <p className="mt-2">Transparency</p>
            </div>
          </div>
        </div >
      </div >

      {/* OurSolution-section */}
      < div className=" mt-14 md:mt-28 " >
        <div className="row  flex-col grid grid-cols-12 space-x-96  ">
          <div className=" Our Solution Process col-span-12 ">
            <OurSolution />
          </div>
        </div>
      </div >

      {/* OurPortfolio-section */}
      < div className="Our Solution Process  " >
        <OurPortfolio />
      </div >

      {/* Testimonial-Section */}
      <TestimonialsCards/>
    
      {/* Behance-section */}
        <Behance/>


    </>
  );
};

export default About;

const keyItems = [
  {
    icon: icon5,
    title: "Values",
    description:
      "Ethical solutions and guided by a moral compass we add value to our client's lives through our products and solutions.",
  },
  {
    icon: icon6,
    title: "Innovation",
    description:
      "Ethical solutions and guided by a moral compass we add value to our client's lives through our products and solutions.",
  },
  {
    icon: icon7,
    title: "Integrity",
    description:
      "Ethical solutions and guided by a moral compass we add value to our client's lives through our products and solutions.",
  },
  {
    icon: icon8,
    title: "Agile Solutions",
    description:
      "Ethical solutions and guided by a moral compass we add value to our client's lives through our products and solutions.",
  },
  {
    icon: icon9,
    title: "Culture",
    description:
      "Ethical solutions and guided by a moral compass we add value to our client's lives through our products and solutions.",
  },
  {
    icon: icon10,
    title: "Kindness",
    description:
      "Ethical solutions and guided by a moral compass we add value to our client's lives through our products and solutions.",
  },
];
