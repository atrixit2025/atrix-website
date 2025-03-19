import React from 'react'
import ContactHero from '../Components/Contact_us/ContactHero'
import MapAddress from '../Components/Contact_us/MapAddress'
import ContactForm from '../Components/Contact_us/ContactForm'
import ContactDetails from '../Components/Contact_us/ContactDetails'

const ContactUs = () => {
    return (
        <div>
            <ContactHero></ContactHero>
            <ContactForm></ContactForm>
            <ContactDetails></ContactDetails>
        </div>
    )
}

export default ContactUs