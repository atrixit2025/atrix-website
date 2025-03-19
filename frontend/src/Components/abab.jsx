
import React, { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';;
import icons1 from '../assets/SolutionImage/icon1.svg'
import icons2 from '../assets/SolutionImage/icon2.svg'
import icons3 from '../assets/SolutionImage/icon3.svg'
import icons4 from '../assets/SolutionImage/icon4.svg'


const OurSolution = () => {
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const children = document.querySelectorAll(".blurb-item");
            let activeSteps = 0;

            children.forEach((child, index) => {
                const rect = child.getBoundingClientRect();
                if (rect.top <= 100) {
                    activeSteps = index + 1;
                }
            });

            setActiveStep(activeSteps);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const circleAnimation = () => {
            let circleWrapper = document.getElementById('circle-wrapper')
            let cardWrapper = document.getElementById('process-cards')
            let allCardValues = cardWrapper.getBoundingClientRect();
            let cardHeight = allCardValues.height
            let currectPos = allCardValues.top
            const percentage = -(Math.floor((currectPos / cardHeight) * 100))

            circleWrapper.style.background = `conic-gradient(var(--blue) ${percentage + 15}%, #1A1A1A 0%)`;
        }
        window.addEventListener("load", circleAnimation)
        window.addEventListener("scroll", circleAnimation)

        return () => {
            window.removeEventListener("load", circleAnimation);
            window.removeEventListener("scroll", circleAnimation);
        };

    }, []);


    return (
        <div className="Our-Solution-Process-section bg-(--darkblack) text-(--whitelight)   relative mb-[00px] ">
            <div className='container mx-auto  max-w-[1280px] w-[90%]'>

                <div className='row  py-14 md:py-28'>
                    <div className=" grid md:grid-cols-3 grid-cols-1  gap-10  ">
                        <h2 className="text-6xl font-bold md:mb-8    md:text-end    tracking-wider">Our Solution <br />Process</h2>

                        <div className='w-full max-w- flex items-end'>
                            <svg className='' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 477 65">
                                <path fill="#2f2f2f" d="M0.333333 3C0.333333 4.47276 1.52724 5.66667 3 5.66667C4.47276 5.66667 5.66667 4.47276 5.66667 3C5.66667 1.52724 4.47276 0.333333 3 0.333333C1.52724 0.333333 0.333333 1.52724 0.333333 3ZM475 3L475.255 3.42984L476.82 2.5H475V3ZM438.668 65L441.872 60.197L436.111 59.8239L438.668 65ZM3 3.5H475V2.5H3V3.5ZM474.745 2.57016C459.928 11.3742 441.341 27.8789 438.461 60.47L439.457 60.5581C442.3 28.3895 460.613 12.1303 475.255 3.42984L474.745 2.57016Z"></path>
                            </svg>
                        </div>
                        <p className=' md:px-2 px-1 text-(--gray)  flex items-end  justify-start font-bold'>
                            Digital agencies can vary in size and specialization. Some may focus on specific niches, such as healthcare or e-commerce, while others may offer a comprehensive.
                        </p>
                    </div>
                <div className='col-1 grid md:grid-cols-2 grid-cols-1 items-start relative mt-32 '>
                    <div id="circle-sec" className=" md:flex justify-center sticky md:top-28 hidden ">
                        <div id="circle-wrapper" className="circle-wrapper h-[340px] w-[340px] rounded-[50%] border-[4px] border-[#2F2F2F] flex justify-center items-center">
                            <div className="circle-content h-[320px] w-[320px] bg-[#1A1A1A] rounded-[50%] flex flex-col justify-center items-center">
                                <p className="text-xl font-bold text-(--gray)">Step</p>
                                <p className="text-5xl font-bold">{activeStep}/4</p>
                            </div>
                        </div>
                    </div>

                    <div id="process-cards" className=" col-2 md:border-l border-(--black) relative">
                        <div className="w-full   md:pl-26  z-50  ">
                            {blurbContent.map((item, index) => (
                                <div key={index} className="blurb-item pb-20 bg-(--darkblack) pl-1 pt-1 sticky top-20">
                                    <img src={item.image} alt={item.title} className="filter invert brightness-0 contrast-100 mb-5" />
                                    <p className='md:hidden inline-block mb-5 bg-(--black) px-5  py-2 rounded-lg font-bold text-sm' >STEP   {item.id}</p>
                                    <h1 className="text-4xl font-bold mb-8">{item.title}</h1>
                                    <p className="mb-5 text-(--gray)">{item.description}</p>
                                    <ul>
                                        {item.additionalText.map((text, idx) => (
                                            <li className="flex gap-2 items-center text-(--gray) pt-2" key={idx}>
                                                <FiPlus /> {text}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            </div>



        </div>

    );
};

export default OurSolution;



const blurbContent = [
    {
        id: 1,
        image: icons1,
        title: "Discovery and Consultation.",
        description: "Understand the client's goals, challenges, and requirements through initial meetings and consultations.",
        additionalText: ["Client Meeting", "Needs Assessment", "Strategic Planning"]
    },
    {
        id: 2,
        image: icons2,
        title: "Design and Architecture.",
        description: "If applicable, create a user-centric design for software interfaces, websites, or applications.",
        additionalText: ["Wireframing", "Design Mockups", "Implementation."]
    },
    {
        id: 3,
        image: icons3,
        title: "Development.",
        description: "Understand the client's goals, challenges, and requirements through initial meetings and consultations.",
        additionalText: ["Testing Plans.", "Bug Fixing.", "Agile Development."]
    },
    {
        id: 4,
        image: icons4,
        title: "Documentation & Launch.",
        description: "Understand the client's goals, challenges, and requirements through initial meetings and consultations.",
        additionalText: ["Testing Plans.", "Bug Fixing.", "Agile Development."]
    },


];


