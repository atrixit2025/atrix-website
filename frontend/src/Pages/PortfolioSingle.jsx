import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import feature_img from '../assets/portfolio/project.avif';
import large_img from '../assets/portfolio/project1.jpg';
import full_image from '../assets/portfolio/project1.jpg';
import half_image_1 from '../assets/portfolio/project1.jpg';
import half_image_2 from '../assets/portfolio/project1.jpg';
import './PortfolioSingle.css';

const portfolioData = [
    {
        id: 'hero',
        type: 'hero',
        image: feature_img,
        alt: 'Featured project'
    },
    {
        id: 'overview',
        type: 'overview',
        title: 'Client | Destination Orewa Beach',
        viewLink: '#',
        tags: ['Web Development', 'UI/UX Design', 'Graphic Design']
    },
    {
        id: 'description1',
        type: 'description',
        title: "KINGFISHER'S WELL-THOUGHTED FLIGHT ROUTE",
        content: [
            {
                type: 'paragraph',
                text: "Kingfisher marketing stands for a substantiated approach, that's why we started with a strategic communication plan for Integro! Then we went on to the execution. We came up with a colorful brand story with a fitting baseline, did some cool photoshoots in the residential care centers and created a new graphic style. The Zorgtoppers are all employees of Integro, which is part of their employer branding. In order to realize their vision 'Live colorfully', they work together with the Zorgtoppers to create a more colorful healthcare landscape. They do this by:"
            },
            {
                type: 'list',
                items: [
                    'To guarantee maximum autonomy and care in dialogue',
                    'To promote continuity of care and inclusion',
                    'To hold employee involvement in high regard',
                    'To collaborate with professional partners',
                    'To continue to create learning and employment opportunities'
                ]
            },
            {
                type: 'paragraph',
                text: "This is how together with the residents and their Zorgtoppers, ensures a bright future! As a marketing and communication partner, Kingfisher marketing is ready to support them with advice and action!"
            }
        ]
    },
    {
        id: 'largeImage1',
        type: 'image',
        image: large_img,
        alt: 'Project showcase',
        className: 'port-large-img'
    },
    {
        id: 'description2',
        type: 'description',
        title: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe, porro?",
        content: [
            {
                type: 'paragraph',
                text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae velit sunt, voluptate eius a nesciunt veritatis neque! Cupiditate perferendis distinctio fuga asperiores maiores voluptate, ipsam sit explicabo neque id accusamus nostrum esse accusantium maxime totam! Tenetur optio vel eaque cum itaque impedit labore inventore iste suscipit recusandae, tempora earum provident odit autem debitis et tempore aliquam eligendi distinctio maiores, veritatis accusamus rem. Molestiae nobis voluptatibus vitae enim alias dolorum tempora similique commodi natus. Impedit beatae eum eveniet quisquam minima veritatis laborum. Rerum velit eum officia amet ratione. Natus omnis quibusdam est eius et, fugiat repellendus ratione quisquam, saepe commodi voluptatem consectetur aliquam illum eum vel reprehenderit facere rerum impedit ullam. Deleniti perspiciatis accusamus labore provident ratione quibusdam similique delectus, culpa eligendi quia dolores illum neque laboriosam eaque impedit repellendus quis aperiam voluptate necessitatibus laudantium itaque molestias, totam sed. Suscipit nulla, corrupti sint consequuntur numquam velit eum veniam. Odit, dolorum magni!"
            }
        ]
    },
    {
        id: 'fullImage1',
        type: 'image',
        image: full_image,
        alt: 'Full project view',
        className: 'port-full-wrapper'
    },
    {
        id: 'description3',
        type: 'description',
        title: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe, porro?",
        content: [
            {
                type: 'paragraph',
                text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae velit sunt, voluptate eius a nesciunt veritatis neque! Cupiditate perferendis distinctio fuga asperiores maiores voluptate, ipsam sit explicabo neque id accusamus nostrum esse accusantium maxime totam! Tenetur optio vel eaque cum itaque impedit labore inventore iste suscipit recusandae, tempora earum provident odit autem debitis et tempore aliquam eligendi distinctio maiores, veritatis accusamus rem. Molestiae nobis voluptatibus vitae enim alias dolorum tempora similique commodi natus. Impedit beatae eum eveniet quisquam minima veritatis laborum. Rerum velit eum officia amet ratione. Natus omnis quibusdam est eius et, fugiat repellendus ratione quisquam, saepe commodi voluptatem consectetur aliquam illum eum vel reprehenderit facere rerum impedit ullam. Deleniti perspiciatis accusamus labore provident ratione quibusdam similique delectus, culpa eligendi quia dolores illum neque laboriosam eaque impedit repellendus quis aperiam voluptate necessitatibus laudantium itaque molestias, totam sed. Suscipit nulla, corrupti sint consequuntur numquam velit eum veniam. Odit, dolorum magni!"
            },
            {
                type: 'list',
                items: [
                    'To guarantee maximum autonomy and care in dialogue',
                    'To promote continuity of care and inclusion',
                    'To hold employee involvement in high regard',
                    'To collaborate with professional partners',
                    'To continue to create learning and employment opportunities'
                ]
            }
        ]
    },
    {
        id: 'halfImages',
        type: 'half-images',
        images: [
            { src: half_image_1, alt: 'Project detail 1' },
            { src: half_image_2, alt: 'Project detail 2' }
        ]
    },
    {
        id: 'description4',
        type: 'description',
        title: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti, est.",
        content: [
            {
                type: 'paragraph',
                text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit error, minus similique, tempora iure omnis perferendis ratione corrupti dolor modi aspernatur quidem beatae praesentium tempore consectetur fugiat odit architecto itaque ipsum molestiae quas. Aliquam autem, a reprehenderit error omnis repellat!"
            }
        ]
    }
];


