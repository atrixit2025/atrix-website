import React from 'react'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const Socialcons = () => {
    return (
        <div className='py-2.5'>
            <ul className="flex gap-3 mt-3 md:justify-start">
                {[
                    { icon: <FaFacebookF />, id: "fb" },
                    { icon: <FaXTwitter />, id: "twitter" },
                    { icon: <FaLinkedinIn />, id: "linkedin" },
                    { icon: <FaInstagram />, id: "insta" },
                ].map((item) => (
                    <li key={item.id} className="relative w-10 h-10 p-1 rounded-full cursor-pointer flex justify-center items-center bg-black text-white">
                        <div className="absolute inset-0 rounded-full  border-transparent bg-gradient-to-r from-blue-400 to-green-400 p-[1px]">
                            <div className="w-full h-full flex justify-center items-center bg-black hover:bg-gradient-to-r from-blue-400 to-green-400 rounded-full">
                                {item.icon}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Socialcons
