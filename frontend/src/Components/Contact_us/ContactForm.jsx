import React from 'react';
import { Link } from 'react-router-dom';
import Socialcons from './Socialcons';
import { IoIosArrowForward } from "react-icons/io";


import "../../CSS/One.css";


const ContactForm = () => {
    return (
        <div className="contact-sec py-24">
            <div className="container mx-auto w-[90%]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Contact Heading Section */}
                    <div className="contact-heading md:pr-40 pt-8">
                        <h2 className="text-5xl font-bold ">Let's Grow Together</h2>
                        <p className="mt-5 mb-6 max-w-[350px]">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi, perferendis. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                        <Link to="#" className="text-[var(--blue)] font-medium flex gap-1">
                            Read Our FAQ <div className="icon pt-0.5 text-xl"> <IoIosArrowForward /> </div>
                        </Link>
                        <div className='mt-6'>
                            <Socialcons />
                        </div>

                    </div>

                    {/* Contact Form Section */}
                    <div className="contact-form bg-[#444343] rounded-3xl p-12 shadow-lg">
                        <p className="text-white text-lg mb-2">Hi! My name is</p>

                        <input type="text"  placeholder="Full Name" className=" text-lg w-full bg-transparent  py-2 border-b border-gray-600 text-gray-400  outline-none mb-4" />

                        <p className="text-white text-lg mb-2">I'm interested in...</p>

                        <ul className="flex flex-wrap gap-2 mb-2 ">
                            {['Branding', 'Website Design', 'Digital Marketing', 'Website Development', 'Video Production', 'Product Design', 'Social Media Design'].map((tag, index) => (


                                <li>
                                    <input type="checkbox" name={tag} id={tag} className="peer hidden  " />
                                    <label htmlFor={tag} className=" contactFrom-custom-gradient border  px-4 inline-block peer-checked:bg-gradient-to-r from-blue-400 to-green-400 rounded-full font-medium py-1 cursor-pointer ">
                                        {tag}
                                    </label>
                                </li>
                            ))}
                        </ul>
                        <p className="text-white text-lg mb-2">You can reach me at</p>
                        <input type="email"  placeholder="Email ID" className=" text-lg w-full bg-transparent b py-2 border-b border-gray-600 text-gray-400 outline-none mb-4" />

                        <p className="text-white text-lg mb-2">or Call me at</p>
                        <input type="tel"  placeholder="Phone No." className=" text-lg  w-full bg-transparent py-2  border-b border-gray-600 text-gray-400outline-none mb-4" />

                        <p className="text-white text-lg mb-2">Also, I would like to add</p>

                        <textarea  placeholder="Message" rows="3" className=" text-lg  w-full bg-tra py-2 nsparent border-b border-gray-600 text-gray-400 outline-none mb-6"></textarea>

                        <button type="submit" className=" bg-gradient-to-r from-blue-400 to-green-400 text-white py-1     px-9 rounded-full text-lg cursor-pointer ">Let's Us Begin</button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
