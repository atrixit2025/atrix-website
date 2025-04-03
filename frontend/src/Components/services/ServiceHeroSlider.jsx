import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image_1 from '../../assets/service-img2.jpg'
import image_2 from '../../assets/service-img2.jpg'
import image_3 from '../../assets/service-img2.jpg'
import image_4 from '../../assets/service-img2.jpg'
import image_5 from '../../assets/service-img2.jpg'
import ColoredButton from "../ColoredButton";



const sliderImages = [image_1, image_2, image_3, image_4, image_5];

const ServiceHeroSlider = () => {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className="ServiceHeroSlider relative overflow-hidden " >
            <Slider {...settings}>
                {sliderImages.map((image, index) => (
                    <div className="aspect-[16/4] overflow-hidden relative"  >
                        {/* <div className="w-full h-full flex justify-center items-end" >
                        </div> */}
                        <div className="absolute inset-0  z-10 " > <img src={image} alt="" className="w-full h-full object-cover" /> </div>
                    </div>

                ))}
            </Slider>
            <div className=" absolute z-20 bottom-12 left-1/2 -translate-x-1/2 " >
                <ColoredButton buttonName={"Let's Talk"} buttonLink={"#"}  ></ColoredButton>
            </div>

        </div>
    )
}

export default ServiceHeroSlider