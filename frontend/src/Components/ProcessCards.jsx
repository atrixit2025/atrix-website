import React, { useState } from 'react'

const processCardsData = [
    {
        title: "Research and Brainstorm",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore cum culpa perspiciatis fugit enim provident eveniet. Laborum atque eum architecto, molestias sint delectus. Facere, perferendis eligendi? Eaque maxime pariatur impedit?"
    },
    {
        title: "Research and Brainstorm",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore cum culpa perspiciatis fugit enim provident eveniet. Laborum atque eum architecto, molestias sint delectus. Facere, perferendis eligendi? Eaque maxime pariatur impedit?"
    },
    {
        title: "Research and Brainstorm",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore cum culpa perspiciatis fugit enim provident eveniet. Laborum atque eum architecto, molestias sint delectus. Facere, perferendis eligendi? Eaque maxime pariatur impedit?"
    },
    {
        title: "Research and Brainstorm",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore cum culpa perspiciatis fugit enim provident eveniet. Laborum atque eum architecto, molestias sint delectus. Facere, perferendis eligendi? Eaque maxime pariatur impedit?"
    },
    {
        title: "Research and Brainstorm",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore cum culpa perspiciatis fugit enim provident eveniet. Laborum atque eum architecto, molestias sint delectus. Facere, perferendis eligendi? Eaque maxime pariatur impedit?"
    },
   
]



const ProcessCards = () => {

    const [activeCard , setActiveCard] = useState(1)

    return (
        <section className='process-cards-section my-20'>

            <div className="container mx-auto">
                <h1 className='text-6xl font-bold text-center my-10'>Process</h1>
                <div className="process-cards-wrapper flex gap-5"  >
                    {processCardsData.map((item, index) => (
                        <div key={index}  onClick={ ()=> setActiveCard(index)} className={`process-card p-10 rounded-2xl bg-(--black) flex-[0] transition-all duration-500  ${activeCard === index ? 'flex-[1]' : ''}`}>                            
                            <span>{index + 1}</span>
                            <h3 className={`text-3xl mb-5 mt-2  ${activeCard === index ? '  ' : ''}`} >{item.title}</h3>
                            <p className={` transition-all duration-500  ${activeCard === index ? 'text-[16px]  opacity-100' : 'text-[16px] opacity-0'} `} >{item.desc}</p>
                        </div>
                    ))}

                </div>
            </div>

        </section>
    )
}

export default ProcessCards