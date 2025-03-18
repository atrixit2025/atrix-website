import React, { useState } from 'react';
import reacticons from "../assets/TechnologyImage/react.svg"
import GraphQL from "../assets/TechnologyImage/graphql.svg";
import TypeScript from "../assets/TechnologyImage/typescript.svg";
import JQuery from "../assets/TechnologyImage/jquery.svg";
import D3JS from "../assets/TechnologyImage/d3.svg";
import AngularJS from "../assets/TechnologyImage/angular.svg";
import VueJS from "../assets/TechnologyImage/vue.svg";
import Javascript from "../assets/TechnologyImage/javascript.svg";
import CSS from "../assets/TechnologyImage/css.svg";
import HTML from "../assets/TechnologyImage/html.svg";

import nodeicons from "../assets/TechnologyImage/node-js.svg"
import Ruby from "../assets/TechnologyImage/rubys.svg"
import DJnago from "../assets/TechnologyImage/django.svg"
import ExpressJS from "../assets/TechnologyImage/express-js.svg"
import ASPNet from "../assets/TechnologyImage/asp.svg"
import Laravel from "../assets/TechnologyImage/laravel.svg"
import Firebase from "../assets/TechnologyImage/firebase.svg"


const TechnologySecPart = () => {
    const [activeSection, setActiveSection] = useState('frontend');

    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    const data = activeSection === 'frontend' ? frontend : backend;

    return (
        <div className=' py-20'>
            <style>
                {`
                .icon-ul li:nth-child(1) > div, .icon-ul li:nth-child(6) > div {
                    min-height: 250px;
                }
                `}
            </style>
<div className=''>
            <div className='flex justify-center gap-3'>
                <h6
                    className={`bg-(--black) md:px-5 md:py-2 text-lg rounded-full font-bold md:w-32 w-28  pl-3 py-1 cursor-pointer relative ${
                        activeSection === 'frontend' ? 'bg-(--blue)' : ''
                    }`}
                    onClick={() => handleSectionChange('frontend')}
                >
                    Front-end
                    {activeSection === 'frontend' && (
                        <span className="absolute left-0 right-0 -bottom-1 mx-auto w-4 h-3 bg-(--blue) rotate-45"></span>
                    )}
                </h6>
                <h6
                    className={`bg-(--black) md:px-5 md:py-2 text-lg rounded-full font-bold md:w-32 w-28  pl-3 py-1 cursor-pointer relative ${
                        activeSection === 'backend' ? 'bg-(--blue)' : ''
                    }`}
                    onClick={() => handleSectionChange('backend')}
                >
                    Back-end
                    {activeSection === 'backend' && (
                        <span className="absolute left-0 right-0 -bottom-1 mx-auto w-4 h-3 bg-(--blue) rotate-45"></span>
                    )}
                </h6>
            </div>

            <div className='hidden md:block'>
                <ul className='flex flex-wrap items-end justify-center icon-ul'>
                    {data.map((item, index) => (
                        <li key={index} className='flex items-end w-[16.66%] p-[10px]'>
                            <div className='bg-(--black) rounded-lg w-full flex items-center justify-center flex-col min-h-[180px]'>
                                <div className='flex justify-center'>
                                    <img className='h-8 md:h-14' src={item.icons} alt={item.TechnologyName} />
                                </div>
                                <h6 className='text-sm md:text-lg font-bold  mt-3'>{item.TechnologyName}</h6>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className='md:hidden block'>
                <ul className='grid grid-cols-2 items-end justify-center mt-5'>
                    {data.map((item, index) => (
                        <li key={index} className='flex  p-[10px]'>
                            <div className='bg-(--black) rounded-lg w-full flex items-center justify-center flex-col min-h-[180px]'>
                                <div className='flex justify-center'>
                                    <img className='h-15 md:h-auto' src={item.icons} alt={item.TechnologyName} />
                                </div>
                                <p className='text-lg md:text:5xl'>{item.TechnologyName}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            </div>
        </div>
    );
};

export default TechnologySecPart;

// Frontend data
const frontend = [
    {
        icons: GraphQL,
        TechnologyName: "GraphQL"
    },
    {
        icons: TypeScript,
        TechnologyName: "TypeScript"
    },
    {
        icons: JQuery,
        TechnologyName: "JQuery"
    },
    {
        icons: D3JS,
        TechnologyName: "D3 JS"
    },
    {
        icons: AngularJS,
        TechnologyName: "Angular JS"
    },
    {
        icons: reacticons,
        TechnologyName: "React JS"
    },
    {
        icons: VueJS,
        TechnologyName: "Vue JS"
    },   {
        icons: Javascript,
        TechnologyName: "Javascript"
    },   {
        icons: CSS,
        TechnologyName: "CSS"
    },   {
        icons: HTML,
        TechnologyName: "HTML"
    },
];

// Backend data
const backend = [
    {
        icons:nodeicons,
        TechnologyName: "Node JS"
    },
    {
        icons:Ruby ,
        TechnologyName: "Ruby"
    },
    {
        icons:DJnago ,
        TechnologyName: "D Jnago"
    },
    {
        icons:ExpressJS ,
        TechnologyName: "Express JS"
    },
    {
        icons:ASPNet ,
        TechnologyName: "ASP .Net"
    },
    {
        icons:Laravel ,
        TechnologyName: "Laravel"
    },
    {
        icons: Firebase,
        TechnologyName: "Firebase"
    },
];



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const TechnologySecPart = () => {
//     const [activeSection, setActiveSection] = useState('frontend');
//     const [frontend, setFrontend] = useState([]);
//     const [backend, setBackend] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get("http://localhost:5300/technology/get");
//                 const technologies = response.data.Technology;

//                 const frontendData = technologies.filter(tech => tech.category === 'frontend').map(tech => ({
//                     icons: tech.image?.image || "/images/user/user-22.jpg",
//                     TechnologyName: tech.title
//                 }));

//                 const backendData = technologies.filter(tech => tech.category === 'backend').map(tech => ({
//                     icons: tech.image?.image || "/images/user/user-22.jpg",
//                     TechnologyName: tech.title
//                 }));

//                 setFrontend(frontendData);
//                 setBackend(backendData);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//         };

//         fetchData();
//     }, []);

//     const handleSectionChange = (section) => {
//         setActiveSection(section);
//     };

//     // Dynamically select the data array based on activeSection
//     const data = activeSection === 'frontend' ? frontend : backend;

//     return (
//         <div className='py-20'>
//             <style>
//                 {`
//                 .icon-ul li:nth-child(1) > div, .icon-ul li:nth-child(6) > div {
//                     min-height: 250px;
//                 }
//                 `}
//             </style>
//             <div className=''>
//                 <div className='flex justify-center gap-3'>
//                     <h6
//                         className={`bg-(--black) md:px-5 md:py-2 text-lg rounded-full font-bold md:w-32 w-28  pl-3 py-1 cursor-pointer relative ${activeSection === 'frontend' ? 'bg-(--blue)' : ''
//                             }`}
//                         onClick={() => handleSectionChange('frontend')}
//                     >
//                         Front-end
//                         {activeSection === 'frontend' && (
//                             <span className="absolute left-0 right-0 -bottom-1 mx-auto w-4 h-3 bg-(--blue) rotate-45"></span>
//                         )}
//                     </h6>
//                     <h6
//                         className={`bg-(--black) md:px-5 md:py-2 text-lg rounded-full font-bold md:w-32 w-28  pl-3 py-1 cursor-pointer relative ${activeSection === 'backend' ? 'bg-(--blue)' : ''
//                             }`}
//                         onClick={() => handleSectionChange('backend')}
//                     >
//                         Back-end
//                         {activeSection === 'backend' && (
//                             <span className="absolute left-0 right-0 -bottom-1 mx-auto w-4 h-3 bg-(--blue) rotate-45"></span>
//                         )}
//                     </h6>
//                 </div>

//                 <div className='hidden md:block'>
//                     <ul className='flex flex-wrap items-end justify-center icon-ul'>
//                         {data.map((item, index) => (
//                             <li key={index} className='flex items-end w-[16.66%] p-[10px]'>
//                                 <div className='bg-(--black) rounded-lg w-full flex items-center justify-center flex-col min-h-[180px]'>
//                                     <div className='flex justify-center'>
//                                         <img className='h-8 md:h-14' src={`http://localhost:5300${item.icons}`} alt={item.TechnologyName} />
//                                     </div>
//                                     <h6 className='text-sm md:text-lg font-bold  mt-3'>{item.TechnologyName}</h6>
//                                 </div>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>

//                 <div className='md:hidden block'>
//                     <ul className='grid grid-cols-2 items-end justify-center mt-5'>
//                         {data.map((item, index) => (
//                             <li key={index} className='flex  p-[10px]'>
//                                 <div className='bg-(--black) rounded-lg w-full flex items-center justify-center flex-col min-h-[180px]'>
//                                     <div className='flex justify-center'>
//                                         <img className='h-15 md:h-auto' src={`http://localhost:5300${item.icons}`} alt={item.TechnologyName} />
//                                     </div>
//                                     <p className='text-lg md:text:5xl'>{item.TechnologyName}</p>
//                                 </div>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TechnologySecPart;