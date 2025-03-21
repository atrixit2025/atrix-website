import React from 'react'
import SimpleButton from '../SimpleButton'
import rise_img from '../../assets/career/comp.jpg'



const RiseWithUs = () => {
    return (
        <div>
            <div>
                <div className="container mx-auto  w-[90%] py-24">
                    <div className=' grid grid-cols-1 lg:grid-cols-2'>
                        <div className='pr-36  pt-8' >
                            <h2 className=' text-5xl font-bold '>Rise With Us</h2>
                            <p className='mt-4 mb-10'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum cum reiciendis quibusdam dolores. Itaque aut dolore at. Voluptatem, suscipit perferendis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis ipsum, corrupti fugiat itaque iste officia doloribus soluta accusantium impedit officiis. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, excepturi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, dolor. </p>
                            <SimpleButton buttonName={"Open Roles"} ></SimpleButton>
                        </div>
                        <div className=' pl-36 '>
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