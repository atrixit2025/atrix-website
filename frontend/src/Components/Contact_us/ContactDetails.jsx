import React from 'react'
import Button from '../Button'
import { FaArrowRight } from "react-icons/fa6";

const cardsContent = [
    {
        title: "Contact",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus qui quidem praesentium?",
        btn_name: "Phone No."

    },
    {
        title: "Get Support",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus qui quidem praesentium?",
        btn_name: "Email Id"

    },
    {
        title: "Chat With Us",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus qui quidem praesentium?",
        btn_name: "Open Chat"

    },
    {
        title: "Our Location",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus qui quidem praesentium?",
        btn_name: "Google Map"

    }

]


const ContactDetails = () => {
    return (
        <div className=' container mx-auto w-[90%]' >

            <div className="contact-cards-wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4  ">
                {cardsContent.map((item, index) => (
                    <div className="contact-card bg-[#444343] py-10 px-8 rounded-3xl shadow-2xl shadow-white/5 " >
                        <h3 className='text-2xl font-bold ' >{item.title}</h3>
                        <p className='mt-4 mb-10'>{item.desc}</p>

                        <button className='flex hover:cursor-pointer'>{item.btn_name} <span className='border border-white/45 ml-2 flex justify-center items-center h-6 w-6 rounded-full  -rotate-45 text-[var(--blue)] ' ><FaArrowRight /></span> </button>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default ContactDetails