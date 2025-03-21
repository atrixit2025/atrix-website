<<<<<<< Updated upstream
<<<<<<< Updated upstream
import React from 'react';
import RiseWithUs from '../Components/career/RiseWithUs';
import CounterSec from '../Components/career/CounterSec';
import ValueCards from '../Components/career/ValueCards';
import PerksAtrix from '../Components/career/PerksAtrix';
import Roles from '../Components/career/Roles';
import CareerFormSec from '../Components/career/FormSec';
import HeroCommon from '../Components/HeroCommon';

const herodata = [ // ✅ Added "const"
    {
        title: "Careers",
        desc: "",
    }
];

const Careers = () => {
    return (
        <div>
            <HeroCommon heroData={herodata[0]} />
            <RiseWithUs />
            <CounterSec />
            <ValueCards />
            <PerksAtrix />
            <Roles />
            <CareerFormSec />
        </div>
    );
};

export default Careers;
=======
=======
>>>>>>> Stashed changes
import React from 'react'
import RiseWithUs from '../Components/careers/RiseWithUs'

const Careers = () => {
    return (
        <>
            <div className="container mx-auto max-w-[90%] pt-44 ">
                <h1 className=' text-7xl text-center' >Career</h1>
            </div>
            <RiseWithUs></RiseWithUs>
        </>

    )
}

<<<<<<< Updated upstream
export default Careers
>>>>>>> Stashed changes
=======
export default Careers
>>>>>>> Stashed changes
