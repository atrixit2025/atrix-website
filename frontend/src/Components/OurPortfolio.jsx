import React from 'react';
import Button from './Button';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdOutlineArrowOutward } from "react-icons/md";
import project1 from "../assets/PortfolioImage/project1.jpeg";
import project2 from "../assets/PortfolioImage/project2.jpeg";
import project3 from "../assets/PortfolioImage/project3.jpeg";
import project4 from "../assets/PortfolioImage/project4.jpeg";



const OurPortfolio = () => {
    const Protfolio = [
        {
            img: project1,
            title: "Cartoon Bank",
            work: ["3d Animation", "Graphic Design"]
        },
        {
            img: project2,
            title: "World’s Relays",
            work: ["UI & UX Design"]
        },
        {
            img: project3,
            title: "Stickers Pack",
            work: ["UI & UX Design", "Graphic Design"]
        },
        {
            img: project4,
            title: "Diseño Gráfico",
            work: ["Development", "Software"]
        },
        {
            img: project3,
            title: "World's Relays",
            work: ["UI & UX Design"]
        },
    ];

    var settings = {
        dots: true,
        infinite: true,
        // speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
         autoplay: true,
        speed: 2000,
        autoplaySpeed: 5000,

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
               
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    
                    dots: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  
                    dots: true
                }
            }
        ]
    };
    return (
        <div className="Protfolio-section bg-(--darkblack) text-(--whitelight)  relative overflow-hidden">
             <div className='container mx-auto max-w-[1280px] w-[90%]'>
                <div className=' py-14 md:py-28'>
                <div className="md:flex justify-center  gap-10 ">
                    <div className=' font-extrabold md:text-end'>
                        <p className='text-gray '>OUR PORTFOLIO</p>
                        <h2 className="text-6xl font-bold ">Our Work</h2>
                    </div>

                    <div className='w-full max-w-[550px] mt-14'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 477 65">
                            <path fill="#2f2f2f" d="M0.333333 3C0.333333 4.47276 1.52724 5.66667 3 5.66667C4.47276 5.66667 5.66667 4.47276 5.66667 3C5.66667 1.52724 4.47276 0.333333 3 0.333333C1.52724 0.333333 0.333333 1.52724 0.333333 3ZM475 3L475.255 3.42984L476.82 2.5H475V3ZM438.668 65L441.872 60.197L436.111 59.8239L438.668 65ZM3 3.5H475V2.5H3V3.5ZM474.745 2.57016C459.928 11.3742 441.341 27.8789 438.461 60.47L439.457 60.5581C442.3 28.3895 460.613 12.1303 475.255 3.42984L474.745 2.57016Z"></path>
                        </svg>
                    </div>
                    <div className='mt-1  md:text-end'>
                        <div className=' flex md:justify-end'>
                            <Button className="" mybtn={"View All Portfolio"} />
                        </div>
                        <p className='md:w-86 text-gray font-bold mt-4'>
                            Offer a wide range of services to help businesses establish and enhance their online presence.
                        </p>
                    </div>
                </div>


                <div className=" mt-20 "  >
                    <style>
                        {`
                .slick-arrow {
                display:none!important;
                }
                .slick-list{
                overflow:visible;
                pointer-events: none;
                }
                .slick-slide{
                opacity:0.2}
                .slick-active{
                opacity:1;
                 pointer-events: auto;
                }
                .slick-dots li button:before {
                opacity: 1;
                color: #fff;
                border: 1px solid #fff;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                }
                .slick-dots li.slick-active button:before {
                opacity: 1;
                color: #00A657;
                border: 1px solid #00A657;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;

                }
                .slick-dots {
                bottom: -50px;}
                .slick-dots li {
                margin: 0 5px;}
                `}
                    </style>
                    <Slider {...settings} className=''>
                        {Protfolio.map((item, index) => (
                            <div key={index} className=" md:px-4 px-1">
                                <div className='border border-(--black)  rounded-2xl'>
                                    <div className="bg-(--black) pt-8 px-8   rounded-t-lg ">
                                        <ul className="flex flex-wrap gap-1">
                                            {item.work.map((workItem, idx) => (
                                                <li key={idx} className="bg-(--darkblack) duration-300  rounded-full px-4 py-1 text-sm hover:bg-(--green)">
                                                    {workItem}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className='relative'>
                                            <img src={item.img} alt={item.title} className="w-full h-72 object-cover mt-5" />
                                            <button className='bg-(--black)  rounded-full px-2 py-2 text-3xl absolute -bottom-5 right-10 hover:rotate-45 transform duration-300  cursor-pointer hover:bg-(--green)'><MdOutlineArrowOutward /></button>
                                        </div>
                                    </div>
                                    <div className="px-12 py-8  ">
                                        <h3 className="text-2xl font-bold  mb-2 ">{item.title}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
        </div>
    );
};

export default OurPortfolio;



// hover:scale-105 transition-transform duration-300