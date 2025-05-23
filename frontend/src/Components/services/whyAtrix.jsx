import React from 'react'


const WhyAtrix = ({ secData }) => {
  return (
    <div className='why-atrix my-36' >
      <div className='container  mx-auto' >
        <div>  <h2 className='sec-heading font-bold mb-8 text-center' >{secData.why_atrix_heading}</h2> </div>
        <div className="why-atrix-content-content grid grid-cols-1 lg:grid-cols-2 space-y-4 ">
          <div className="left flex   text-4xl font-bold">
            <h3 className='sub-sec-heading max-w-[380px]  ' >{secData.why_atrix_subheading}</h3>
          </div>
          <div className="right">
            {secData.why_atrix_desc.map((item, index) => (
         
              <p key={index} className='mb-3'>{item}</p>
              
             
            ))}

          {/* <p className='mb-3'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat recusandae nisi placeat maxime. Quam, pariatur. Magni sint aperiam tempora ipsa iusto repellendus et asperiores, cupiditate, vel, maxime incidunt suscipit! Ad a odio sit quasi? Labore animi voluptatibus consectetur natus dolorum. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio, nesciunt. </p>
              <p className='mb-3'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim praesentium totam reprehenderit iusto quos veritatis labore beatae sed blanditiis omnis.</p>
              <p className='mb-3'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe in voluptas ipsum necessitatibus nulla et provident eum placeat soluta perspiciatis.</p> */}
        </div>
      </div>
    </div>
    </div >
  )
}

export default WhyAtrix