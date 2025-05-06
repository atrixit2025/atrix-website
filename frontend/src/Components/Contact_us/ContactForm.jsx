import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Socialcons from './Socialcons';
import { IoIosArrowForward } from "react-icons/io";
import Button from '../Button';
import { motion, AnimatePresence } from 'framer-motion';
import "../../CSS/One.css";

const ContactForm = () => {
    const [checkedTags, setCheckedTags] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        
        // Animation for form elements
        const timer = setTimeout(() => {
            const inputs = document.querySelectorAll('.form-element');
            inputs.forEach((input, index) => {
                input.style.opacity = '1';
                input.style.transform = 'translateY(0)';
                input.style.transition = `all 0.5s ease ${index * 0.1}s`;
            });
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    const handleTagClick = (tag) => {
        if (checkedTags.includes(tag)) {
            setCheckedTags(checkedTags.filter(t => t !== tag));
        } else {
            setCheckedTags([...checkedTags, tag]);
        }
    };

    const tags = ['Branding', 'Website Design', 'Digital Marketing', 'Website Development', 'Video Production', 'Product Design', 'Social Media Design'];

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div 
                    className="contact-sec py-24"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="container mx-auto w-[90%]">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Contact Heading Section */}
                            <motion.div 
                                className="contact-heading md:pr-40 pt-8"
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.6 }}
                            >
                                <motion.h2 
                                    className="sec-heading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.6 }}
                                >
                                    Stay Ahead in the Digital World with Us!
                                </motion.h2>
                                
                                <motion.p 
                                    className="mt-5 mb-6 max-w-[450px]"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4, duration: 0.6 }}
                                >
                                    Attain a top brand position with smart and effective IT services. Partner with us to boost brand awareness, improve your online presence, and stay ahead in the fast-changing digital world.
                                </motion.p>
                                
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6, duration: 0.6 }}
                                >
                                    <Link to="/faqs" className="text-[var(--blue)] font-medium flex gap-1 hover:gap-2 transition-all duration-300">
                                        Read Our FAQ <div className="icon pt-0.5 text-xl"> <IoIosArrowForward /> </div>
                                    </Link>
                                </motion.div>
                                
                                <motion.div 
                                    className='mt-6'
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8, duration: 0.6 }}
                                >
                                    <Socialcons />
                                </motion.div>
                            </motion.div>

                            {/* Contact Form Section */}
                            <motion.div 
                                className="contact-form rounded-3xl p-12 shadow-lg bg-(--black)"
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                                whileHover={{ scale: 1.01 }}
                            >
                                <form>
                                    <motion.div 
                                        className="form-element"
                                        style={{ opacity: 0, transform: 'translateY(20px)' }}
                                    >
                                        <p className="text-white text-lg mb-2">Hi! My name is</p>
                                        <input 
                                            type="text" 
                                            placeholder="Full Name" 
                                            className="text-lg w-full bg-transparent py-2 border-b border-gray-600 text-gray-400 outline-none mb-4 hover:border-blue-400 transition-colors duration-300"
                                        />
                                    </motion.div>

                                    <motion.div 
                                        className="form-element"
                                        style={{ opacity: 0, transform: 'translateY(20px)' }}
                                    >
                                        <p className="text-white text-lg mb-2">I'm interested in...</p>
                                        <ul className="flex flex-wrap gap-2 mb-2">
                                            {tags.map((tag, index) => (
                                                <motion.li 
                                                    key={index}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <input 
                                                        type="checkbox" 
                                                        name={tag} 
                                                        id={tag} 
                                                        className="peer hidden" 
                                                        checked={checkedTags.includes(tag)}
                                                        onChange={() => handleTagClick(tag)}
                                                    />
                                                    <label 
                                                        htmlFor={tag} 
                                                        className={`contactFrom-custom-gradient border px-4 inline-block rounded-full font-medium py-1 cursor-pointer transition-all duration-300
                                                            ${checkedTags.includes(tag) ? 'bg-gradient-to-r from-blue-400 to-green-400 text-white' : 'hover:bg-gray-700'}`}
                                                    >
                                                        {tag}
                                                    </label>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </motion.div>

                                    <motion.div 
                                        className="form-element"
                                        style={{ opacity: 0, transform: 'translateY(20px)' }}
                                    >
                                        <p className="text-white text-lg mb-2">You can reach me at</p>
                                        <input 
                                            type="email" 
                                            placeholder="Email ID" 
                                            className="text-lg w-full bg-transparent py-2 border-b border-gray-600 text-gray-400 outline-none mb-4 hover:border-blue-400 transition-colors duration-300"
                                        />
                                    </motion.div>

                                    <motion.div 
                                        className="form-element"
                                        style={{ opacity: 0, transform: 'translateY(20px)' }}
                                    >
                                        <p className="text-white text-lg mb-2">or Call me at</p>
                                        <input 
                                            type="tel" 
                                            placeholder="Phone No." 
                                            className="text-lg w-full bg-transparent py-2 border-b border-gray-600 text-gray-400 outline-none mb-4 hover:border-blue-400 transition-colors duration-300"
                                        />
                                    </motion.div>

                                    <motion.div 
                                        className="form-element"
                                        style={{ opacity: 0, transform: 'translateY(20px)' }}
                                    >
                                        <p className="text-white text-lg mb-2">Also, I would like to add</p>
                                        <textarea 
                                            placeholder="Message" 
                                            rows="3" 
                                            className="text-lg w-full bg-transparent py-2 border-b border-gray-600 text-gray-400 outline-none mb-6 hover:border-blue-400 transition-colors duration-300"
                                        ></textarea>
                                    </motion.div>

                                    <motion.div 
                                        className="formbtn form-element"
                                        style={{ opacity: 0, transform: 'translateY(20px)' }}
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                    >
                                        <Button mybtn={"Get A Quote"} />
                                    </motion.div>
                                </form>
                            </motion.div>
                        </div>
                    </div>

                    <style jsx>{`
                        .form-element {
                            transition: all 0.5s ease;
                        }
                        
                        .contactFrom-custom-gradient {
                            transition: all 0.3s ease;
                        }
                        
                        .contactFrom-custom-gradient:hover {
                            transform: translateY(-2px);
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        }
                    `}</style>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ContactForm;