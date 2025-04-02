import React from 'react'
import SimpleButton from '../SimpleButton'
import rise_img from '../../assets/career/comp.jpg'



const RiseWithUs = () => {
    return (
        <div>
            <div>
                <div className="container mx-auto  w-[90%] py-24">
                    <div className=' grid grid-cols-1 lg:grid-cols-2 gap-y-7'>
                        <div className='md:pr-36  pt-8' >
                            <h2 className=' text-4xl  md:text-5xl font-bold '>Be a part of Atrix IT Solutions </h2>
                            <p className='mt-4 mb-10'> Atrix Solution is more than just a workplace it’s a place where creative and hardworking people come together to achieve great things. We believe in teamwork, innovation, and helping each other grow.
                            </p>
                            <SimpleButton buttonName={"Open Vacancies"} ></SimpleButton>
                        </div>
                        <div className=' md:pl-36 '>
                            <div className="img-wraper rounded-2xl overflow-hidden ">
                                <img src={rise_img} alt="" className=' h-full w-full ' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RiseWithUs