import React, { useEffect, useState } from 'react';
import { FaArrowUp } from "react-icons/fa6";
import { useLocation } from 'react-router-dom';

const ScrollToTopBtn = () => {

    // On every new page render goto top position 
    const { pathname } = useLocation();
    useEffect(() => {
        window.scroll(0, 0)
    }, [pathname])



    // goto top btn code 
    const [showBtn, setShowBtn] = useState(false);
    const [btnPosition, setBtnPosition] = useState(-100);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const shouldShow = scrollY > 200;

            setShowBtn(shouldShow);
            setBtnPosition(shouldShow ? 40 : -100);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleOnClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };




    return (
        <button
            onClick={handleOnClick}
            className="h-12 w-12 bg-black/50 hover:bg-(--green) hover:scale-120  text-white flex justify-center items-center cursor-pointer fixed bottom-8 rounded-full text-2xl z-50  transition-all duration-500 "
            style={{ right: `${btnPosition}px` }}
        >
            <FaArrowUp />
        </button>
    );
};

export default ScrollToTopBtn;


