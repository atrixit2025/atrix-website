import React from 'react';
import './LogoSlider.css'
import logo1 from "../../assets/LogoSliderImage/logo1.webp"
import logo2 from "../../assets/LogoSliderImage/logo2.webp"
import logo3 from "../../assets/LogoSliderImage/logo3.webp"
import logo4 from "../../assets/LogoSliderImage/logoo4.webp"
import logo5 from "../../assets/LogoSliderImage/logo5.webp"
import logo6 from "../../assets/LogoSliderImage/logo6.webp"
import logo7 from "../../assets/LogoSliderImage/logo7.webp"
import logo8 from "../../assets/LogoSliderImage/logo8.webp"
import logo9 from "../../assets/LogoSliderImage/logo9.webp"
import logo10 from "../../assets/LogoSliderImage/logo10.webp"
import logo11 from "../../assets/LogoSliderImage/logo11.webp"
import logo12 from "../../assets/LogoSliderImage/logo12.webp"
import logo13 from "../../assets/LogoSliderImage/logo13.webp"
import logo14 from "../../assets/LogoSliderImage/logo14.webp"
import logo15 from "../../assets/LogoSliderImage/logo15.webp"
import logo16 from "../../assets/LogoSliderImage/logo16.webp"


const LogoSlider = () => {
  const Logoimage = [
    { id: 1, img:logo1 },
    { id: 2, img:logo2 },
    { id: 3, img:logo3 },
    { id: 4, img:logo4 },
    { id: 5, img:logo5 },
    { id: 6, img:logo6 },
    { id: 7, img:logo7 },
    { id: 8, img:logo8 },
    { id: 9, img:logo9 },
    { id: 10, img: logo10 },
    { id: 11, img: logo11 },
    { id: 12, img: logo12 },
    { id: 13, img: logo13 },
    { id: 14, img: logo14 },
    { id: 15, img: logo15 },
    { id: 16, img: logo16 },
  ];

  return (
    <div className='container mx-auto max-w-full pt-14 '>
  <h6 className='flex justify-center items-center mb-10 font-bold text-(--gray) px-5'>OVER 1K+ SOFTWARE BUSINESSES GROWING WITH Atrix IT Solutions</h6>
    
    <div className='marquee-2'>
      
      <div className='marquee-content'>
        {Logoimage.map((image) => (
          <div key={image.id} className='marquee-img'>
            <img src={image.img} alt={`Logo ${image.id}`} />
          </div>
        ))}
      
        </div>
        <div  className='marquee-content'>
        {Logoimage.map((image) => (
          <div key={`${image.id}-copy`} className='marquee-img'>
            <img src={image.img} alt={`Logo ${image.id}`} />
          </div>
        ))}
          
      </div>
    </div>
    </div>
  );
};

export default LogoSlider;