import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PortfolioSingle.css';
import { useParams } from "react-router-dom";
import projectsData from '../data/projectsData';
import ProjectsGallery from '../Components/portfolilo/ProjectsGallery';

const PortfolioSingle = () => {



    const { project_id } = useParams();
    const filteredProject = projectsData.find(item => item.project_id === project_id)




    return (
        <div className="single-Port">
            {<>
                {/* hero image  */}
                <div className="mx-auto px-5 sm:px-6 lg:px-8 pt-40">
                    <div className="feature-image_wrapper">
                        <img
                            src={filteredProject.featured_image}
                            alt="feature image"
                            loading="lazy"
                        />
                    </div>
                </div>

                {/* heading  */}

                <div className="container mx-auto py-16">
                    <div className="port-heading-wrapper text-center">
                        <Link
                            to={filteredProject.project_link}
                            className="uppercase text-(--blue) font-bold hover:text-[#0283b1] transition-colors"
                        >
                            View the Project
                        </Link>
                        <h2 className=" fon-subt-bold mt-4 sec-heading">
                            {filteredProject.project_title}
                        </h2>
                        <div className="flex gap-3 justify-center mt-6 flex-wrap">
                            {filteredProject.tags.map((tag, index) => (
                                <span key={index} className="project-tag px-4 py-2 bg-gray-100 rounded-full">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                {/* description section  */}
                {
                    filteredProject.project_description.map((item, index) => (
                        <div key={index} >
                            <div  className="project-desc max-w-[800px] mx-auto  px-4">
                                <h3 className=" sub-sec-heading lg:text-4xl font-bold mb-6">{item.heading_1}</h3>
                                <div>{item.description_1}</div>
                            </div>

                            <div className=' port-large-img' >
                                <img
                                    src={item.large_image}
                                    alt='large_image'
                                    className="w-full h-full object-cover rounded-lg "
                                    loading="lazy"
                                />
                            </div>

                            <div  className="project-desc max-w-[800px] mx-auto  px-4">
                                <h3 className=" sub-sec-heading lg:text-4xl font-bold mb-6">{item.heading_2}</h3>
                                <div>{item.description_2}</div>
                            </div>



                            <div  className='port-full-wrapper' >
                                <img
                                    src={item.full_image}
                                    alt="full screen image"
                                    className="w-full h-auto object-cover  port-full-img"
                                    loading="lazy"

                                />
                            </div>


                            <div  className="project-desc max-w-[800px] mx-auto  px-4">
                                <h3 className=" sub-sec-heading lg:text-4xl font-bold mb-6">{item.heading_3}</h3>
                                <div>{item.description_3}</div>
                            </div> 


                            <div  className="grid grid-cols-1 md:grid-cols-2 max-w-[1100px] mx-auto my-24 gap-6 px-4">

                                <div  className="image-wrapper aspect-[4/3] overflow-hidden rounded-lg">
                                    <img
                                        src={item.half_img_1}
                                        alt="#"
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 "
                                        loading="lazy"
                                    />
                                </div>
                                <div  className="image-wrapper aspect-[4/3] overflow-hidden rounded-lg">
                                    <img
                                        src={item.half_img_1}
                                        alt="#"
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                        loading="lazy"
                                    />
                                </div>
                            </div>

                        </div>
                    ))
                }
            </>
            }
            <ProjectsGallery></ProjectsGallery>
        </div>
    );
};

export default PortfolioSingle;
