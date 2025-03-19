import React from 'react';
import bg_img from '../../assets/about-bg.svg';

const ContactHero = () => {
    return (
        <div className='bg-no-repeat bg-cover bg-[bottom center] ' style={{ backgroundImage: `url(${bg_img})`, backgroundPosition: 'bottom center', backgroundSize: '1000px auto', }} >
            <div className="container w-[90%] mx-auto text-center pt-40 pb-28 " >
                <h1 className='text-6xl  font-black'>Contact Us</h1>
                <p className='max-w-[800px] mx-auto mt-2'>
                    Every Project start with a Plan
                </p>
            </div>
        </div >
    );
};

export default ContactHero;
