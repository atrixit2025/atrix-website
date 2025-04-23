import React from 'react'


const WebDevelopment = ({ secData }) => {
    return (
            <div className='web-development-sec my-36'>
                <div className="container mx-auto ">
                    <div className="web-dev-wrapper grid grid-cols-12 gap-10 ">
                        <div className=' col-span-6' >
                            <h2 className='text-4xl font-bold leading-11 ' >{secData.heading_1}</h2>
                        </div>
                        <div className="col-span-6 flex">
                            <div className="img-wrapper ml-auto ">
                                <img src={secData.img_1} alt="" className='' />
                            </div>
                        </div>
                    </div>
                    <div className="web-dev-wrapper grid grid-cols-12 gap-10 mt-12 ">
                        <div className=' col-span-7' >
                            <div className="img-wrapper ml-auto w-full">
                                <img src={secData.img_2} alt="" className='w-full' />
                            </div>
                        </div>
                        <div className="col-span-5 flex items-end justify-end">
                            <h3 className='text-xl font-bold  max-w-[570px] ' >{secData.description_1} </h3>
                        </div>
                    </div>
                </div>
            </div>

        


    )
}

export default WebDevelopment