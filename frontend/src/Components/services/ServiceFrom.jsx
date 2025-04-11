import React from 'react'
import ColoredButton from '../ColoredButton'

const ServiceFrom = () => {
    return (
        <section className="service-from-sec my-28">
            <div className="container mx-auto">
                <form className="form-wrapper  grid grid-cols-12 space-x-36 ">
                    <div className="form-sec col-span-8 space-y-10 ">

                        <div className='flex items-end gap-8' >
                            <p className="text-white text-lg text-end py-2 self-end   min-w-1/3">Hi! My name is</p>
                            <input type="text" placeholder="Full Name" className=" text-lg w-full bg-transparent  py-2 border-b border-gray-600 text-gray-400  outline-none " />
                        </div>


                        <div className='flex gap-8'>
                            <p className="text-white text-lg text-end py-2 self-end  min-w-1/3">You can reach me at</p>
                            <input type="email" placeholder="Email ID" className=" text-lg w-full bg-transparent b py-2 border-b border-gray-600 text-gray-400 outline-none" />
                        </div>

                        <div className='flex gap-8'> <p className="text-white text-lg text-end py-2 self-end  min-w-1/3">or Call me at</p>
                            <input type="tel" placeholder="Phone No." className=" text-lg  w-full bg-transparent py-2  border-b border-gray-600 text-gray-400 outline-none" /></div>


                        <div className='flex gap-8'>
                            <p className="text-white text-lg text-end  min-w-1/3 self-end">Also, I would like to add</p>

                            <textarea placeholder="Message" rows="3" className=" text-lg  w-full bg-tra py-2 nsparent border-b border-gray-600 text-gray-400 outline-none"></textarea>
                        </div>

                        <div className=' flex justify-end mt-10'>
                            <button type="submit" className=" bg-gradient-to-r from-blue-400 to-green-400 text-white py-1  ms-auto   px-9 rounded-full text-lg cursor-pointer ">Let's Us Begin</button>

                        </div>


                    </div>
                    <div className="form-check-btns col-span-4  ">
                        <p className="text-white text-lg  mb-6">I'm interested in...</p>
                        <ul className="flex flex-wrap gap-2 mb-2 ">
                            {['Branding', 'Website Design', 'Digital Marketing', 'Website Development', 'Video Production', 'Product Design', 'Social Media Design'].map((tag, index) => (


                                <li>
                                    <input type="checkbox" name={tag} id={tag} className="peer hidden  " />
                                    <label htmlFor={tag} className=" contactFrom-custom-gradient border  px-4 inline-block peer-checked:bg-gradient-to-r from-blue-400 to-green-400 rounded-full font-medium py-1 cursor-pointer ">
                                        {tag}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* <div className='py-5' ><button className=' bg-gradient-to-r from-(--blue) to-(--green) px-6 py-2 rounded-full font-bold ms-auto' >Let's Us Begin </button> </div> */}
                </form>

            </div>
        </section>
    )
}

export default ServiceFrom