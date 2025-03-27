import React, { useState } from "react";
import HeroCommon from "../Components/HeroCommon";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Pagination from "../Components/Pagination";
import { GoCalendar } from "react-icons/go";
import { FaArrowRight } from "react-icons/fa6";

import img1 from "../assets/BlogCrads/blog-st-img10-600x400-1.webp";
import img2 from "../assets/BlogCrads/blog-st-img11-600x400-1.webp";
import img3 from "../assets/BlogCrads/blog-st-img12-600x400-1.webp";

const herodata = [{ title: "Blog", desc: "" }];

const blogData = [
  {
    id: 1,
    img: img1,
    Category1: "blog",
    Category2: " educartion",
    Published: "Published on :",
    date: "15 August, 2024",
    title: "Welcome To our Blog1",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit quos, asperiores architecto cum fugiat ex consequatur corrupti dicta totam earum atque dolores, eum molestias! Exercitationem modi incidunt dolorem? Totam, maiores.Laboriosam architecto consectetur, earum dicta minus eius! Earum, deleniti omnis. Perferendis, impedit? Officiis, repellat. Sapiente, consequuntur voluptatum, reiciendis iure voluo, aspernatur nemo. Sit aspernatur consequuntur fugiat ut.",
  },
  {
    id: 2,
    img: img2,
    Category1: "blog",
    Category2: " educartion",
    Published: "Published on :",
    date: "15 August, 2024",
    title: "Welcome To our Blog2",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit quos, asperiores architecto cum fugiat ex consequatur corrupti dicta totam earum atque dolores, eum molestias! Exercitationem modi incidunt dolorem? Totam, maiores.Laboriosam architecto consectetur, earum dicta minus eius! Earum, deleniti omnis. Perferendis, impedit? Officiis, repellat. Sapiente, consequuntur voluptatum, reiciendis iure voluo, aspernatur nemo. Sit aspernatur consequuntur fugiat ut.",
  },
  {
    id: 3,
    img: img3,
    Category1: "blog",
    Category2: " educartion",
    Published: "Published on :",
    date: "15 August, 2024",
    title: "Welcome To our Blog3",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit quos, asperiores architecto cum fugiat ex consequatur corrupti dicta totam earum atque dolores, eum molestias! Exercitationem modi incidunt dolorem? Totam, maiores.Laboriosam architecto consectetur, earum dicta minus eius! Earum, deleniti omnis. Perferendis, impedit? Officiis, repellat. Sapiente, consequuntur voluptatum, reiciendis iure voluo, aspernatur nemo. Sit aspernatur consequuntur fugiat ut.",
  },
  {
    id: 4,
    img: img1,
    Category1: "blog",
    Category2: " educartion",
    Published: "Published on :",
    date: "15 August, 2024",
    title: "Welcome To our Blog85",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit quos, asperiores architecto cum fugiat ex consequatur corrupti dicta totam earum atque dolores, eum molestias! Exercitationem modi incidunt dolorem? Totam, maiores.Laboriosam architecto consectetur, earum dicta minus eius! Earum, deleniti omnis. Perferendis, impedit? Officiis, repellat. Sapiente, consequuntur voluptatum, reiciendis iure voluo, aspernatur nemo. Sit aspernatur consequuntur fugiat ut.",
  },
  {
    id: 5,
    img: img2,
    Category1: "blog",
    Category2: " educartion",
    Published: "Published on :",
    date: "15 August, 2024",
    title: "Welcome To our Blog7",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit quos, asperiores architecto cum fugiat ex consequatur corrupti dicta totam earum atque dolores, eum molestias! Exercitationem modi incidunt dolorem? Totam, maiores.Laboriosam architecto consectetur, earum dicta minus eius! Earum, deleniti omnis. Perferendis, impedit? Officiis, repellat. Sapiente, consequuntur voluptatum, reiciendis iure voluo, aspernatur nemo. Sit aspernatur consequuntur fugiat ut.",
  },
  {
    id: 6,
    img: img3,
    Category1: "blog",
    Category2: " educartion",
    Published: "Published on :",
    date: "15 August, 2024",
    title: "Welcome To our Blog587",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit quos, asperiores architecto cum fugiat ex consequatur corrupti dicta totam earum atque dolores, eum molestias! Exercitationem modi incidunt dolorem? Totam, maiores.Laboriosam architecto consectetur, earum dicta minus eius! Earum, deleniti omnis. Perferendis, impedit? Officiis, repellat. Sapiente, consequuntur voluptatum, reiciendis iure voluo, aspernatur nemo. Sit aspernatur consequuntur fugiat ut.",
  },
  {
    id: 7,
    img: img1,
    Category1: "blog",
    Category2: " educartion",
    Published: "Published on :",
    date: "16 August, 2024",
    title: "Welcome To our Blog8",
    text: "Extra blog content...",
  },
  {
    id: 8,
    img: img3,
    Category1: "blog",
    Category2: " educartion",
    Published: "Published on :",
    date: "16 August, 2024",
    title: "Welcome To our Blog9",
    text: "Extra blog content...",
  },
  {
    id: 9,
    img: img2,
    Category1: "blog",
    Category2: " educartion",
    Published: "Published on :",
    date: "16 August, 2024",
    title: "Welcome To our Blog10",
    text: "Extra blog content...",
  },
  {
    id: 10,
    img: img3,
    Category1: "blog",
    Category2: " educartion",
    Published: "Published on :",
    date: "16 August, 2024",
    title: "Welcome To our Blog10",
    text: "Extra blog content...",
  },
  {
    id: 11,
    img: img1,
    Category1: "blog",
    Category2: " educartion",
    Published: "Published on :",
    date: "16 August, 2024",
    title: "Welcome To our Blog10",
    text: "Extra blog content...",
  },
  {
    id: 12,
    img: img2,
    Category1: "blog",
    Category2: " educartion",
    Published: "Published on :",
    date: "16 August, 2024",
    title: "Welcome To our Blog10",
    text: "Extra blog content...",
  },
  {
    id: 13,
    img: img3,
    Category1: "blog",
    Category2: " educartion",
    Published: "Published on :",
    date: "16 August, 2024",
    title: "Welcome To our Blog10",
    text: "Extra blog content...",
  },
  {
    id: 14,
    img: img1,
    Category1: "blog",
    Category2: " educartion",
    Published: "Published on :",
    date: "16 August, 2024",
    title: "Welcome To our Blog10",
    text: "Extra blog content...",
  },
];

