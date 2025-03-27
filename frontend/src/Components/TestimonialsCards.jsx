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
        settings: { slidesToShow: 2, slidesToScroll: 1, dots: true, arrows: true }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1, slidesToScroll: 1, dots: true, arrows: true }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1, dots: true, arrows: true }
      }
    ]
  };
  

  return (
    <div className="testimonial-container bg-darkblack text-whitelight relative overflow-hidden">
      <div className="container mx-auto w-[90%] ">
        <div className="py-14 md:py-28">
          <div className="testimonial-heading text-center">
            <p className="text-xl">Our Testimonials</p>
            <h1 className="text-6xl font-bold pt-2">What Our Clients Say</h1>
          </div>

          <div className="testimonial-slider mt-22">
            <style>
              {`
              .testimonial-slider .slick-arrow { margin-top: 200px; }
              .testimonial-slider .slick-list { overflow: visible; pointer-events: none; }
              .testimonial-slider .slick-slide { opacity: 0.2; transform: translateY(-50px); transition: transform 0.5s ease-in-out; }
              .testimonial-slider .slick-active { transform: translateY(-150px); opacity: 1; pointer-events: auto; }
              .testimonial-slider .slick-center { transform: translateY(-50px); transition: transform 0.6s ease-in-out; }
              `}
            </style>

            <Slider {...settings}>
              {testimonials.map((item, index) => (
                <div
                  key={index}
                  className="testimonial-card md:px-4 px-1 mt-46"
                >
                  <div className="border border-black rounded-2xl p-6 bg-white/10 ">
                    <div className="flex items-center gap-5">
                      <img
                        src={item.img}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h2 className="text-xl font-bold">{item.UserName}</h2>
                        <p className="text-white/70 mt-1">{item.Subheading}</p>
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
          <hr className="  -z-10 relative mt-9" />
        </div>
      
      </div>
    </div>
  );
};

export default TestimonialsCards;
