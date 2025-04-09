import React from 'react'

const brandingCardData = [
    {
        cardTitle: "Because",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex perferendis aliquam labore natus ipsa voluptatem saepe, eos tempore corrupti nemo soluta voluptate velit sequi harum, perspiciatis suscipit molestias voluptas ea exercitationem optio accusantium. Eum, placeat ad! Sapiente magnam quisquam voluptatum ducimus ab. Velit atque dicta quasi tempora rem omnis rerum ab, ullam maiores fuga dolores est facere, consequuntur ipsa aliquam."
    },
    {
        cardTitle: "We Need",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex perferendis aliquam labore natus ipsa voluptatem saepe, eos tempore corrupti nemo soluta voluptate velit sequi harum, perspiciatis suscipit molestias voluptas ea exercitationem optio accusantium. Eum, placeat ad! Sapiente magnam quisquam voluptatum ducimus ab. Velit atque dicta quasi tempora rem omnis rerum ab, ullam maiores fuga dolores est facere, consequuntur ipsa aliquam."
    },
    {
        cardTitle: "Work",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex perferendis aliquam labore natus ipsa voluptatem saepe, eos tempore corrupti nemo soluta voluptate velit sequi harum, perspiciatis suscipit molestias voluptas ea exercitationem optio accusantium. Eum, placeat ad! Sapiente magnam quisquam voluptatum ducimus ab. Velit atque dicta quasi tempora rem omnis rerum ab, ullam maiores fuga dolores est facere, consequuntur ipsa aliquam."
    },

]

const WhyNeedBranding = () => {
    return (
        <div className='why-need-branding my-20' >
            <div className="container mx-auto ">
                <h2 className='text-6xl text-center mb-10 ' >Why do you need branding</h2>
                <div className="branding-Cards grid grid-cols-3 gap-5">
                    {brandingCardData.map((item, index) => (
                        <div className="branding-card p-12 bg-(--black) rounded-2xl">
                            <h3 className='text-3xl mb-6' >{item.cardTitle}</h3>
                            <p>{item.desc}</p>
                        </div>
                    ))}


                </div>
            </div>


        </div>
    )
}

export default WhyNeedBranding