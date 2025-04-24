import React, { useState } from 'react';
import './ServiceTesting.css';
import hover_img from '../assets/service-hover.jpg';


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

const ServiceTesting = ({ secData }) => {
    // Create individual hover states for each card
    const [cards, setCards] = useState(
        serviceCardsData.map(() => ({
            show: false,
            x: 0,
            y: 0
        }))
    );



    const handleMouseMove = (event, index) => {
        const cardRect = event.currentTarget.getBoundingClientRect();
        setCards(prev => {
            const newCards = [...prev];
            newCards[index] = {
                show: true,
                x: event.clientX - cardRect.left,
                y: event.clientY - cardRect.top
            };
            return newCards;
        });
    };

    const handleMouseLeave = (index) => {
        setCards(prev => {
            const newCards = [...prev];
            newCards[index].show = false;
            return newCards;
        });
    };

    return (
        <div className='service-test'>

            <div className="container mx-auto">
                <div className='text-center' >
                    <h2 className=' text-6xl font-bold mb-6' >{secData.service_id}  </h2>
                    <p className=' max-w-[900px] mx-auto mb-14 leading-[1.65rem] '>From initial concept to final execution, we deliver complete branding solutions that make lasting impressions in competitive markets. </p>
                </div>
            </div>


            <div className="servce-cards-wrapper">
                {serviceCardsData.map((item, index) => (

                    <>
                        <div className='service-cards-wrapper' >
                            <div className="container mx-auto">
                                <div
                                    key={index}
                                    className="serv-card h-48 border my-5 service-card grid lg:grid-cols-2 gap-10 pb-12 pt-15 relative container mx-auto"
                                    onMouseMove={(e) => handleMouseMove(e, index)}
                                    onMouseLeave={() => handleMouseLeave(index)}
                                >


                                    <div className="service-title flex  items-center relative ml-12 ">
                                        <h2 className="text-5xl font-bold">heading</h2>
                                        {/* <span className="absolute -top-2 -left-12 font-bold text-xl">{serindex < 9 ? "0" : ""}{serindex + 1}</span> */}
                                    </div>
                                    <div className="service-desc">
                                        <p className='leading-[1.65rem]'>descriptinon</p>
                                    </div>


                                    {cards[index].show && (
                                        <div
                                            className="w-[200px] h-auto hover-img-wrapper absolute z-50 pointer-events-none"
                                            style={{
                                                top: `${cards[index].y}px`,
                                                left: `${cards[index].x}px`,
                                                transform: 'translate(-50%, -50%)  rotate(-15deg)'
                                            }}
                                        >
                                            <img src={hover_img} alt="Hover" className='w-full h-auto' />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>


                    </>
                ))}
            </div>

        </div>
    );
};

export default ServiceTesting;