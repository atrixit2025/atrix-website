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
import { Link, useParams } from "react-router-dom";
import { RxArrowTopRight } from "react-icons/rx";



const Service = () => {
    
    const { service_id } = useParams();
    const filteredService = ServicesData.find(item => item.service_id === service_id);
    console.log("filtered service", filteredService);

    return (
        <div className="pt-[150px] ">
            <ServiceHeroBanner></ServiceHeroBanner>
            <div className="container mx-auto mt-40">
                <h1 className='text-7xl font-bold text-center' >{filteredService.service_title}</h1>
            </div>
            <WebDevelopment secData={filteredService}  ></WebDevelopment>
            <ServicesCards secData={filteredService}  ></ServicesCards>
            <WhyNeedBranding secData={filteredService}  ></WhyNeedBranding>
            <WhyAtrix secData={filteredService}  ></WhyAtrix>
            <ServiceFrom></ServiceFrom>
            <ProcessCards secData={filteredService}  ></ProcessCards>
            {/* <ProcessSteps></ProcessSteps> */}
            <div className="container mx-auto my-16 ">
                <h2 className='max-w-[800px] mx-auto text-5xl font-bold' > <span className='relative'> <FaQuoteLeft className=' absolute -top-0.5  -translate-y-full  text-(--blue) text-2xl mb-8  ' /> {filteredService.quote} <FaQuoteRight className=' absolute right-0  text-(--blue) text-2xl mt-2 ' /></span> </h2>
            </div>
            <OurPortfolio></OurPortfolio>
            <FaqSection secData={filteredService}  ></FaqSection>
            {/* <ServiceCta></ServiceCta> */}
            {/* CTA-section */}
            <div className="container mx-auto mt-28 ">
                <div className="row grid grid-cols-1 md:grid-cols-12 mt-10 bg-(--blue) rounded-xl p-6 md:p-10">

                    {/* Text Section */}
                    <div className="md:col-span-10 col-span-12 text-center md:text-left">
                        <h3 className="text-white text-3xl md:text-4xl font-bold">
                            Lorem ipsum dolor sit.
                        </h3>
                        <p className=" mt-5 max-w-[800px]"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, officiis. Suscipit officia veniam voluptatum sapiente, quas modi repudiandae possimus consequuntur ipsum corrupti iusto, recusandae debitis sit ut, tempore tempora nihil!</p>
                    </div>

                    {/* Button Section */}
                    <div className="md:col-span-2 col-span-12 flex justify-center items-center md:justify-end mt-4 md:mt-0 ">
                        <Link to='/contact-us' className="bg-(--white)  font-extrabold text-(--blue) px-4 py-2  duration-300  rounded-lg  cursor-pointer  flex items-center gap-2 group hover:scale-104  ">Contact us!<span className="  ">
                            <RxArrowTopRight className=" group-hover:rotate-45 group-hover:scale-140 duration-250 " />
                        </span></Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Service