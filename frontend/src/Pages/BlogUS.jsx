import React from "react";
import HeroCommon from "../Components/HeroCommon";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import img1 from "../assets/BlogCrads/blog-st-img10-600x400-1.webp";
import img2 from "../assets/BlogCrads/blog-st-img11-600x400-1.webp";
import img3 from "../assets/BlogCrads/blog-st-img12-600x400-1.webp";

import { GoCalendar } from "react-icons/go";
import { FaArrowRight } from "react-icons/fa6";
import Pagination from "../Components/Pagination";

const herodata = [
  {
    title: "Blog",
    desc: "",
  },
];

const blogData = [
  {
    id: 1,
    img: img1,
    date: "15 August, 2024",
    text: "Some quick example text to build on the card titmple text to build on the card titmple text to build on the card titmple text to build on the card title and make up the bulk of the card's content.",
  },
  {
    id: 2,
    img: img2,
    date: "15 August, 2024",
    text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
  },
  {
    id: 3,
    img: img3,
    date: "15 August, 2024",
    text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
  },
  {
    id: 4,
    img: img1,
    date: "15 August, 2024",
    text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
  },
  {
    id: 5,
    img: img2,
    date: "15 August, 2024",
    text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
  },
  {
    id: 6,
    img: img3,
    date: "15 August, 2024",
    text: "Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.",
  },
];

const BlogUS = () => {
  return (
    <>
      <HeroCommon heroData={herodata[0]} />

      <div className="container mx-auto  pt-10 px-10">
        {[0, 3].map((startIndex) => (
          <div key={startIndex} className="flex gap-10  pt-10">
            {blogData.slice(startIndex, startIndex + 3).map((blog) => (
              <div key={blog.id} className=" w-[33.3%] flex flex-col ">
                
                  <Card.Img variant="top rounded-t-lg" src={blog.img} />

                  <Card.Body className="border border-white/15 p-6 flex-1 flex flex-col ">
                    <Card.Title className="flex items-center gap-2">
                      <GoCalendar />
                      {blog.date}
                    </Card.Title>

                    <Card.Text className="font-extrabold text-2xl pt-2 flex-1">
                      {blog.text}
                    </Card.Text>

                    <Button className="font-bold pt-2 flex items-center gap-2 cursor-pointer hover:text-(--blue)">
                      Read More <FaArrowRight />
                    </Button>

                  </Card.Body>
            
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="PAGINATION-SEC container mx-auto justify-items-center pt-20">
        <Pagination />
      </div>
    </>
  );
};

export default BlogUS;
