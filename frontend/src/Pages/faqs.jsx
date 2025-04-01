import React, { useEffect } from 'react'
import HeroCommon from '../Components/HeroCommon';
import FaqSec from '../assets/faqs/FaqSec';

const herodata = [
    {
        title: "Frequently asked questions",
        desc: "Got a question? We have the answers you need. Check out our FAQs for clear and easy explanations.",
    }
];



const faqs = () => {

    useEffect(() => {
        window.scroll(0, 0)
    })

    return (
        <div>
            <HeroCommon heroData={herodata[0]} />
            <FaqSec></FaqSec>
        </div>
    )
}

export default faqs