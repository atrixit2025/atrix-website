import React from 'react'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { Link } from "react-router-dom";

const Socialcons = () => {
    return (
        <div className='py-2.5'>
            <ul className="flex gap-3 mt-3 md:justify-start">
                {[
                    { icon: <FaFacebookF />, id: "fb", link: "" },
                    { icon: <FaXTwitter />, id: "twitter", link: "https://x.com/AtrixIT_S" },
                    { icon: <FaLinkedinIn />, id: "linkedin", link: "https://www.linkedin.com/company/atrixitsolutions/" },
                    { icon: <FaInstagram />, id: "insta", link: "https://www.instagram.com/atrixit.solutions/" },
                ].map((item) => (
                    <li key={item.id} className="relative w-10 h-10 p-1 rounded-full cursor-pointer flex justify-center items-center bg-black text-white">
                        <Link to={item.link} className="absolute inset-0 rounded-full  border-transparent bg-gradient-to-r from-blue-400 to-green-400 p-[1px]">
                            <div className="w-full h-full flex justify-center items-center bg-black hover:bg-gradient-to-r from-blue-400 to-green-400 rounded-full">
                                {item.icon}
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Socialcons
