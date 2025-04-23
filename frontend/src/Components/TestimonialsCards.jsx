import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./testi.css";
import project1 from "../assets/PortfolioImage/imgpsh_fullsize_anim (1).png";
import project2 from "../assets/PortfolioImage/imgpsh_fullsize_anim (2).png";
import project3 from "../assets/PortfolioImage/imgpsh_fullsize_anim (3).png";
import project4 from "../assets/PortfolioImage/imgpsh_fullsize_anim.png";


const TestimonialsCards = () => {
  const testimonials = [
    {
      img: project1,
      UserName: "Cartoon Bank",
      Subheading: "3D Animation",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quosLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quosLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quosLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quosLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quosLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quosLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos",
    },
    {
      img: project2,
      UserName: "World’s Relays",
      Subheading: "3D Animation",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quosLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quosLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quosLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quosLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quosLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quosLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos",
    },
    {
      img: project3,
      UserName: "Stickers Pack",
      Subheading: "3D Animation",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quosLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quosLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quosLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quosLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quosLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quosLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos",
    },
    {
      img: project4,
      UserName: "Diseño Gráfico",
      Subheading: "3D Animation",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quosLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quosLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quosLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quosLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quosLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quosLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos",
    },
  ];

  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 480,
    autoplaySpeed: 10000,
    centerMode: true,
    centerPadding: "0px",
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
          arrows: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: true,
        },
      },
    ],
  };

  return (
    <div className="testimonial-container bg-darkblack text-whitelight relative overflow-hidden">
      <div className="container mx-auto pt-10 ">
        <div className="py-10 md:py-22">
          <div className="testimonial-heading text-center">
            <p className="text-xl">Our Testimonials</p>
            <h1 className="text-6xl font-bold pt-2">What Our Clients Say</h1>
          </div>

          <div className="testimonial-slider pt-5">


            <Slider {...settings}>
              {testimonials.map((item, index) => (
                <div
                  key={index}
                  className="testimonial-card md:px-2 px-1 mt-46"
                >
                  <div className="rounded-2xl p-10  bg-(--black)">
                    <div className="flex items-center gap-3">
                      <div>
                        <img
                          src={item.img}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      </div>

                      <div className="flex flex-col justify-center">
                        <h2 className="text-xl font-bold tracking-tighter leading-2 mt-2 ">{item.UserName}</h2>
                        <p className="text-white/70 mt-1">{item.Subheading}</p>
                        <span className="absolute right-20 text-5xl text-white/15" ><i class="fa-solid fa-quote-right"></i></span>
                      </div>
                    </div>
                    <p className="testimonial-text text-white/50 mt-3">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          {/* <hr className="  -z-10 relative mt-9" /> */}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCards;
