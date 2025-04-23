
import React, { useState } from 'react'
import { FaQuoteLeft } from "react-icons/fa";
import { FaQuoteRight } from "react-icons/fa";

import ServiceHeroBannerBackend from './ServiceHeroBannerBackend'
import WebDevelopmentBackend from './WebDevelopmentBackend'
import ServicesCardsBackend from './ServicesCardsBackend'
import WhyNeedBrandingBackend from './WhyNeedBrandingBackend'
import WhyAtrixBackend from './WhyAtrixBackend'
import ServiceFromBackend from './ServiceFromBackend'
import ProcessCardsBackend from './ProcessCardsBackend'
import OurPortfolioBackend from './OurPortfolioBackend'
import FaqSectionBackend from './FaqSectionBackend'
import ServiceCta from '../services/ServiceCta';
import { useLocation } from 'react-router-dom';



const SinglePageBackend = () => {

    const { state } = useLocation();

    const service = state?.service;

   


    return (
        <div className="pt-[150px] ">
            <ServiceHeroBannerBackend
                HeroBannerData={{ bannerImage: service?.bannerImage || "bannerImage Not Found" }} />

            {service?.textToImageData && (
                <WebDevelopmentBackend data={service.textToImageData} />
            )}

            {service?.headerContent && (
                <ServicesCardsBackend content={service.headerContent} />
            )}


            <WhyNeedBrandingBackend WhyNeedata={{data: service.whyNeed ,title:service.title}} />
            <WhyAtrixBackend  whyAtrixdata={service.whyAtrix}/>
            <ServiceFromBackend />
            <ProcessCardsBackend dataprocess={service.process} />
            {/* <ProcessSteps></ProcessSteps> */}
            <div className="container mx-auto my-40 ">
                <h2 className='max-w-[800px] mx-auto text-5xl font-bold' > <span className='relative'> <FaQuoteLeft className=' absolute -top-0.5  -translate-y-full  text-(--blue) text-2xl mb-8  ' />{service.quote} <FaQuoteRight className=' absolute right-0  text-(--blue) text-2xl mt-2 ' /></span> </h2>
            </div>
            <OurPortfolioBackend />
            <FaqSectionBackend FAQCategories={service.faqCategories || []} />
            <ServiceCta></ServiceCta>
        </div>
    )
}

export default SinglePageBackend