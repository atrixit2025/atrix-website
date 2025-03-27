import React, { useState, useEffect } from "react";
import img1 from "../assets/AboutUs/project-sec/about_img1-jpg.webp";
import img2 from "../assets/AboutUs/project-sec/about_img2-jpg.webp";
import img3 from "../assets/AboutUs/project-sec/about_img3-jpg.webp";
import img4 from "../assets/AboutUs/project-sec/about_img4-jpg.webp";

const About_sec_scroll = () => {
  return (
    <div className="container mx-auto w-[90%] pb-24 mt-28   ">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 -mx-2  ">
        {/* Image Grid (Left Side) */}
        <div className="md:col-span-5 relative  ">
          <div className="grid grid-cols-2   md:sticky md:top-6">
            <div>
              <div className="aspect-[4/5] rounded-3xl overflow-hidden p-2 ">
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

          <div className="w-full py-8">
            {blurbContent.map((item, index) => (
              <div key={index} className="p-6 ">
                <p className="text-lg font-medium text-white pt-5 ">{item.title}</p>
                <h1 className="mb-5 text-2xl md:text-5xl font-bold ">{item.description}</h1>
                <p className="text-white/55 text-sm/6">{item.pText}</p><br />
                <p className="text-white/55 text-sm/6">{item.pText1}</p>

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
      "Established in 2020 with a vision to serve the best and most affordable digital solutions designed to deliver results. We have a team of expert designers, developers, and marketing executives who combine their individual skills to form a strong and successful team. Our team is passionate about using the latest technologies and best practices to deliver real results.",
    pText1: "We offer a wide range of services, including web development, branding, digital marketing, visual effects, photo and video production, staffing, and logistics. Every solution we create is designed to help businesses grow, improve their online presence, and stay ahead in today’s fast-changing digital world."
  },
  {
    id: 2,
    description: "Our Mission",
    pText:
      "Our mission is to create high-performance digital solutions that are effective in facilitating the success of a business. By using the latest technology, our team supports clients in maximizing their online performance potential for long-term success. ",
  },
  {
    id: 3,
    description: "Our Vision",
    pText:
      "Through innovative, smart, and reliable digital solutions, we aim to empower businesses towards success. Our vision is to help businesses succeed in an ever-evolving digital world through advanced technology and professional guidance.",
  },

];
