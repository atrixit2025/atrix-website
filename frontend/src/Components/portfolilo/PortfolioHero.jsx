import React from 'react'
import hero_img from '../../assets/portfolio_banner.png'
const PortfolioHero = () => {
    return (
        <div>
            <div className=" mx-auto px-5 sm:px-6 lg:px-8">
                <div className='grid grid-cols-1' >
                    <div className=' relative' >
                        <img src={hero_img} alt="" className=' w-full h-auto ' />
                        <h1
                            className='extra-large-heading text-white text-center absolute w-full top-1/2 -translate-y-1/2'
                            style={{
                                textShadow: '3px 3px 6px rgba(0,0,0,0.5), 0 0 20px rgba(255, 255, 255, 0.3)'
                            }}
                        >
                            portfolio
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PortfolioHero


