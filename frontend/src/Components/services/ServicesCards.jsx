import React, { useState } from 'react'
import hover_img from '../../assets/service-hover.jpg'
import "./ServicesCards.css"




const ServicesCards = () => {

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const handleMouseMove = (event) => {
        setMousePosition({
            x: event.clientX,
            y: event.clientY,
        });
    };
    console.log(mousePosition)
    console.log(mousePosition.y)

    // const mouse_x = MouseEvent.postion.x
    // const mouse_y = MouseEvent.postion.y


    const img_x = "300px"
    const img_y = "100px"




    return (
        <div className='services-sec' >
            <div className="container mx-auto">
                <div className="service-cards-wapper">
                    <div className="service-card grid lg:grid-cols-2 gap-10 border p-10 relative ">
                        <div className="service-title ">
                            <h2 className='text-7xl font-bold' >Branding </h2>
                            <span className=' absolute top-3 left-3 font-bold text-xl ' >01</span>
                        </div>
                        <div className="service-desc">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam ut laborum architecto provident tempore recusandae at exercitationem! Praesentium blanditiis laborum quas repellendus. Ab, sed quidem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, id. </p>
                        </div>
                        <div className='service-hover-img absolute w-[230px] h-[300px]  overflow-hidden' style={{ top: `${img_y}`, left: `${img_x}` }} >
                            <img src={hover_img} alt="" className='w-full h-fit object-cover rounded-xl' />
                        </div>

                    </div>
                </div>
            </div>
        </div >
    )
}

export default ServicesCards