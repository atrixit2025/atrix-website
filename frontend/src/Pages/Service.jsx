import React from 'react'
import ServiceHeroSlider from '../Components/services/ServiceHeroSlider'
import ProcessSteps from '../Components/services/ProcessSteps'
import ServicesCards from '../Components/services/ServicesCards'
import OurPortfolio from '../Components/OurPortfolio'
import WhyNeedBranding from '../Components/services/WhyNeedBranding'

const Service = () => {
    return (
        <div className="pt-[150px] ">
            <ServiceHeroSlider></ServiceHeroSlider>
            {/* <ProcessSteps></ProcessSteps> */}

            <ServicesCards></ServicesCards>
            <WhyNeedBranding></WhyNeedBranding>
            <OurPortfolio></OurPortfolio>

        </div>
    )
}

export default Service