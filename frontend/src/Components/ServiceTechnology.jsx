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
    }, {
        icons: Javascript,
        TechnologyName: "Javascript"
    }, {
        icons: CSS,
        TechnologyName: "CSS"
    }, {
        icons: HTML,
        TechnologyName: "HTML"
    },
];


const ServiceTechnology = () => {




    return (
        <div className=' container mx-auto '>
            <style>
                {`
                
                 `}
            </style>
            <div className=''>
                <div className="container mx-auto">
                    <div className='text-center' >
                        <h2 className=' sec-heading font-bold mb-6' > We Used Advance TECHNOLOGY </h2>
                        <p className=' max-w-[900px] mx-auto mb-14 leading-[1.65rem] '> At Atrix IT Solutions, every project we deliver is a step toward your success. Our expertise turns ideas into powerful solutions, helping businesses grow, innovate, and stand out.</p>
                    </div>
                </div>

                <div className='hidden md:block'>
                    <ul className='flex flex-wrap items-end justify-center icon-ul'>
                        {frontend.map((item, index) => (
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


            </div>
        </div>
    );
}

export default ServiceTechnology