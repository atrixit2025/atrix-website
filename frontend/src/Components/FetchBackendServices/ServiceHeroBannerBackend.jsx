
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image_1 from '../../assets/service-img2.jpg'
import image_2 from '../../assets/service-img2.jpg'
import image_3 from '../../assets/service-img2.jpg'
import image_4 from '../../assets/service-img2.jpg'
import image_5 from '../../assets/service-img2.jpg'
import './ServiceHeroBannerBackend.css'
import About_video from "../../assets/About_video.mp4";
import banner_img from '../../assets/portfolio/project.avif'





const sliderImages = [image_1, image_2, image_3, image_4, image_5];
// const bannerVideo 

const ServiceHeroBannerBackend = ({HeroBannerData}) => {

    const [activeHero, SetActiveHero] = useState('video')
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000

    };



    return (
        <>
        
        <div className=" Service-hero-slider "  >
         {/* <img src={BannerData.bannerImage} alt="" className=" h-full w-full object-cover" /> */}

            {
                activeHero === "video" ? (
                    /* video-section */
                    <div className="video-sec mx-6">
                        <div className="pointer-events-none  ">
                        <img src={HeroBannerData.bannerImage} alt="" className=" h-[700px] w-full object-cover" 

                            
                            />
                        </div>
                    </div>
                )
                    : activeHero === "slider" ? (
                        /* Banner slider  */
                        < Slider {...settings}>
                            {sliderImages.map((item, index) => (
                                <div className="w-full h-[80vh]" > <img src={BannerData.bannerImage} alt="" className=" h-full w-full object-cover" /> </div>
                            ))}
                        </Slider>
                    )
                        : (
                            /* simple image hero  */

                            <div className="relative py-36 bg-no-repeat bg-cover bg-center  text-white overflow-hidden h-[80vh] flex flex-col justify-center items-center"
                                style={{
                                    backgroundImage: `url(${banner_img})`,

                                }}>

                                <div className="absolute inset-0 bg-black/40 "></div>

                                <div className="relative z-10 text-center  ">
                                    <h1 className='text-7xl font-bold '>Services</h1>

                                </div>
                            </div>
                        )
            }
        </div >
        </>

    )
}

export default ServiceHeroBannerBackend








