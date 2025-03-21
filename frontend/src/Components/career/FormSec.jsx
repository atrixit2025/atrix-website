import React from 'react'
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { RiAttachment2 } from "react-icons/ri";
import hire_img from '../../assets/career/hire.svg'


const CareerFormSec = () => {
    return (
        <div className="pt-40 pb-20 ">



            <div className="container mx-auto w-[90%]">
                <div className='mb-12  ' >

                    <p className=' max-w-[800px] mx-auto text-center text-3xl '>
                        We truly values work-life balance. We work hard and deliver, but at the end of the day you can switch off.</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Contact Heading Section */}
                    <div className='flex items-center justify-center ' >
                        <div className="contact-heading md:pr-40 pt-8 w-[70%] h-auto ">
                            <img src={hire_img} alt="" className='w-full h-full ' />
                        </div>
                    </div>
                    {/* Contact Form Section */}
                    <div>
                        <h3 className='text-4xl mb-10 '>Apply For the Role</h3>
                        <form className="role-form bg-[#444343] rounded-3xl p-12 shadow-lg">
                            <input type="text" placeholder="Full Name" className=" text-lg w-full bg-transparent  py-2 border-b border-gray-600 text-gray-400  outline-none mb-10" />
                            <input type="email" placeholder="Email ID" className=" text-lg w-full bg-transparent b py-2 border-b border-gray-600 text-gray-400 outline-none mb-10" />
                            <input type="tel" placeholder="Phone No." className=" text-lg  w-full bg-transparent py-2  border-b border-gray-600 text-gray-400 outline-none mb-10" />
                            <textarea placeholder="Links to your work or something about yourself." rows="1" className=" text-lg  w-full bg-tra py-2 nsparent border-b border-gray-600 text-gray-400 outline-none mb-6"></textarea>
                            <div className='flex gap-3.5 items-center' >
                                <button type="submit" className=" bg-blue-400  text-white py-1     pl-4 pr-7 - rounded-full text-lg cursor-pointer flex justify-center items-center gap-1"> <RiAttachment2 /> Upload</button>
                                <span> Attach Your CV</span>
                            </div>
                            <button type="submit" className=" bg-gradient-to-r from-blue-400 to-green-400 text-white py-1     px-9 rounded-full text-lg cursor-pointer mt-20 ">Submit</button>
                        </form>


                    </div>

                </div>
            </div>
        </div>
    )
}

export default CareerFormSec