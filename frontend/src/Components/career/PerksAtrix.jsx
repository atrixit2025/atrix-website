import React from 'react'
import value from '../../assets/calendar_icon.png'
import cup_icon from '../../assets/career/cup.svg'
import date_icon from '../../assets/career/date.svg'
import ppl_icon from '../../assets/career/ppl.svg'
import mask_icon from '../../assets/career/mask.svg'



const PerksCardContent = [
    {
        icon: date_icon,
        title: "Five Days A Week",
    },
    {
        icon: ppl_icon,
        title: "Inclusive Workplace",
    },
    {
        icon: mask_icon,
        title: "Fun Fridays",
    },
    {
        icon: cup_icon,
        title: "Non-Stop Coffee",
    },
]


const PerksAtrix = () => {
    return (
        <div>

            <div className="container mx-auto  max-w-[90%] pt-32">
                <div> <h2 className=' text-6xl text-center font-bold mb-12 ' >Perks At Atrix</h2> </div>
                <div className="contact-cards-wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4  ">
                    {PerksCardContent.map((item, index) => (
                        <div className="contact-card  py-10 px-8  " >
                            <div className=' max-w-16 h-auto mb-6 mx-auto '> <img src={item.icon} alt="" className=' w-full h-full' /> </div>
                            <h3 className='text-2xl font-semibold  text-center ' >{item.title}</h3>
                            <p className='mt-4 '>{item.desc}</p>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default PerksAtrix