import React from "react";
import HeroCommon from "./HeroCommon";
import { TiSocialFacebook } from "react-icons/ti";
import { AiOutlineTwitter } from "react-icons/ai";
import { TiSocialLinkedin } from "react-icons/ti";
import { FaArrowLeft } from "react-icons/fa6";
import "./SingleBlog.css"

import img from "../assets/image.png";



const herodata = [
  {
    title: " The art of teaching strategies for engaging motivating.",
    desc: "",
  },
];

const BolgContant = () => {
  return (
    <>
    <div className="Blog-header ">
     <HeroCommon heroData={herodata[0]}  />
    </div>
      

      <div className="container mx-auto">

        <div className="row flex justify-between pt-10 ">
          <div className="col-4 flex items-center gap-2 text-2xl cursor-pointer ">
            <div className="icon text-[16px] border rounded-[50%] p-1 cursor-pointer hover:bg-(--blue)   ">
              <FaArrowLeft />
            </div>
            Back to main blog
          </div>

          <div className="col-4 text-2xl ">August 11, 2024 </div>

          <div className="col-4 text-3xl  flex gap-3">
            <span className="border rounded-[50%] p-1 cursor-pointer hover:bg-(--blue) ">
              {" "}
              <TiSocialFacebook />{" "}
            </span>
            <span className="border rounded-[50%] p-1 cursor-pointer hover:bg-(--blue) ">
              {" "}
              <AiOutlineTwitter />{" "}
            </span>
            <span className="border rounded-[50%] p-1 cursor-pointer hover:bg-(--blue) ">
              {" "}
              <TiSocialLinkedin />
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto pt-10">
        <div className="featured-img ">
            <img className="w-[100%] rounded-2xl object-cover" src={img} alt="" />
        </div>
      </div>

      <div className="container mx-auto pt-10 ">
        <div className="mx-auto max-w-[800px]">
       
            <p>
              Proin faucibus nec mauris a sodales, sed elementum mi tincidunt.
              Sed eget viverra egestas nisi in consequat. Fusce sodales augue a
              accumsan. Cras sollicitudin, ipsum eget blandit pulvinar. Integer
              tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean
              vulputate eleifend tellus. Aenean leo ligula, porttitor eu. Proin
              faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed
              eget viverra egestas nisi consequat. Fusce sodales augue a
              accumsan.
            </p>
            <br />
            <p>
              “I don’t know why she surrendered – exhaustion, probably – but one
              afternoon in 1980 I was allowed. It was the remake of Jens Lyn
              with Max von Sydow, you could see the strings in the spaceships
              when they flew, and it was wonderful . Five friends in the cinema
              darkness. We only had money for four tickets, so we took turns
              sitting on each other’s laps.’
            </p>
 
            <h1 className="font-bold text-4xl pt-10" >Contemporary art daily</h1>
            <p>Successful people do not see failures as failures. They see them as important learning lessons. Lessons that are capable of giving them insights to prevent such mistakes from happening again. By adopting this mindset of turning each failure into a learning lesson or opportunity.</p>

            <h1 className="font-bold text-4xl pt-10" >Procedere</h1>
            <p>Successful people do not see failures as failures. They see them as important learning lessons. Lessons that are capable of giving them insights to prevent such mistakes from happening again. By adopting this mindset of turning each failure into a learning lesson or opportunity.</p><br />
            <ul className="list-disc pl-5 " >
                <li>Diversity investigation for royal been.
                </li>
                <li>Create a structure where participants will add their information.
                </li>
                <li>Efforts without a focus.
                </li>
                <li>Many contradicting opinions a vision document.
                </li>
                <li>A deliverable for workshop participants.
                </li>
            </ul>
        </div>

        <div className="container pt-10">
            <div className="related-heading mx-auto">
                <h1 className="text-5xl font-bold" > Related Posts</h1>
            </div>

       

        </div>

       


      </div>
    </>
  );
};

export default BolgContant;