const BlogUS = () => {
  const navigate = useNavigate();
  const blogsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogData.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogData.length / blogsPerPage);

  return (
    <>
      <HeroCommon heroData={herodata[0]} />
      <div className="container mx-auto w-[90%] pt-10 px-10">
        <div className="grid grid-cols-3 top  gap-10 -mx-10">
          {currentBlogs.map((blog) => (
            <div key={blog.id} className="w-full flex flex-col">

<Card.Img  
  onClick={() =>
    navigate(
      `/blog/${blog.title.replace(/\s+/g, "-").toLowerCase()}`,
      { state: blog }
    )}
  className="rounded-t-lg w-full object-cover !important cursor-pointer"   
  variant="top" 
  src={blog.img} 
/>

              <Card.Body className="border border-white/15 p-6 flex-1 flex flex-col">
                <Card.Title className="flex items-center gap-2">
                  <GoCalendar /> {blog.date}
                </Card.Title>
                <Card.Text onClick={() =>
                    navigate(
                      `/blog/${blog.title.replace(/\s+/g, "-").toLowerCase()}`,
                      { state: blog }
                    )
                    }
                    className="font-extrabold  text-2xl pt-2 flex-1 hover:text-(--blue) cursor-pointer">
                  {blog.title}
                </Card.Text>

                <p 
                  onClick={() =>
                    navigate(
                      `/blog/${blog.title.replace(/\s+/g, "-").toLowerCase()}`,
                      { state: blog }
                    )
                  }
                  className="font-bold pt-4 self-start  flex items-center  cursor-pointer hover:text-(--blue)   group "
                >
                  {" "}
                  Read More{" "}
                  <span className="border border-white/45 ml-2 flex justify-center items-center h-6 w-6 rounded-full  -rotate-45 text-[var(--blue)] group-hover:rotate-1 group-hover:bg-(--blue) group-hover:text-(--white) group-hover:border-(--blue)   duration-300">
                    <FaArrowRight />
                  </span>
                </p>

              </Card.Body>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Component */}
      <div className="PAGINATION-SEC container mx-auto justify-items-center pt-20">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
};

export default BlogUS;
export { blogData };