const PortfolioSingle = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);



    const renderContent = (content) => {
        return content.map((item, index) => {
            switch (item.type) {
                case 'paragraph':
                    return <p key={index} className="leading-relaxed mb-4">{item.text}</p>;
                case 'list':
                    return (
                        <ul key={index} className="list-disc pl-6 mb-4 space-y-2">
                            {item.items.map((listItem, i) => (
                                <li key={i}>{listItem}</li>
                            ))}
                        </ul>
                    );
                default:
                    return null;
            }
        });
    };

    return (
        <div className="single-Port">
            {portfolioData.map((section) => {
                switch (section.type) {
                    case 'hero':
                        return (
                            <div key={section.id} className="mx-auto px-5 sm:px-6 lg:px-8 pt-40">
                                <div className="feature-image_wrapper">
                                    <img
                                        src={section.image}
                                        alt={section.alt}
                                        className="w-full h-full object-cover rounded-lg"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        );

                    case 'overview':
                        return (
                            <div key={section.id} className="container mx-auto py-16">
                                <div className="port-heading-wrapper text-center">
                                    <Link
                                        to={section.viewLink}
                                        className="uppercase text-blue-600 font-bold hover:text-blue-800 transition-colors"
                                    >
                                        View the Project
                                    </Link>
                                    <h1 className="main-heading text-3xl md:text-4xl font-bold mt-4">
                                        {section.title}
                                    </h1>
                                    <div className="flex gap-3 justify-center mt-6 flex-wrap">
                                        {section.tags.map((tag, index) => (
                                            <span key={index} className="project-tag px-4 py-2 bg-gray-100 rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );

                    case 'description':
                        return (
                            <div key={section.id} className="project-desc max-w-[800px] mx-auto  px-4">
                                <h2 className="text-2xl font-bold mb-6">{section.title}</h2>
                                <div>{renderContent(section.content)}</div>
                            </div>
                        );

                    case 'image':
                        return (
                            <div key={section.id} className={section.className}>
                                <img
                                    src={section.image}
                                    alt={section.alt}
                                    className="w-full h-auto object-cover rounded-lg"
                                    loading="lazy"
                                />
                            </div>
                        );

                    case 'half-images':
                        return (
                            <div key={section.id} className="grid grid-cols-1 md:grid-cols-2 max-w-[1100px] mx-auto my-24 gap-6 px-4">
                                {section.images.map((image, index) => (
                                    <div key={index} className="image-wrapper aspect-[4/3] overflow-hidden rounded-lg">
                                        <img
                                            src={image.src}
                                            alt={image.alt}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                            loading="lazy"
                                        />
                                    </div>
                                ))}
                            </div>
                        );

                    default:
                        return null;
                }
            })}
        </div>
    );
};

export default PortfolioSingle;   