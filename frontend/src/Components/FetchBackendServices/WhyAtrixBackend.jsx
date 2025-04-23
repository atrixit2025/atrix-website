
import React from 'react'


const WhyAtrixBackend = ({ whyAtrixdata }) => {
    const data = whyAtrixdata?.[0]; // Access the first item safely
  
    if (!data) return null; // Guard in case it's empty
  
    return (
      <div className='why-atrix my-36'>
        <div className='container max-w-[1150px] mx-auto'>
          <div>
            <h2 className='text-6xl font-bold mb-8 text-center'>Why Atrix</h2>
          </div>
          <div className="why-atrix-content-content grid grid-cols-2">
            <div className="left flex items-center text-4xl font-bold">
              <h3 className='max-w-[380px]'>{data.heading}</h3>
            </div>
            <div className="right">
              <div
                className="prose prose-lg max-w-none space-y-3"
                dangerouslySetInnerHTML={{ __html: data.description }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
  

export default WhyAtrixBackend