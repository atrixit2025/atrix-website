import React, { useEffect } from "react";
import "../Components/SingleBlog.css";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import HeroCommon from "./HeroCommon";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { GoCalendar } from "react-icons/go";
import { blogData } from "../Pages/BlogUS";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Socialcons from "./Contact_us/Socialcons";

const slugify = (title) => title.replace(/\s+/g, "-").toLowerCase();

const BolgContant = () => {
  const location = useLocation();
  const { id } = useParams(); // This is the slug from the URL
  const navigate = useNavigate();

  // Try to get blog from state; fallback to blogData by slug
  let blog = location.state;
  if (!blog) {
    blog = blogData.find((b) => slugify(b.title) === id);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
  const relatedBlogs = shuffleArray(blogData.filter((b) => b.id !== blog?.id)).slice(0, 3);

  // If blog not found
  if (!blog) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold">Blog Not Found</h2>
        <button
          onClick={() => navigate("/blog")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="Blog-header">
        <div className="container mx-auto">
          <HeroCommon heroData={{ title: blog.title || "Blog Not Found", desc: "" }} />
        </div>
      </div>

      {/* Top Section */}
      <div className="container mx-auto w-[90%]">
        <div className="grid grid-cols-12 pt-5">
          <div
            onClick={() => navigate("/blog")}
            className="font-bold flex items-center justify-center md:justify-start cursor-pointer hover:text-(--blue) gap-2 group col-span-12 md:col-span-3"
          >
            <span className='border border-white/45 ml-2 flex justify-center items-center h-6 w-6 rounded-full rotate-45 text-[var(--blue)] group-hover:rotate-1 group-hover:bg-(--blue) group-hover:text-(--white) group-hover:border-(--blue) duration-300'>
              <FaArrowLeft />
            </span>
            Back to main blog
          </div>

          <div className="category-sec mt-1 flex flex-col md:flex-row justify-center flex-wrap gap-5 items-center col-span-12 md:col-span-6">
            <div className="col-4 flex text-[14px]">{blog.Published} {blog.date}</div>
            <hr className="border w-16 border-white/35 block" />
            <div className="cat-center-sec flex gap-2 items-center">
              Category:
              <div className="bg-white/25 rounded-[14px] px-2.5 py-1">{blog.Category1}</div>
              <div className="bg-white/25 rounded-[14px] px-2.5 py-1">{blog.Category2}</div>
            </div>
          </div>

          <div className="social-media-icons text-[16px] flex justify-center items-center col-span-12 md:col-span-3">
            <div className="py-2.5">
              <ul className="flex gap-2 md:justify-start">
                <Socialcons />
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Image */}
      <div className="container mx-auto pt-10 w-[90%]">
        <div className="featured-img w-[100%] h-[700px]">
          <img
            className="rounded-2xl w-full h-full object-cover"
            src={blog.img}
            alt={blog.title}
          />
        </div>
      </div>

      {/* Blog Text */}
      <div className="container mx-auto pt-10 w-[90%]">
        <div className="mx-auto max-w-[800px]">
          <p className="flex items-center">{blog.text}</p>
        </div>
      </div>

      {/* Related Posts */}
      <div className="container mx-auto pt-20 w-[90%]">
        <div className="related-heading mx-auto">
          <h1 className="text-5xl font-bold">Related Posts</h1>
        </div>

        <div className="grid grid-cols-12 gap-10 pt-10">
          {relatedBlogs.map((relatedBlog, index) => (
            <div key={index} className="col-span-12 md:col-span-6 lg:col-span-4 flex flex-col">
              <Card.Img
                onClick={() =>
                  navigate(`/blog/${slugify(relatedBlog.title)}`, {
                    state: relatedBlog,
                  })
                }
                variant="top"
                className="rounded-t-lg cursor-pointer"
                src={relatedBlog.img}
              />

              <Card.Body className="border border-white/15 p-6 flex-1 flex flex-col">
                <Card.Title className="flex items-center gap-2">
                  <GoCalendar />
                  {relatedBlog.date}
                </Card.Title>

                <Card.Text
                  onClick={() =>
                    navigate(`/blog/${slugify(relatedBlog.title)}`, {
                      state: relatedBlog,
                    })
                  }
                  className="font-extrabold text-2xl pt-2 flex-1 hover:text-(--blue) cursor-pointer"
                >
                  {relatedBlog.title}
                </Card.Text>

                <Button
                  onClick={() =>
                    navigate(`/blog/${slugify(relatedBlog.title)}`, {
                      state: relatedBlog,
                    })
                  }
                  className="font-bold pt-4 flex items-center cursor-pointer hover:text-(--blue) self-start group"
                >
                  Read More
                  <span className='border border-white/45 ml-2 flex justify-center items-center h-6 w-6 rounded-full -rotate-45 text-[var(--blue)] group-hover:rotate-1 group-hover:bg-(--blue) group-hover:text-(--white) group-hover:border-(--blue) duration-300'>
                    <FaArrowRight />
                  </span>
                </Button>
              </Card.Body>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BolgContant;
