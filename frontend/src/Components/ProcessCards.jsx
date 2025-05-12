import React, { useState } from 'react'
import Button from './Button'




const ProcessCards = ({ secData, targetRef }) => {

    const [activeCard , setActiveCard] = useState(0)

    return (
        <section className='process-cards-section my-36'>

            <div className="container mx-auto">
                <h2 className='sec-heading text-center my-10'>Our {secData.service_title}  Process</h2>
                {/* <p className='text-center  max-w-[800px] mx-auto mb-10'>Curious about how we create impactful brands? Our step-by-step process ensures that your brand stands out and makes a lasting impression! </p> */}
                <div className="process-cards-wrapper flex flex-wrap gap-5"  >
                    {secData.process_cards.map((item, index) => (
                        <div key={index}  onClick={ ()=> setActiveCard(index)} className={`process-card p-10 rounded-2xl bg-(--black) flex-[0] max-w-[500px] transition-all duration-500  ${activeCard === index ? 'flex-[2]' : 'flex-[1]'}`}>                            
                            <span>{index + 1}</span>
                            <h3 className={` mb-5 mt-2 font-bold ${activeCard === index ? ' text-3xl ' : 'text-xl'}`} >{item.title}</h3>
                            <p className={` transition-all duration-500  ${activeCard === index ? 'text-[16px]  opacity-100' : 'text-[0px] opacity-0'} `} >{item.desc}</p>
                        </div>
                    ))}

                </div>
                <div className='mt-14 flex justify-center' >
                {/* <Button mybtn="Get Your Quote Now" targetRef={targetRef} /> */}

                    </div>
            </div>

        </section>
    )
}

export default ProcessCards