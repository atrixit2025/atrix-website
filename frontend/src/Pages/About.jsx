import React from "react";
import { useState } from "react";
// import img1 from "../assets/AboutUs/imgpsh_fullsize_ani.png";
// import img2 from "../assets/AboutUs/imgpsh_fullsize_anim2.png";
// import img3 from "../assets/AboutUs/imgpsh_fullsize_anim1.png";
// import img4 from "../assets/AboutUs/imgpsh_fullsize_anim4.png";
// import img5 from "../assets/AboutUs/imgpsh_fullsize_anim5.png";
// import img6 from "../assets/AboutUs/imgpsh_fullsize_anim3.png";
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

import About_video from "../assets/AboutUs/video/atrix.MP4";
import CardCarousel from "../Components/card-carousel";


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
  return (
    <>
      {/* video-section */}
      <div className="video-sec mx-6 pt-36">
        <div className="pointer-events-none  ">
          <video
            className="  rounded-xl border-2"
            src={About_video}
            autoPlay
            muted
            loop
            controls={false}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>

      {/* <div className="container mx-auto pt-42 max-w-[1600px] w-[80%]">
        <div className="row flex gap-3  mx-[-15px] ">
          <div className="col-6  ">
            <div className="img">
              <img src={img1} alt="" />
            </div>
          </div>
          <div className="col-3 ">
            <div className="img">
              <img src={img2} alt="" />
            </div>
          </div>
          <div className="col-3 ">
            <div className="img">
              <img src={img3} alt="" />
            </div>
          </div>
        </div>

        <div className="row flex gap-3 mt-4 mx-[-15px] ">
          <div className="col-3  ">
            <div className="img">
              <img src={img4} alt="" />
            </div>
          </div>
          <div className="col-6  ">
            <div className="img">
              <img src={img5} alt="" />
            </div>
          </div>
          <div className="col-3  ">
            <div className="img">
              <img src={img6} alt="" />
            </div>
          </div>
        </div>
      </div> */}

      {/* About-heading and img-tex section */}
      <div className="container mx-auto mt-22 max-w-[1600px] w-[80%]">
        <div className="row text-center mx-[-15px]">
          <div className="col px-[15px] font-bold ">
            <h1 className="text-7xl">About US</h1>
          </div>
        </div>

        <div className="row text-center  w-[80%] mx-auto ">
          <div className="col">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatum earum explicabo quibusdam quam consequuntur,
              repudiandae nisi dolorem, debitis perferendis recusandae at
              accusantium expedita ducimus. Unde voluptates est deserunt nulla
              dicta. Quis fugit deserunt hic. Odit, officia. Labore accusamus
              voluptas consequatur itaque sint, temporibus quis
            </p>
          </div>
        </div>
      </div>

      {/* Our Story section */}
      <div className="container mx-auto mt-32 max-w-[1600px] w-[80%]  ">
        <div className="row  flex-col grid grid-cols-12 space-x-22 ">
          <div className="col-span-6 flex items-center justify-center ">
            <h2>Our Story</h2>
          </div>
          <div className="col-span-6 w-[80%]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur,
            molestiae consectetur obcaecati praesentium laborum cupiditate?
            Pariatur, architecto corrupti quibusdam sapiente maxime, dolorem, is
            mollitia voluptatum iste incidunt placeat consequatur iusto velit
            ducimus minus possimus perferendis illo nostrum doloribus nobis
            magni alias eos sequi? Ratione, soluta. Animi ex assumenda iste
            delectus sunt aliquid explicabo suscipit quae excepturi facilis
            molestiae vero recusandae, voluptas sit voluptatum blanditiis rerum
            ipsum! Animi, sapiente. Ex laudantium explicabo et facere, corporis
            expedita!
          </div>
        </div>

        <div className="row   mt-12 flex-col grid grid-cols-12 space-x-22 ">
          <div className="col-span-6 flex items-center  text-center justify-center ">
            <h2>Mission</h2>
          </div>
          <div className="col-span-6 w-[80%]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur,
            molestiae consectetur obcaecati praesentium laborum cupiditate?
            Pariatur, architecto corrupti quibusdam sapiente maxime, dolorem,
            isci, praesentium excepturi eius dignissimos aut quasi facilis
            mollitia voluptatum iste incidunt placeat consequatur iusto velit
            ducimus minus possimus perferendis illo nostrum doloribus nobis
            magni alias eos sequi? Ratione, soluta. Animi ex assumenda iste
            delectus sunt aliquid explicabo suscipit quae excepturi facilis
            molestiae vero recusandae, voluptas sit voluptatum blanditiis rerum
            ipsum! Animi, sapiente. Ex laudantium explicabo et facere, corporis
            expedita!
          </div>
        </div>

        <div className="row   mt-12 flex-col grid grid-cols-12 space-x-22 ">
          <div className="col-span-6 flex items-center  text-center justify-center ">
            <h2>Vision</h2>
          </div>
          <div className="col-span-6 w-[80%]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur,
            molestiae consectetur obcaecati praesentium laborum cupiditate?
            Pariatur, architecto corrupti quibusdam sapiente maxime, dolorem,
            lis molestiae vero recusandae, voluptas sit voluptatum blanditiis
            rerum ipsum! Animi, sapiente. Ex laudantium explicabo et facere,
            corporis expedita!
          </div>
        </div>
      </div>

      {/* text-marquee-section */}
      <div className=" marquee-sec text-6xl font-bold mt-32">
        <div>
          <Marquee speed={30} className="overflow-hidden">
            VISIONARY . INNOVATIVE . EFFICIENT . GL ROFESSIONAL . ACCESSIBLE .
            USER-CENTR EMPOWERING . TRUSTWORTHY . SCALABLE
          </Marquee>
        </div>
        <div>
          <Marquee speed={30} direction="right" className=" overflow-hidden">
            VISIONARY . INNOVATIVE . EFFICIENT . GL ROFESSIONAL . ACCESSIBLE .
            USER-CENTR EMPOWERING . TRUSTWORTHY . SCALABLE
          </Marquee>
        </div>
        <div>
          <Marquee speed={30} className=" overflow-hidden">
            ACCESSIBLE . USER-CENTR EMPOWERING . TRUSTWORTHY . SCALABLE .
            VISIONARY . INNOVATIVE . EFFICIENT . GL ROFESSIONAL .
          </Marquee>
        </div>
      </div>

      {/* Our Keys section */}
      <div className="container mx-auto mt-28 max-w-[1600px] w-[80%] ">
        <div className="row flex-col grid grid-cols-12">
          <div className="col-span-12 text-center">
            <p> Our Keys</p>
            <h2 className="font-bold text-3xl">What sets us apart</h2>
          </div>
        </div>

        <div className="row flex-col grid grid-cols-12 pt-16 ">
          <div className="col-span-4 text-center hover:bg-gray-100/35 p-12 transition delay-150 duration-600">
            <div className="icon-sec w-[90px] felx items-center justify-center mx-auto ">
              <img src={icon5} alt="" />
            </div>
            <h3 className="pt-8">values</h3>
            <p>
              Ethical solutions and guided by a moral compass we add value to
              our client's lives through our products and solutions.
            </p>
          </div>
          <div className="col-span-4 text-center bg-gray-100/35 hover:bg-transparent transition delay-150 duration-600 p-12">
            <div className="icon-sec w-[90px] felx items-center justify-center mx-auto ">
              <img src={icon6} alt="" />
            </div>
            <h3 className="pt-8">values</h3>
            <p>
              Ethical solutions and guided by a moral compass we add value to
              our client's lives through our products and solutions.
            </p>
          </div>
          <div className="col-span-4 text-center hover:bg-gray-100/35 p-12 transition delay-150 duration-600">
            <div className="icon-sec w-[90px] felx items-center justify-center mx-auto ">
              <img src={icon7} alt="" />
            </div>
            <h3 className="pt-8">values</h3>
            <p>
              Ethical solutions and guided by a moral compass we add value to
              our client's lives through our products and solutions.
            </p>
          </div>
        </div>
        <div className="row flex-col grid grid-cols-12 ">
          <div className="col-span-4 text-center bg-gray-100/35 p-12 hover:bg-transparent transition delay-150 duration-600">
            <div className="icon-sec w-[90px] felx items-center justify-center mx-auto ">
              <img src={icon8} alt="" />
            </div>
            <h3 className="pt-8">values</h3>
            <p>
              Ethical solutions and guided by a moral compass we add value to
              our client's lives through our products and solutions.
            </p>
          </div>
          <div className="col-span-4 text-center hover:bg-gray-100/35 p-12">
            <div className="icon-sec w-[90px] felx items-center justify-center mx-auto ">
              <img src={icon9} alt="" />
            </div>
            <h3 className="pt-8">values</h3>
            <p>
              Ethical solutions and guided by a moral compass we add value to
              our client's lives through our products and solutions.
            </p>
          </div>
          <div className="col-span-4 text-center bg-gray-100/35 hover:bg-transparent transition delay-150 duration-600 p-12">
            <div className="icon-sec w-[90px] felx items-center justify-center mx-auto ">
              <img src={icon10} alt="" />
            </div>
            <h3 className="pt-8">values</h3>
            <p>
              Ethical solutions and guided by a moral compass we add value to
              our client's lives through our products and solutions.
            </p>
          </div>
        </div>
      </div>

      {/* CTA-section */}
      <div className="container mx-auto mt-28 max-w-[1600px] w-[80%] ">
        <div className="row flex-col grid grid-cols-12 mt-10 bg-(--black)  p-10">
          <div className="col-span-10">
            <h3 className="text-white text-3xl ">
              We are always on the lookout for new talent!
            </h3>
          </div>
          <div className="col-span-2 text-black flex  justify-end ">
            <Button mybtn={"Learn More"}> </Button>
          </div>
        </div>
      </div>

      {/* Environment-section */}
      <div className="Environment-sec">
        <div className="container mx-auto mt-28 max-w-[1600px] w-[80%] ">
          <div className="row">
            <div className="col">
              <p>Visiontrek Environment</p>
              <h2>What let us thrive together</h2>
            </div>
          </div>

          <div className="row flex-col grid grid-cols-12 mt-10 ">
            <div className="col-span-3 flex items-center flex-col ">
              <div className="image w-20 brightness-[2.5]">
                <img src={icon1} alt="" />
              </div>
              <p className="mt-2">Transparency</p>
            </div>
            <div className="col-span-3 flex items-center flex-col  ">
              <div className="image w-20 brightness-[2.5] ">
                <img src={icon2} alt="" />
              </div>
              <p className="mt-2">Transparency</p>
            </div>
            <div className="col-span-3 flex items-center flex-col  ">
              <div className="image w-20 brightness-[2.5] ">
                <img src={icon3} alt="" />
              </div>
              <p className="mt-2">Transparency</p>
            </div>
            <div className="col-span-3 flex items-center flex-col  ">
              <div className="image w-20 brightness-[2.5] ">
                <img src={icon4} alt="" />
              </div>
              <p className="mt-2">Transparency</p>
            </div>
          </div>
        </div>
      </div>

      {/* OurSolution-section */}
      <div className="container mx-auto mt-28 max-w-[1600px] w-[80%]">
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
<div className="relative w-full max-w-2xl mx-auto p-4">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${index * (100 / 3)}%)` }}
        >
          {cards.map((card) => (
            <div
              key={card.id}
              className={`w-1/3 p-2 flex-shrink-0 ${card.color} h-40 flex items-center justify-center text-white text-lg font-bold rounded-lg`}
            >
              {card.title}
            </div>
          ))}
        </div>
      </div>

      {/* Left Button */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-700 text-white px-3 py-2 rounded-full shadow-md hover:bg-gray-900"
      >
        ◀
      </button>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-700 text-white px-3 py-2 rounded-full shadow-md hover:bg-gray-900"
      >
        ▶
      </button>
    </div>

<CardCarousel/>


    </>
  );
};

export default About;
