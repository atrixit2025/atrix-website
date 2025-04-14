import React from 'react'
import img_1 from '../../assets/DTS_Influencer.webp'
import img_2 from '../../assets/infulancer.png'

const WebDevelopment = () => {
    return (
        <div className='web-development-sec my-36'>
            <div className="container mx-auto ">
                <div className="web-dev-wrapper grid grid-cols-12 gap-10 ">
                    <div className=' col-span-6' >
                        <h2 className='text-4xl font-bold leading-11 '  >Web Development Creates a Digital Home That Sets the Foundation to Transform Your Brand Experience.</h2>
                    </div>
                    <div className="col-span-6 flex">
                        <div className="img-wrapper ml-auto ">
                        <img src={img_1} alt="" className='' />
                        </div>
                    </div>
                </div>
                <div className="web-dev-wrapper grid grid-cols-12 gap-10 mt-12 ">
                    <div className=' col-span-7' >
                    <div className="img-wrapper ml-auto w-full">
                            <img src={img_2} alt="" className='w-full' />
                        </div>
                    </div>
                    <div className="col-span-5 flex items-end justify-end">
                       <h3  className='text-xl font-bold  max-w-[570px] ' >Your website is representative of everything your brand stands for—a beacon for your digital presence that everyone will refer to. That’s a tall order, which is why we ground ourselves in understanding who you are before we tackle web development.</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WebDevelopment