import React from 'react'
import Button from '../Button'
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';


const cardsContent = [
    {

        title: "Contact",
        desc: "Have questions? Fill out our contact form, and we’ll get back to you as soon as possible.",
        btn_name: "Phone No."

    },
    {
        link: "mailto:info@atrixitsolutions.com",
        title: "Get Support",
        desc: "Our support team is ready to assist you with quick and reliable solutions",
        btn_name: "Email Id"

    },
    {
        title: "Chat With Us",
        desc: "Want instant answers? Start a chat, and our team will be happy to help!",
        btn_name: "Open Chat"

    },
    {
        link: "https://maps.app.goo.gl/3kZmdKfvDvsaVdSeA",
        title: "Our Location",
        desc: "Visit us at our  office PLOT C – 203 , PHASE – 8 B, MOHALI, MOHALI, SAS Nagar , 26-Punjab, 91-INDIA, 160070 We’re here to connect and support your business needs.",
        btn_name: "Google Map"

    }

]


const ContactDetails = () => {
    return (
        <div className=' container mx-auto w-[90%]' >

            <div className="contact-cards-wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4  "> 
                {cardsContent.map((item, index) => (

                    <div className="contact-card flex flex-col bg-[#444343] py-10 px-8 rounded-3xl shadow-2xl shadow-white/5 " >
                        <h3 className='text-2xl font-bold ' >{item.title}</h3>
                        <p className=' flex-1 mt-4 mb-10'>{item.desc}</p>

                        <Link to={item.link} className='group' >
                            <button className='flex  hover:cursor-pointer'>{item.btn_name} <span className='border border-white/45 ml-2 flex justify-center items-center h-6 w-6 rounded-full  -rotate-45 text-[var(--blue)] group-hover:rotate-1   duration-300 ' ><FaArrowRight /></span> </button>
                        </Link>

                    </div>
                ))}

            </div>
        </div>
    )
}

export default ContactDetails