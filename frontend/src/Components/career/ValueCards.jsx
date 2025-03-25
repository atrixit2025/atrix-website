import React from 'react'
import icon5 from "../../assets/AboutUs/keys-sec/Culture.svg";
import icon6 from "../../assets/AboutUs/keys-sec/Innovation.svg";
import icon7 from "../../assets/AboutUs/keys-sec/Integrity.svg";
import icon8 from "../../assets/AboutUs/keys-sec/Kindness.svg";
import icon9 from "../../assets/AboutUs/keys-sec/value.svg";
import icon10 from "../../assets/AboutUs/keys-sec/Agile-Solutions.svg";



const ValueCardContent = [
    {
        icon: icon5,
        title: "Values",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus qui quidem praesentium?",
    },
    {
        icon: icon6,
        title: "Innovation ",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus qui quidem praesentium?",
    },
    {
        icon: icon7,
        title: "Integrity",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus qui quidem praesentium?",
    },
    {
        icon: icon8,
        title: "Agile Solutions",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus qui quidem praesentium?",
    },
    {
        icon: icon9,
        title: "Culture",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus qui quidem praesentium?",
    },
    {
        icon: icon10,
        title: "Kindness",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus qui quidem praesentium?",
    },
];





const ValueCards = () => {
    return (
        <div>
            <div className="container mx-auto  w-[90%] pt-32">
                <div> <h2 className=' text-6xl text-center font-bold mb-12 ' >Our Values</h2> </div>
                <div className="contact-cards-wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  ">
                    {ValueCardContent.map((item, index) => (
                        <div key={index} className="contact-card bg-[#444343] py-10 px-8 rounded-3xl shadow-2xl shadow-white/5 " >
                            <div className=' max-w-16 h-auto mb-5  '>
                                <img src={item.icon} alt="" className=' w-full h-full' style={{ filter: 'grayscale(1) brightness(20.255)' }} />
                                {/* <img src={item.icon} alt="" className="w-full h-full invert" /> */}
                            </div>
                            <h3 className='text-3xl font-bold ' >{item.title}</h3>
                            <p className='mt-4 '>{item.desc}</p>
                        </div>
                    ))}

                </div>
            </div>
        </div>


    )
}

export default ValueCards