import React, { useState } from 'react';
import TechnologySecPart from './TechnologySecPart';

const Technology = () => {

    return (
        <div className="Technology-section bg-(--darkblack) text-(--whitelight)  relative overflow-hidden">
            <div className='container mx-auto  max-w-[1280px] w-[90%]'>
                <div className='py-10 md:py-16'>
                    <div className="md:flex   ">
                        <div className='font-extrabold'>
                            <h2 className="text-5xl font-bold ">We Used Advance TECHNOLOGY</h2>
                        </div>

                        <div className='w-full max-w-[470px] mt-14'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 477 65">
                                <path fill="#2f2f2f" d="M0.333333 3C0.333333 4.47276 1.52724 5.66667 3 5.66667C4.47276 5.66667 5.66667 4.47276 5.66667 3C5.66667 1.52724 4.47276 0.333333 3 0.333333C1.52724 0.333333 0.333333 1.52724 0.333333 3ZM475 3L475.255 3.42984L476.82 2.5H475V3ZM438.668 65L441.872 60.197L436.111 59.8239L438.668 65ZM3 3.5H475V2.5H3V3.5ZM474.745 2.57016C459.928 11.3742 441.341 27.8789 438.461 60.47L439.457 60.5581C442.3 28.3895 460.613 12.1303 475.255 3.42984L474.745 2.57016Z"></path>
                            </svg>
                        </div>
                        <div className='mt-10 '>
                            <p className='md:w-86 md:text-end text-gray font-bold mt-4'>
                                Offer a wide range of services to help businesses establish and enhance their online presence.
                            </p>
                        </div>

                    </div>
                    <TechnologySecPart />

                </div>
            </div>
        </div>
    );
};

export default Technology;
