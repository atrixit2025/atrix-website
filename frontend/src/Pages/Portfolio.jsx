import React, { useEffect } from 'react'
import PortfolioHero from '../Components/portfolilo/PortfolioHero'
import PortfolioCard from '../Components/portfolilo/PortFolioCards'







const Portfolio = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className='pt-40'>
            <PortfolioHero></PortfolioHero>
            <PortfolioCard></PortfolioCard>
        </div>
    )
}
 
export default Portfolio 