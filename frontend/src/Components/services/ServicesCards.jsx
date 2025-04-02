import React, { useState } from 'react';
import hover_img from '../../assets/service-hover.jpg';
import './ServicesCards.css';

const serviceCardsData = [
    {
        service_title: 'Branding',
        service_desc:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam ut laborum architecto provident tempore recusandae at exercitationem! Praesentium blanditiis laborum quas repellendus. Ab, sed quidem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, id.',
        hover_image: hover_img,
    },
    {
        service_title: 'Logo Design',
        service_desc:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam ut laborum architecto provident tempore recusandae at exercitationem! Praesentium blanditiis laborum quas repellendus. Ab, sed quidem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, id.',
        hover_image: hover_img,
    },
    {
        service_title: 'UI/UX Design',
        service_desc:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam ut laborum architecto provident tempore recusandae at exercitationem! Praesentium blanditiis laborum quas repellendus. Ab, sed quidem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, id.',
        hover_image: hover_img,
    },
    {
        service_title: 'Packaging Design',
        service_desc:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam ut laborum architecto provident tempore recusandae at exercitationem! Praesentium blanditiis laborum quas repellendus. Ab, sed quidem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, id.',
        hover_image: hover_img,
    },
    {
        service_title: 'Print Design',
        service_desc:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam ut laborum architecto provident tempore recusandae at exercitationem! Praesentium blanditiis laborum quas repellendus. Ab, sed quidem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, id.',
        hover_image: hover_img,
    },
];

const ServicesCards = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [cardTopPosition, setCardTopPosition] = useState(0);

    const handleMouseMove = (event) => {
        setMousePosition({
            x: event.clientX,
            y: event.clientY,
        });
    };

    const handleMouseEnter = (event) => {
        const cardRect = event.target.getBoundingClientRect();
        setCardTopPosition(cardRect.top);
    };

    const mouseResetValue = () => {
        setMousePosition({
            x: 0,
            y: 0,
        });
    };

    return (
        <div className="services-sec">

            <div className="container mx-auto">
                <div className="service-cards-wapper grid grid-cols-1 gap-10">
                    {serviceCardsData.map((item, index) => (
                        <div
                            key={index}
                            className="service-card grid lg:grid-cols-2 gap-10 p-10 relative"
                            onMouseEnter={handleMouseEnter}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={mouseResetValue}
                        >
                            <div className="service-title">
                                <h2 className="text-5xl font-bold">{item.service_title}</h2>
                                <span className="absolute top-3 left-3 font-bold text-xl">{index + 1}</span>
                            </div>
                            <div className="service-desc">
                                <p>{item.service_desc}</p>
                            </div>
                            <div
                                className="service-hover-img absolute z-40 rounded overflow-hidden"
                                style={{
                                    top: `${mousePosition.y - cardTopPosition - 100}px`,
                                    left: `${mousePosition.x - 270}px`,

                                }}
                            >
                                <img
                                    src={item.hover_image}
                                    alt="hover"
                                    className="w-full h-fit object-cover"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServicesCards;
