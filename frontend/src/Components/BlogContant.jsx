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
  const { id } = useParams();
  const navigate = useNavigate();

  let blog = location.state;
  if (!blog) {
    blog = blogData.find((b) => slugify(b.title) === id);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
  const relatedBlogs = shuffleArray(blogData.filter((b) => b.id !== blog?.id)).slice(0, 3);

  if (!blog) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold">Blog Not Found</h2>
        <button
          onClick={() => navigate("/blog")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300"
        >
          Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Header - Left completely unchanged */}
      <div className="Blog-header">
        <div className="container mx-auto">
          <HeroCommon heroData={{ title: blog.title || "Blog Not Found", desc: "" }} />
        </div>
      </div>

      {/* Top Section - Responsive without visual changes */}
      <div className="container mx-auto w-[90%]">
        <div className="grid grid-cols-12 pt-5 gap-y-4">
          <div
            onClick={() => navigate("/blog")}
            className="font-bold flex items-center justify-center md:justify-start cursor-pointer hover:text-[var(--blue)] gap-2 group col-span-12 md:col-span-3 transition-colors duration-300"
          >
            <span className='border border-white/45 ml-2 flex justify-center items-center h-6 w-6 rounded-full rotate-45 text-[var(--blue)] group-hover:rotate-1 group-hover:bg-[var(--blue)] group-hover:text-white group-hover:border-[var(--blue)] duration-300 transition-all'>
              <FaArrowLeft />
            </span>
            Back to main blog
          </div>

          <div className="category-sec mt-1 flex flex-col md:flex-row justify-center items-center gap-3 md:gap-5 col-span-12 md:col-span-6">
            <div className="flex text-[14px]">{blog.Published} {blog.date}</div>
            <hr className="border w-16 border-white/35 hidden md:block" />
            <div className="cat-center-sec flex flex-wrap justify-center gap-2 items-center">
              Category:
              <div className="bg-white/25 rounded-[14px] px-2.5 py-1 hover:bg-white/40 transition-colors duration-300">{blog.Category1}</div>
              {blog.Category2 && (
                <div className="bg-white/25 rounded-[14px] px-2.5 py-1 hover:bg-white/40 transition-colors duration-300">{blog.Category2}</div>
              )}
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

      {/* Blog Image - With responsive height */}
      <div className="container mx-auto pt-10 w-[90%]">
        <div className="featured-img w-full h-[300px] sm:h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl overflow-hidden">
          <img
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            src={blog.img}
            alt={blog.title}
          />
        </div>
      </div>

      {/* Blog Text - Unchanged */}
      <div className="container mx-auto pt-10 w-[90%]">
        <div className="mx-auto max-w-[800px]">
          <p className="flex items-center">{blog.text}</p>
        </div>
      </div>

      {/* Related Posts - Responsive with original animations */}
      <div className="container mx-auto pt-20 w-[90%]">
        <div className="related-heading mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold">Related Posts</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 pt-10">
          {relatedBlogs.map((relatedBlog, index) => (
            <div 
              key={index} 
              className="col-span-1 flex flex-col hover:-translate-y-2 transition-transform duration-300"
            >
              <Card.Img
                onClick={() =>
                  navigate(`/blog/${slugify(relatedBlog.title)}`, {
                    state: relatedBlog,
                  })
                }
                variant="top"
                className="rounded-t-lg cursor-pointer w-full h-[200px] md:h-[250px] lg:h-[300px] object-cover hover:opacity-90 transition-opacity duration-300"
                src={relatedBlog.img}
              />

              <Card.Body className="border border-white/15 p-6 flex-1 flex flex-col hover:border-white/30 transition-border duration-300">
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
                  className="font-extrabold text-xl md:text-2xl pt-2 flex-1 hover:text-[var(--blue)] cursor-pointer transition-colors duration-300"
                >
                  {relatedBlog.title}
                </Card.Text>

                <Button
                  onClick={() =>
                    navigate(`/blog/${slugify(relatedBlog.title)}`, {
                      state: relatedBlog,
                    })
                  }
                  className="font-bold pt-4 flex items-center cursor-pointer hover:text-[var(--blue)] self-start group bg-transparent border-0 p-0 text-white transition-colors duration-300"
                >
                  Read More
                  <span className='border border-white/45 ml-2 flex justify-center items-center h-6 w-6 rounded-full -rotate-45 text-[var(--blue)] group-hover:rotate-1 group-hover:bg-[var(--blue)] group-hover:text-white group-hover:border-[var(--blue)] duration-300 transition-all'>
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