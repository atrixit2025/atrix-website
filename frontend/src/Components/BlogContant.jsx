import React, { useEffect } from "react";
import "../Components/SingleBlog.css";

import { useLocation, useParams, useNavigate } from "react-router-dom";
import HeroCommon from "./HeroCommon";
import { FaArrowLeft } from "react-icons/fa6";
import { blogData } from "../Pages/BlogUS";
import Card from "react-bootstrap/Card";
import { GoCalendar } from "react-icons/go";
import Button from "react-bootstrap/Button";
import { FaArrowRight } from "react-icons/fa6";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { LiaTwitter } from "react-icons/lia";
import { LiaPinterestP } from "react-icons/lia";

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

  const relatedBlogs = shuffleArray(
    blogData.filter((b) => b.id !== blog?.id)
  ).slice(0, 3);

  return (
    <div className="">
      <div className="Blog-header">
        <div className="container mx-auto w-[90%]">
          <HeroCommon
            heroData={{ title: blog?.title || "Blog Not Found", desc: "" }}
          />
        </div>
      </div>

      <div className="container mx-auto w-[90%]">
        <div className="row flex justify-between pt-5">
          <div
            onClick={() => navigate("/BlogUs")}
           className="font-bold pt-2 flex items-center  cursor-pointer hover:text-(--blue) gap-2   group ">
              
            <div className="flex items-center gap-2">
              <span className='border border-white/45 ml-2 flex justify-center items-center h-6 w-6 rounded-full  rotate-45 text-[var(--blue)] group-hover:rotate-1 group-hover:bg-(--blue) group-hover:text-(--white) group-hover:border-(--blue)   duration-300' > <FaArrowLeft /> </span>
               Back to main blog
              
            </div>
         
          </div>

          <div className="category-sec flex gap-5 items-center ">
            <div className="col-4  flex text-[14px]">
              {blog.Published}
              {blog.date}
            </div>

            <hr className="border w-16 border-white/35  " />

            <div className="cat-center-sec flex gap-2 items-center ">
              Category:{" "}
              <div className=" bg-white/25 rounded-[14px] px-2.5 py-1  ">
                {blog.Category1}
              </div>
              <div className=" bg-white/25 rounded-[14px] px-2.5 py-1  ">
                {blog.Category2}
              </div>
            </div>
          </div>

          <div className="social-media-icons col-4 text-[16px] flex items-center">
            <div className="py-2.5">
              <ul className="flex gap-2 mt-3  md:justify-start">
                {[
                  { icon: <FaFacebookF />, id: "fb", link: "" },
                  {
                    icon: <LiaTwitter />,
                    id: "twitter",
                    link: "https://x.com/AtrixIT_S",
                  },
                  {
                    icon: <FaLinkedinIn />,
                    id: "linkedin",
                    link: "https://www.linkedin.com/company/atrixitsolutions/",
                  },
                  {
                    icon: <FaInstagram />,
                    id: "insta",
                    link: "https://www.instagram.com/atrixit.solutions/",
                  },
                  {
                    icon: <LiaPinterestP />,
                    id: "insta",
                    link: "https://www.instagram.com/atrixit.solutions/",
                  },
                ].map((item) => (
                  <li
                    key={item.id}
                    className="relative w-10 h-10 p-1 rounded-full cursor-pointer flex justify-center items-center bg-black text-white"
                  >
                    <Link
                      to={item.link}
                      className="absolute inset-0 rounded-full border-transparent bg-gradient-to-r from-blue-400 to-green-400 p-[1px]"
                    >
                      <div className="w-full h-full flex justify-center items-center bg-black hover:bg-gradient-to-r from-blue-400 to-green-400 rounded-full">
                        {item.icon}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
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
              <div key={relatedBlog.id} className="w-[33.3%] flex flex-col  ">
                <Card.Img
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
                  variant="top rounded-t-lg  cursor-pointer"
                  src={relatedBlog.img}
                />

                <Card.Body className="border border-white/15 p-6 flex-1 flex flex-col ">
                  <Card.Title className="flex items-center gap-2  ">
                    <GoCalendar />
                    {relatedBlog.date}
                  </Card.Title>

                  <Card.Text
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
                    className="font-extrabold text-2xl pt-2 flex-1 hover:text-(--blue) cursor-pointer"
                  >
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
                    className="font-bold pt-4 flex items-center  cursor-pointer hover:text-(--blue) self-start  group "
                  > Read More <span className='border border-white/45 ml-2 flex justify-center items-center h-6 w-6 rounded-full  -rotate-45 text-[var(--blue)] group-hover:rotate-1 group-hover:bg-(--blue) group-hover:text-(--white) group-hover:border-(--blue)   duration-300' ><FaArrowRight /></span>
                    </Button>
                </Card.Body>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BolgContant;
