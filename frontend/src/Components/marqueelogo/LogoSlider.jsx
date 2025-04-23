import React from 'react';
import './LogoSlider.css'
import logo1 from "../../assets/LogoSliderImage/logo1.svg"
import logo2 from "../../assets/LogoSliderImage/logo2.svg"
import logo3 from "../../assets/LogoSliderImage/logo3.svg"
import logo4 from "../../assets/LogoSliderImage/logo4.svg"
import logo5 from "../../assets/LogoSliderImage/logo5.svg"



const LogoSlider = () => {
  const Logoimage = [
    { id: 1, img: logo1 },
    { id: 2, img: logo2 },
    { id: 3, img: logo3 },
    { id: 4, img: logo4 },
    { id: 5, img: logo5 },
    
  ];

  return (
    <div className='container mx-auto max-w-full '>
      <h6 className='flex justify-center items-center mb-10 font-bold text-(--white) px-5'>OVER 1K+ SOFTWARE BUSINESSES GROWING WITH Atrix IT Solutions</h6>

      <div className='marquee-2'>

        <div className='marquee-content'>
          {Logoimage.map((image) => (
            <div key={image.id} className='marquee-img'>
              <img src={image.img} alt={`Logo ${image.id}`} />
            </div>
          ))}

        </div>
        <div className='marquee-content'>
          {Logoimage.map((image) => (
            <div key={`${image.id}-copy`} className='marquee-img'>
              <img src={image.img} alt={`Logo ${image.id}`} />
            </div>
          ))}

        </div>
        <div className='marquee-content'>
          {Logoimage.map((image) => (
            <div key={`${image.id}-copy`} className='marquee-img'>
              <img src={image.img} alt={`Logo ${image.id}`} />
            </div>
          ))}

        </div>
        <div className='marquee-content'>
          {Logoimage.map((image) => (
            <div key={`${image.id}-copy`} className='marquee-img'>
              <img src={image.img} alt={`Logo ${image.id}`} />
            </div>
          ))}

        </div>
        <div className='marquee-content'>
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