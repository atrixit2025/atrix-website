import React from 'react'
import PortfolioHero from '../Components/portfolilo/PortfolioHero'
import PortFolioCards from '../Components/portfolilo/PortFolioCards'



const Portfolio = () => {
    return (
        <div className='pt-40'>
            <PortfolioHero></PortfolioHero>
            <PortFolioCards></PortFolioCards>
        </div>
    )
}

export default Portfolio