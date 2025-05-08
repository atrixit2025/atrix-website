import React from 'react';
import bg_img from '../../assets/about-bg.svg';

const ContactHero = () => {
    return (
        <div className='bg-no-repeat bg-cover bg-[bottom center] ' style={{ backgroundImage: `url(${bg_img})`, backgroundPosition: 'bottom center', backgroundSize: '1000px auto', }} >
            <div className="container mx-auto text-center pt-40 pb-28 " >
                <h1 className='font-bold text-4xl md:text-6xl lg:text-9xl'>Contact Us</h1>
                <p className='mx-auto max-w-3xl text-sm md:text-base lg:text-lg text-white/55 mt-4'>
                    Every Project start with a Plan
                </p>
            </div>
        </div >
    );
};

export default ContactHero;
