import React, { useEffect } from "react";
import { useState } from "react";

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
import About_video from "../assets/ATRIX COMPRESS 540.mp4";
// import CardCarousel from "../Components/card-carousel";
import About_sec_scroll from "../Components/About_sec_scroll";

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
  useEffect(()=>{
 window.scroll(0,0)
  })

  return (
    <>
      {/* video-section */}
      <div className="video-sec mx-6 pt-38">
        <div className="pointer-events-none  ">
          <video
            className="  rounded-xl "
            src={About_video}
            autoPlay
            muted
            loop
            controls={false}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>


      {/* About-heading and img-tex section */}
      <div className="Page-heading text-center mt-8 px-4">
        <h1 className="font-bold text-4xl md:text-6xl lg:text-9xl">About Us</h1>
        <p className="mx-auto max-w-3xl text-sm md:text-base lg:text-lg text-white/55 mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id nihil
          suscipit autem accusamus provident magnam, cum, consequatur vel illo
          ullam aspernatur consequuntur quod excepturi? Similique nostrum dicta
          exercitationem earum saepe!
        </p>
      </div>

      <About_sec_scroll />

      {/* text-marquee-section */}
      <div className="relative marquee-sec text-6xl font-bold mt-22 ">   <div>
          <Marquee speed={30} className="overflow-hidden">
            VISIONARY . INNOVATIVE . EFFICIENT . GL PROFESSIONAL . ACCESSIBLE .
            USER-CENTR EMPOWERING . TRUSTWORTHY . SCALABLE
          </Marquee>
        </div>

        <div>
          <Marquee
            speed={30}
            direction="right"
            className="overflow-hidden mt-3"
          >
            VISIONARY . INNOVATIVE . EFFICIENT . GL ROFESSIONAL . ACCESSIBLE .
            USER-CENTR EMPOWERING . TRUSTWORTHY . SCALABLE
          </Marquee>
        </div>

        <div>
          <Marquee speed={30} className="overflow-hidden mt-3">
            ACCESSIBLE . USER-CENTR EMPOWERING . TRUSTWORTHY . SCALABLE .
            VISIONARY . INNOVATIVE . EFFICIENT . GL ROFESSIONAL .
          </Marquee>
        </div>
      </div>

      {/* Our Keys section */}

      <div className="container keys-sec mx-auto mt-28 max-w-[1600px] w-[80%] ">
        {/* Heading */}
        <div className="grid grid-cols-12">
          <div className="col-span-12 text-center">
            <p className="text-lg md:text-xl pb-2">Our Keys</p>
            <h2 className="font-bold text-3xl md:text-5xl">
              What sets us apart
            </h2>
          </div>
        </div>

        {/* First Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-10">
          <div className="text-center bg-transparent hover:bg-gray-200/10 p-8 transition duration-300 h-[350px]">
            <div className="w-[80px] mx-auto  pt-10">
              <img src={icon5} alt="Values" />
            </div>
            <h3 className="pt-6 text-xl md:text-2xl font-bold">Values</h3>
            <p className="pt-2 text-gray-500 text-sm md:text-base">
              Ethical solutions and guided by a moral compass we add value to
              our client's lives through our products and solutions.
            </p>
          </div>

          <div className="text-center bg-gray-100/5 hover:bg-gray-200/10 p-8 transition duration-300 ">
            <div className="w-[80px] mx-auto pt-10">
              <img src={icon6} alt="Innovation" />
            </div>
            <h3 className="pt-6 text-xl md:text-2xl font-bold">Innovation</h3>
            <p className="pt-2 text-gray-500 text-sm md:text-base">
              Ethical solutions and guided by a moral compass we add value to
              our client's lives through our products and solutions.
            </p>
          </div>

          <div className="text-center bg-transparent hover:bg-gray-200/10 p-8 transition duration-300 ">
            <div className="w-[80px] mx-auto pt-10">
              <img src={icon7} alt="Integrity" />
            </div>
            <h3 className="pt-6 text-xl md:text-2xl font-bold">Integrity</h3>
            <p className="pt-2 text-gray-500 text-sm md:text-base">
              Ethical solutions and guided by a moral compass we add value to
              our client's lives through our products and solutions.
            </p>
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          <div className="text-center  bg-gray-100/5 hover:bg-gray-200/10 p-8 transition duration-300 h-[350px] ">
            <div className="w-[70px] mx-auto pt-10">
              <img src={icon8} alt="Agile Solutions" />
            </div>
            <h3 className="pt-6 text-xl md:text-2xl font-bold">
              Agile Solutions
            </h3>
            <p className="pt-2 text-gray-500  text-sm md:text-base">
              Ethical solutions and guided by a moral compass we add value to
              our client's lives through our products and solutions.
            </p>
          </div>

          <div className="text-center bg-transparent hover:bg-gray-200/10 p-8 transition duration-300 ">
            <div className="w-[80px] mx-auto pt-10">
              <img src={icon9} alt="Culture" />
            </div>
            <h3 className="pt-6 text-xl md:text-2xl font-bold">Culture</h3>
            <p className="pt-2 text-gray-500 text-sm md:text-base">
              Ethical solutions and guided by a moral compass we add value to
              our client's lives through our products and solutions.
            </p>
          </div>

          <div className="text-center bg-gray-100/5 hover:bg-gray-200/10 p-8 transition duration-300 ">
            <div className="w-[80px] mx-auto pt-10">
              <img src={icon10} alt="Kindness" />
            </div>
            <h3 className="pt-6 text-xl md:text-2xl font-bold">Kindness</h3>
            <p className="pt-2 text-gray-500 text-sm md:text-base">
              Ethical solutions and guided by a moral compass we add value to
              our client's lives through our products and solutions.
            </p>
          </div>
        </div>
      </div>

      {/* CTA-section */}
      <div className="container mx-auto mt-28 max-w-[1600px] w-[80%]">
  <div className="row grid grid-cols-1 md:grid-cols-12 mt-10 bg-white/15 rounded-sm p-6 md:p-10">
    
    {/* Text Section */}
    <div className="md:col-span-10 col-span-12 text-center md:text-left">
      <h3 className="text-white text-3xl md:text-4xl font-bold">
        We are always on the lookout for new talent!
      </h3>
    </div>
    
    {/* Button Section */}
    <div className="md:col-span-2 col-span-12 flex justify-center md:justify-end mt-4 md:mt-0 ">
      <Button mybtn={"Learn More"}></Button>
    </div>

  </div>
</div>


      {/* Environment-section */}
      <div className="Environment-sec">
        <div className="container mx-auto mt-28 max-w-[1600px] w-[80%] ">
          <div className="row text-center pb-10 ">
            <div className="col">
              <p className="text-xl pb-4">Atrix Environment</p>
              <h2 className="font-bold text-5xl">
                What let us thrive together
              </h2>
            </div>
          </div>

          <div className="row flex-col grid grid-cols-12 mt-10 ">
            <div className="col-span-3 flex items-center flex-col ">
              <div className="image w-20 brightness-[2.5] mb-2">
                <img src={icon1} alt="" />
              </div>
              <p className="mt-2">Good Culture</p>
            </div>
            <div className="col-span-3 flex items-center flex-col  ">
              <div className="image w-20 brightness-[2.5] mb-2 ">
                <img src={icon2} alt="" />
              </div>
              <p className="mt-2">5 Day Working</p>
            </div>
            <div className="col-span-3 flex items-center flex-col  ">
              <div className="image w-20 brightness-[2.5] mb-2 ">
                <img src={icon3} alt="" />
              </div>
              <p className="mt-2">Growth & support</p>
            </div>
            <div className="col-span-3 flex items-center flex-col  ">
              <div className="image w-20 brightness-[2.5] mb-2 ">
                <img src={icon4} alt="" />
              </div>
              <p className="mt-2">Transparency</p>
            </div>
          </div>
        </div>
      </div>

      {/* OurSolution-section */}
      <div className=" mt-28 ">
        <div className="row  flex-col grid grid-cols-12 space-x-96  ">
          <div className=" Our Solution Process col-span-12 ">
            <OurSolution />
          </div>
        </div>
      </div>

      {/* OurPortfolio-section */}
      <div className="Our Solution Process  ">
        <OurPortfolio />
      </div>

      {/* card-carousel-section */}
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
