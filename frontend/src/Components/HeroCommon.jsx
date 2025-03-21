import React from 'react'
import bg_img from '../assets/about-bg.svg';





const HeroCommon = ({ heroData }) => {
    return (
        <div className='bg-no-repeat bg-cover bg-[bottom center] ' style={{ backgroundImage: `url(${bg_img})`, backgroundPosition: 'bottom center', backgroundSize: '1000px auto', }} >
            <div className="container w-[90%] mx-auto text-center pt-40 pb-28 " >
                <h1 className='font-bold text-4xl md:text-6xl lg:text-9xl'>{heroData.title}</h1>
                <p className='mx-auto max-w-3xl text-sm md:text-base lg:text-lg text-white/55 mt-4'>
                    {heroData.desc}
                </p>
            </div>
        </div >
    )
}

export default HeroCommon