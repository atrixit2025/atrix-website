import React from 'react';
import { Link } from 'react-router-dom';
import Socialcons from './Socialcons';
import { IoIosArrowForward } from "react-icons/io";
import Button from '../Button';


import "../../CSS/One.css";


const ContactForm = () => {
    return (
        <div className="contact-sec py-24">
            <div className="container mx-auto w-[90%]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Contact Heading Section */}
                    <div className="contact-heading md:pr-40 pt-8">
                        <h2 className="sec-heading ">Stay Ahead in the Digital World with Us!</h2>
                        <p className="mt-5 mb-6 max-w-[450px]">
                            Attain a top brand position with smart and effective IT services. Partner with us to boost brand awareness, improve your online presence, and stay ahead in the fast-changing digital world.
                        </p>
                        <Link to="/faqs" className="text-[var(--blue)] font-medium flex gap-1">
                            Read Our FAQ <div className="icon pt-0.5 text-xl"> <IoIosArrowForward /> </div>
                        </Link>
                        <div className='mt-6'>
                            <Socialcons />
                        </div>

                    </div>

                    {/* Contact Form Section */}
                    <div className="contact-form  rounded-3xl p-12 shadow-lg bg-(--black)">
                        <form>


                            <p className="text-white text-lg mb-2">Hi! My name is</p>

                            <input type="text" placeholder="Full Name" className=" text-lg w-full bg-transparent  py-2 border-b border-gray-600 text-gray-400  outline-none mb-4" />

                            <p className="text-white text-lg mb-2">I'm interested in...</p>

                            <ul className="flex flex-wrap gap-2 mb-2 ">
                                {['Branding', 'Website Design', 'Digital Marketing', 'Website Development', 'Video Production', 'Product Design', 'Social Media Design'].map((tag, index) => (


                                    <li key={index} >
                                        <input type="checkbox" name={tag} id={tag} className="peer hidden  " />
                                        <label htmlFor={tag} className=" text-sm lg:text-[16px] contactFrom-custom-gradient border  px-4 inline-block peer-checked:bg-gradient-to-r from-blue-400 to-green-400 rounded-full font-medium py-1 cursor-pointer ">
                                            {tag}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-white text-lg mb-2">You can reach me at</p>
                            <input type="email" placeholder="Email ID" className=" text-lg w-full bg-transparent b py-2 border-b border-gray-600 text-gray-400 outline-none mb-4" />

                            <p className="text-white text-lg mb-2">or Call me at</p>
                            <input type="tel" placeholder="Phone No." className=" text-lg  w-full bg-transparent py-2  border-b border-gray-600 text-gray-400 outline-none mb-4" />

                            <p className="text-white text-lg mb-2">Also, I would like to add</p>

                            <textarea placeholder="Message" rows="3" className=" text-lg  w-full bg-tra py-2 nsparent border-b border-gray-600 text-gray-400 outline-none mb-6"></textarea>

                       <div className="formbtn">
                        <Button mybtn={"Get A Quote"} />
                       </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
