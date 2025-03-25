import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import project1 from "../../assets/PortfolioImage/imgpsh_fullsize_anim (1).png";
import project2 from "../../assets/PortfolioImage/imgpsh_fullsize_anim (2).png";
import project3 from "../../assets/PortfolioImage/imgpsh_fullsize_anim (3).png";
import project4 from "../../assets/PortfolioImage/imgpsh_fullsize_anim.png";
import { Link } from "react-router-dom"

const portfoData = [
    {
        Category: "Web Development",
        cardData: [
            { title: "Frontend Frameworks", desc: "Lorem ipsum dolor sit amet.", image: project1, tags: ["Branding", "logo Design", " web Design"] },
            { title: "Backend", desc: "Lorem ipsum dolor sit amet.", image: project3, tags: ["Branding", "logo Design", " web Design"] },
            { title: "React", desc: "Lorem ipsum dolor sit amet.", image: project4, tags: ["Branding", "logo Design", " web Design"] },
        ]
    },
    {
        Category: "Graphic Designing",
        cardData: [
            { title: "Photoshop", desc: "Lorem ipsum dolor sit amet.", image: project2, tags: ["Branding", "logo Design", " web Design"] },
            { title: "Illustrator", desc: "Lorem ipsum dolor sit amet.", image: project1, tags: ["Branding", "logo Design", " web Design"] },
            { title: "Figma", desc: "Lorem ipsum dolor sit amet.", image: project3, tags: ["Branding", "logo Design", " web Design"] },
            { title: "Canva", desc: "Lorem ipsum dolor sit amet.", image: project4, tags: ["Branding", "logo Design", " web Design"] },
        ]
    },
    {
        Category: "3D Animation",
        cardData: [
            { title: "Maya", desc: "Lorem ipsum dolor sit amet.", image: project4, tags: ["Branding", "logo Design", " web Design"] },
            { title: "Illustrator", desc: "Lorem ipsum dolor sit amet.", image: project3, tags: ["Branding", "logo Design", " web Design"] },
            { title: "Adobe", desc: "Lorem ipsum dolor sit amet.", image: project2, tags: ["Branding", "logo Design", " web Design"] },
            { title: "Canva", desc: "Lorem ipsum dolor sit amet.", image: project1, tags: ["Branding", "logo Design", " web Design"] },
        ]
    },
];

const PortFolioCards = () => {
    const [activeCat, setActiveCat] = useState("All");

    // Filtering the data based on the selected category
    const filteredData = activeCat === "All"
        ? portfoData.flatMap(item => item.cardData) // Show all if "All" is selected
        : portfoData.find(item => item.Category === activeCat)?.cardData || [];

    return (
        <div className='py-32'>
            <div className="container w-[90%] mx-auto">
                {/* Category Buttons */}
                <div className="category-btns flex flex-wrap justify-start  md:justify-center gap-2 md:gap-10">
                    <button
                        className={`py-2 px-8 rounded-3xl cursor-pointer font-bold   ${activeCat === "All" ? "bg-gradient-to-r from-(--blue) to-(--green) text-black" : ""} bg-black relative before:absolute before:-inset-[1px] before:bg-gradient-to-r before:from-(--blue) before:to-(--green)  before:-z-1 before:rounded-3xl`}
                        onClick={() => setActiveCat("All")}
                    >
                        All
                    </button>
                    {portfoData.map((item, index) => (
                        <button
                            key={index}
                            className={` py-2 px-8 rounded-3xl cursor-pointer font-bold  ${activeCat === item.Category ? "bg-gradient-to-r from-(--blue) to-(--green) text-black" : ""} bg-black relative before:absolute before:-inset-[1px] before:bg-gradient-to-r before:from-(--blue) before:to-(--green)  before:-z-1 before:rounded-3xl`}
                            onClick={() => setActiveCat(item.Category)}
                        >
                            {item.Category}
                        </button>
                    ))}
                </div>

                {/* Portfolio Cards */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-y-14 gap-x-14 my-10'>
                    {filteredData.map((item, index) => (
                        <Link to="#" key={index} className='group'  >
                            <div className="portfo-card-img w-full aspect-[16/9] border border-white/35 rounded-xl overflow-hidden">
                                <img src={item.image} alt={item.title} className='w-full h-full object-cover' />
                            </div>
                            <div className="portfo-card-content relative py-4 ps-2 pr-16">
                                <h3 className='text-4xl font-bold'>{item.title}</h3>
                                <p>
                                    {item.tags.map((item, index) => (
                                        <span>{item} /  </span>
                                    ))}
                                </p>
                                <span className="border border-white/35 items-center h-12 w-12 rounded-full flex justify-center -rotate-45 text-[var(--blue)] group-hover:text-white duration-300 group-hover:rotate-1 bg-black text-2xl absolute right-8 -top-2 ">
                                    <FaArrowRight />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PortFolioCards;
