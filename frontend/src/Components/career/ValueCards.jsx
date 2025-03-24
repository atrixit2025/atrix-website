import React from 'react'

const ValueCards = ({ ValueCardContent , ValueCardheadings }  ) => {
    console.log(ValueCardheadings )
    return (
        <div>

            <div className="container keys-sec mx-auto  pt-32">
                <div>

                {ValueCardheadings.map((item, index)=>(
                    <>
                    <div key={index}>
                     <p className="text-lg md:text-xl pb-2 text-center">{item.secSubHeading}</p>
                    <h2 className=' text-6xl text-center font-bold mb-12 ' >{item.secHeading}</h2> 
                    </div>
                    </>
                
                ))}
                    

                    {/* <p className="text-lg md:text-xl pb-2 text-center"></p>
                    <h2 className=' text-6xl text-center font-bold mb-12 ' >{ValueCardheading.secHeading}</h2>  */}

                     </div>
                <div className="contact-cards-wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  ">
                    {ValueCardContent.map((item, index) => (
                        <div key={index} className="contact-card bg-[#444343] py-10 px-8 rounded-3xl shadow-2xl shadow-white/5 " >
                            <div className=' max-w-16 h-auto mb-5 '> <img src={item.icon} alt="" className=' w-full h-full' /> </div>
                            <h3 className='text-3xl font-bold ' >{item.title}</h3>
                            <p className='mt-4 '>{item.desc}</p>
                        </div>
                    ))}

                </div>
            </div>
        </div>


    )
}

export default ValueCards