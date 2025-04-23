
import React from 'react'



const WhyNeedBrandingBackend = ({WhyNeedata}) => {
    

    return (
        <div className='why-need-branding my-36' >
            <div className="container mx-auto ">
                <h2 className='text-6xl font-bold text-center mb-14 ' >Why do you need {WhyNeedata.title}</h2>
                <div className="branding-Cards grid grid-cols-3 gap-5">
                    {WhyNeedata.data.map((item, index) => (
                        <div className="branding-card p-12 bg-(--black) rounded-2xl">
                            <h3 className='text-3xl mb-2 font-bold' >{item.cardheading}</h3>
                            <p>{item.description}</p>
                        </div>
                    ))}


                </div>
            </div>


        </div>
    )
}

export default WhyNeedBrandingBackend