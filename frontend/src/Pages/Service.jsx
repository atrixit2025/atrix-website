import React, { useState } from 'react'
import ServiceHeroBanner from '../Components/services/ServiceHeroBanner'
import ProcessSteps from '../Components/services/ProcessSteps'
import ServicesCards from '../Components/services/ServicesCards'
import OurPortfolio from '../Components/OurPortfolio'
import WhyNeedBranding from '../Components/services/WhyNeedBranding'
import WhyAtrix from '../Components/services/whyAtrix'
import ServiceCta from '../Components/services/ServiceCta'
import FaqSection from '../Components/FaqSection'
import { FaQuoteLeft } from "react-icons/fa";
import { FaQuoteRight } from "react-icons/fa";
import ProcessCards from '../Components/ProcessCards'
import ServiceFrom from '../Components/services/ServiceFrom'
import WebDevelopment from '../Components/services/WebDevelopment'

import ServicesData from '../data/ServicesData'
import { useParams } from "react-router-dom";



const Service = () => {


    const {service_id } = useParams();
    // console.log("service cat" , service_id)
    const filteredService = ServicesData.find(item => item.service_id === service_id )
    // console.log( "filtered service" , filteredService)



    // console.log("All services:", ServicesData);
    // const { projectCat , setProjectCat   } =  useState()
    // const filteredService = ServicesData.find(item => item.cat_id  === service_cat )
    // console.log("service cat" , service_cat)
    // console.log( "filtered service" , filteredService)
    // ServicesData.map((item, index) => (
    //     console.log( item.cat_title.toLowerCase().replace(/[^a-z0-9]/g, '') )
    // ) )
    // console.log (filteredProject.title)
    // console.log("Type of service_cat:", typeof service_cat);
    // console.log("Type of cat_id:", typeof ServicesData[0]?.cat_id);



    return (
        <div className="pt-[150px] ">
            <ServiceHeroBanner></ServiceHeroBanner>
            <div className="container mx-auto mt-40">
                <h1 className='text-9xl font-bold text-center' >{filteredService.service_title }</h1>
            </div>
            <WebDevelopment secData = {filteredService.service_description}  ></WebDevelopment>
            <ServicesCards></ServicesCards>
            <WhyNeedBranding></WhyNeedBranding>
            <WhyAtrix></WhyAtrix>
            <ServiceFrom></ServiceFrom>
            <ProcessCards></ProcessCards>
            {/* <ProcessSteps></ProcessSteps> */}
            <div className="container mx-auto my-40 ">
                <h2 className='max-w-[800px] mx-auto text-5xl font-bold' > <span className='relative'> <FaQuoteLeft className=' absolute -top-0.5  -translate-y-full  text-(--blue) text-2xl mb-8  ' />  We create innovative design solutions that inspire. Work with a team that makes you stand out. <FaQuoteRight className=' absolute right-0  text-(--blue) text-2xl mt-2 ' /></span> </h2>
            </div>
            <OurPortfolio></OurPortfolio>
            <FaqSection></FaqSection>
            <ServiceCta></ServiceCta>
        </div>
    )
}

export default Service