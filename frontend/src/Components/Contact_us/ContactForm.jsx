import React from 'react';
import { Link } from 'react-router-dom';
import Socialcons from './Socialcons';

import "../../CSS/One.css";


const ContactForm = () => {
    return (
        <div className="contact-sec py-24">
            <div className="container mx-auto w-[90%]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Contact Heading Section */}
                    <div className="contact-heading md:pr-40 pt-8">
                        <h2 className="text-4xl font-bold">Let's Grow Together</h2>
                        <p className="mt-5 mb-6">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi, perferendis. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                        <Link to="#" className="text-[var(--blue)] font-medium">
                            Read Our FAQ
                        </Link>
                        <div className='mt-6'>
                            <Socialcons />
                        </div>

                    </div>

                    {/* Contact Form Section */}
                    <div className="contact-form bg-[#444343] rounded-3xl p-12 shadow-lg">
                        <p className="text-white text-lg mb-2">Hi! My name is</p>
                        <input type="text" placeholder="Full Name" className="w-full bg-transparent border-b border-gray-600 text-gray-400 p-2 outline-none mb-4" />

                        <p className="text-white text-lg mb-2">I'm interested in...</p>
                        <ul className="flex flex-wrap gap-2 mb-2">
                            {['Branding', 'Website Design', 'Digital Marketing', 'Website Development', 'Video Production', 'Product Design', 'Social Media Design'].map((tag, index) => (


                                <li>
                                    <input type="checkbox" name={tag} id={tag} className="peer hidden" />
                                    <label htmlFor={tag} className=" contactFrom-custom-gradient border  px-4 inline-block peer-checked:bg-gradient-to-r from-blue-400 to-green-400 rounded-full font-medium  ">
                                        {tag}
                                    </label>
                                </li>
                            ))}
                        </ul>
                        <p className="text-white text-lg mb-2">You can reach me at</p>
                        <input type="email" placeholder="Email ID" className="w-full bg-transparent border-b border-gray-600 text-gray-400 p-2 outline-none mb-4" />

                        <p className="text-white text-lg mb-2">or Call me at</p>
                        <input type="tel" placeholder="Phone No." className="w-full bg-transparent border-b border-gray-600 text-gray-400 p-2 outline-none mb-4" />

                        <p className="text-white text-lg mb-2">Also, I would like to add</p>
                        <textarea placeholder="Message" rows="3" className="w-full bg-transparent border-b border-gray-600 text-gray-400 p-2 outline-none mb-6"></textarea>

                        <button className=" bg-gradient-to-r from-blue-400 to-green-400 text-white py-1     px-9 rounded-full text-lg">Let's Us Begin</button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
