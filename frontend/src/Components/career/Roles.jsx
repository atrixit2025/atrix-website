import React from 'react'
import { FaArrowRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'



const rolesData = [
    {
        title: "Contact",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus qui quidem praesentium?",
        btnLink: "#"
    },
    {
        title: "Get Support",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus qui quidem praesentium?",
        btnLink: "#"
    },
    {
        title: "Chat With Us",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus qui quidem praesentium?",
        btnLink: "#"
    },
    {
        title: "Our Location",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus qui quidem praesentium?",
        btnLink: "#"
    }

]

const Roles = () => {
    return (
        <div>
            <div className="container mx-auto  max-w-[90%] pt-32">
                <div className='mb-12  ' >
                    <h2 className=' text-6xl text-center font-bold mb-5' >Roles</h2>
                    <p className=' max-w-[600px] mx-auto text-center '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, ipsa. Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, molestias!</p>
                </div>
                <div className="role-cards-wrapper">
                    {rolesData.map((item, index) => (
                        <div key={index} className="group flex justify-between items-center px-14 py-10 border-b hover:bg-[var(--blue)] hover:border-b-[var(--blue)] transition duration-300">
                            <div className="role-card">
                                <h3 className="text-2xl font-semibold">{item.title}</h3>
                                <p className="mt-4">{item.desc}</p>
                            </div>
                            <div>
                                <Link to={item.link} className="flex hover:cursor-pointer gap-3.5 text-xl font-bold">
                                    {item.btn_name} Apply
                                    <span className="border border-white/45 items-center h-8 w-8 rounded-full flex justify-center -rotate-45 
            text-[var(--blue)] group-hover:text-white duration-300 group-hover:rotate-1">
                                        <FaArrowRight />
                                    </span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Roles