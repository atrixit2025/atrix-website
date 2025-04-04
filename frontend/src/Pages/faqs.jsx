import React from 'react'
import HeroCommon from '../Components/HeroCommon';
import FaqSec from '../assets/faqs/FaqSec';

const herodata = [
    {
        title: "Frequently asked questions",
        desc: "",
    }
];



const faqs = () => {
    return (
        <div>
            <HeroCommon heroData={herodata[0]} />
            <FaqSec></FaqSec>
        </div>
    )
}

export default faqs