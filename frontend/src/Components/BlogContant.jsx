import React, { useEffect } from "react";
import "../Components/SingleBlog.css";

import { useLocation, useParams, useNavigate } from "react-router-dom";
import HeroCommon from "./HeroCommon";
import { TiSocialFacebook, TiSocialLinkedin } from "react-icons/ti";
import { AiOutlineTwitter } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa6";
import { blogData } from "../Pages/BlogUS";
import Card from "react-bootstrap/Card";
import { GoCalendar } from "react-icons/go";
import Button from "react-bootstrap/Button";
import { FaArrowRight } from "react-icons/fa6";
import { LiaInstagram } from "react-icons/lia";
import { FaPinterestP } from "react-icons/fa";


const BolgContant = () => {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = location.state;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };
  
  const relatedBlogs = shuffleArray(blogData.filter((b) => b.id !== blog?.id)).slice(0, 3);
  
  

  return (
    <>
      <div className="Blog-header">
        <HeroCommon
          heroData={{ title: blog?.title || "Blog Not Found", desc: "" }}
        />
      </div>

      <div className="container mx-auto">
        <div className="row flex justify-between pt-5">
          <div
            onClick={() => navigate("/BlogUs")}
            className="col-4 flex group items-center gap-2 text-[14px] cursor-pointer"
          >
            <div className="icon text-[16px] border rounded-[50%] p-1 cursor-pointer group-hover:bg-(--blue) ">
              <FaArrowLeft />
            </div>
            Back to main blog
          </div>

          <div className="category-sec flex gap-5 items-center ">
            <div className="col-4  flex text-[14px]">
            {blog.Published}
            {blog.date}
            </div>

             <hr className="border w-16 border-white/35  "  />

           <div className="cat-center-sec flex gap-2 items-center ">
              
           Category: <div className=" bg-white/25 rounded-[14px] px-2.5 py-1  ">
               {blog.Category1} 
            </div>

             <div className=" bg-white/25 rounded-[14px] px-2.5 py-1  ">
                {blog.Category2} 
                </div>

             </div>
           </div>

         

          <div className="social-media-icons col-4 text-[16px] flex gap-3 items-center">
            <span className="border rounded-[50%] p-1 cursor-pointer hover:bg-(--blue)">
              <TiSocialFacebook />
            </span>
            <span className="border   rounded-[50%] p-1 cursor-pointer hover:bg-(--blue)">
              <AiOutlineTwitter />
            </span>
            <span className="border rounded-[50%] p-1 cursor-pointer hover:bg-(--blue)">
              <TiSocialLinkedin />
            </span>
            <span className="border rounded-[50%] p-1 cursor-pointer hover:bg-(--blue)">
            <LiaInstagram />

            </span>
            <span className="border rounded-[50%] p-1 cursor-pointer hover:bg-(--blue)">
            <FaPinterestP />

            </span>
          </div>

        </div>
      </div>

      <div className="container mx-auto pt-10">
        <div className="featured-img w-[100%] h-[700px]  ">
          <img
            className=" rounded-2xl  w-full h-full object-cover"
            src={blog?.img}
            alt={blog?.title}
          />
        </div>
      </div>

      <div className="container mx-auto pt-10">
        <div className="mx-auto max-w-[800px]">
          <p className=" felx items-center">{blog?.text}</p>
        </div>
      </div>

      <div className="container mx-auto pt-20">
        <div className="related-heading mx-auto">
          <h1 className="text-5xl font-bold"> Related Posts</h1>
        </div>

        {[0].map(() => (
          <div key={0} className="flex gap-10 pt-10">
            {relatedBlogs.slice(0, 3).map((relatedBlog) => (
              <div key={relatedBlog.id} className="w-[33.3%] flex flex-col">
                <Card.Img variant="top rounded-t-lg " src={relatedBlog.img} />

                <Card.Body className="border border-white/15 p-6 flex-1 flex flex-col">
                  <Card.Title className="flex items-center gap-2">
                    <GoCalendar />
                    {relatedBlog.date}
                  </Card.Title>

                  <Card.Text className="font-extrabold text-2xl pt-2 flex-1">
                    {relatedBlog.title}
                  </Card.Text>

                  <Button
                    onClick={() =>
                      navigate(
                        `/blog/${relatedBlog.title
                          .replace(/\s+/g, "-")
                          .toLowerCase()}`,
                        {
                          state: relatedBlog,
                        }
                      )
                    }
                    className="font-bold pt-2 flex items-center gap-2 cursor-pointer hover:text-(--blue)"
                  >
                    Read More <FaArrowRight />
                  </Button>
                </Card.Body>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default BolgContant;
