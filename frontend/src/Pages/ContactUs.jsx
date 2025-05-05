import React from 'react'
// import ContactHero from '../Components/Contact_us/ContactHero'
// import MapAddress from '../Components/Contact_us/MapAddress'
import ContactForm from '../Components/Contact_us/ContactForm'
import ContactDetails from '../Components/Contact_us/ContactDetails'
import HeroCommon from '../Components/HeroCommon'


const herodata = [
    {
        title: "Contact Us",
        desc: "",
    }
];


const ContactUs = () => {
    return (
        <div>
            <HeroCommon heroData={herodata[0]} />
            <ContactForm></ContactForm>
            <ContactDetails></ContactDetails>
        </div>
    )
}

export default ContactUs