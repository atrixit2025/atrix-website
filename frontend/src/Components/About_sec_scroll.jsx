import React, { useState, useEffect } from "react";
import img1 from "../assets/AboutUs/project-sec/about_img1-jpg.webp";
import img2 from "../assets/AboutUs/project-sec/about_img2-jpg.webp";
import img3 from "../assets/AboutUs/project-sec/about_img3-jpg.webp";
import img4 from "../assets/AboutUs/project-sec/about_img4-jpg.webp";

const About_sec_scroll = () => {
  return (
    <div className="container mx-auto pb-24 mt-28 px-4  ">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6  ">
        {/* Image Grid (Left Side) */}
        <div className="md:col-span-5 relative  ">
          <div className="grid grid-cols-2   md:sticky md:top-36">
            <div>
              <div className="aspect-[4/5] rounded-3xl overflow-hidden p-2">
                <img src={img1} alt="" className="w-full h-full object-cover rounded-2xl" />
              </div>
              <div className="aspect-[4/5] rounded-3xl overflow-hidden p-2">
                <img src={img2} alt="" className="w-full h-full object-cover rounded-2xl" />
              </div>
            </div>

            <div className="pt-14">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden p-2">
                <img src={img3} alt="" className="w-full h-full object-cover rounded-2xl" />
              </div>
              <div className="aspect-[4/5] rounded-3xl overflow-hidden p-2">
                <img src={img4} alt="" className="w-full h-full object-cover rounded-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Text Section (Right Side) */}
        <div className="md:col-span-6 flex flex-col  ml-20">
    
            <div className="w-full py-48">
              {blurbContent.map((item, index) => (
                <div key={index} className="p-6 md:p-10 mt-10">
                  <p className="text-lg font-medium text-white">{item.title}</p>
                  <h1 className="mb-5 text-2xl md:text-5xl font-bold">{item.description}</h1>
                  <p className="text-white/55">{item.pText}</p>
                </div>
              ))}
            </div>

        </div>
      </div>
    </div>
  );
};

export default About_sec_scroll;

const blurbContent = [
  {
    id: 1,
    description: "Our Story",
    pText:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde labore atque a reprehenderit dolor dolore ullam molestiae quis non! Ea molestiae totam, numquam beatae excepturi similique reiciendis tenetur quae earum Aspernatur consequuntur sed iste quod tenetur sequi iusto inventore libero quae perferendis facere explicabo, labore odit sapiente illum quam dolor hic facilis optio quidem, quo suscipit harum! Vero, alias. Ex?",
  },
  {
    id: 2,
    description: "Mission",
    pText:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde labore atque a reprehenderit dolor dolore ullam molestiae quis non! Ea molestiae totam, numquam beatae excepturi similique reiciendis tenetur quae earum Aspernatur consequuntur sed iste quod tenetur sequi iusto inventore libero quae perferendis facere explicabo, labore odit sapiente illum quam dolor hic facilis optio quidem, quo suscipit harum! Vero, alias. Ex?",
  },
  {
    id: 3,
    description: "Vision",
    pText:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde labore atque a reprehenderit dolor dolore ullam molestiae quis non! Ea molestiae totam, numquam beatae excepturi similique reiciendis tenetur quae earum Aspernatur consequuntur sed iste quod tenetur sequi iusto inventore libero quae perferendis facere explicabo, labore odit sapiente illum quam dolor hic facilis optio quidem, quo suscipit harum! Vero, alias. Ex?",
  },
 
];
