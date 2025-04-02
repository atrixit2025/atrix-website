import React from 'react'
import ServiceHeroSlider from '../Components/services/ServiceHeroSlider'
import ProcessSteps from '../Components/services/ProcessSteps'
import ServicesCards from '../Components/services/ServicesCards'

const Service = () => {
    return (
        <div className="pt-[150px] ">
            <ServiceHeroSlider></ServiceHeroSlider>
            <ProcessSteps></ProcessSteps>
            <ServicesCards></ServicesCards>
        </div>
    )
}

export default Service