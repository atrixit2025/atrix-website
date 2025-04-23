import React, { useEffect, useState } from 'react';
import axios from 'axios';
import hover_img from '../../assets/service-hover.jpg';
import './ServicesCardsBackend.css';

const ServicesCardsBackend = ({ content }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [cardTopPosition, setCardTopPosition] = useState(0);
    const [images, setImages] = useState({}); // Store images by their ID

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

    useEffect(() => {
        const fetchImages = async () => {
            try {
                if (content?.headingAnddescription) {
                    const imageFetchPromises = content.headingAnddescription
                        .filter(item => item.imageId)
                        .map(async (item) => {
                            try {
                                const response = await axios.get(
                                    `http://localhost:5300/Image/get/${item.imageId}`
                                );
                                return {
                                    id: item.imageId,
                                    url: response.data.Image?.image || '/images/default-image.jpg'
                                };
                            } catch (error) {
                                console.error(`Error fetching image ${item.imageId}:`, error);
                                return {
                                    id: item.imageId,
                                    url: '/images/default-image.jpg'
                                };
                            }
                        });

                    const fetchedImages = await Promise.all(imageFetchPromises);
                    const imagesMap = fetchedImages.reduce((acc, img) => {
                        acc[img.id] = img.url;
                        return acc;
                    }, {});

                    setImages(imagesMap);
                }
            } catch (error) {
                console.error("Error in image fetching:", error);
            }
        };

        fetchImages();
    }, [content]);

    return (
        <div className="services-sec mt-36">
            <div className="container mx-auto">
                <div className='text-center'>
                    {content?.centerHeading && (
                        <h2 className='text-6xl font-bold mb-6'>{content.centerHeading}</h2>
                    )}
                    {content?.centerDescription && (
                        <p className='max-w-[900px] mx-auto mb-14'>{content.centerDescription}</p>
                    )}
                </div>
            </div>
            <div>
                {content?.headingAnddescription?.length > 0 && (
                    <div className="service-cards-wapper grid grid-cols-1">
                        {content.headingAnddescription.map((item, index) => (
                            <div className='border-b' key={item._id || index}>
                                <div
                                    className="service-card grid lg:grid-cols-2 gap-10 pb-12 pt-15 relative container mx-auto"
                                    onMouseEnter={handleMouseEnter}
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={mouseResetValue}
                                >
                                    <div className="service-title flex items-center relative ml-12">
                                        {item.heading && (
                                            <h2 className="text-5xl font-bold">{item.heading}</h2>
                                        )}
                                        <span className="absolute -top-2 -left-12 font-bold text-xl">
                                            {index < 9 ? "0" : ""}{index + 1}
                                        </span>
                                    </div>
                                    {item.description && (
                                        <div className="service-desc">
                                            <p>{item.description}</p>
                                        </div>
                                    )}
                                    {item.imageId && (
                                        <div
                                            className="service-hover-img absolute z-40 rounded overflow-hidden"
                                            style={{
                                                top: `${mousePosition.y - cardTopPosition - 100}px`,
                                                left: `${mousePosition.x - 270}px`,
                                            }}
                                        >
                                            <img
                                                src={
                                                    images[item.imageId]?.startsWith('http') 
                                                        ? images[item.imageId] 
                                                        : `http://localhost:5300${images[item.imageId] || '/images/default-image.jpg'}`
                                                }
                                                alt={item.heading || 'Content image'}
                                                className="w-full h-fit object-cover"
                                                onError={(e) => {
                                                    e.target.src = '/images/default-image.jpg';
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServicesCardsBackend;