import React from 'react'

const content = [
    {
      title: "You want to stay relevant",
      text: "In a rapidly evolving digital realm, a modern website is crucial. It’s not about chasing trends, it’s about meeting user expectations. A new and optimized website ensures your brand stays competitive and in step with the latest technology and trends."
    },
    {
      title: "Your user experience needs a makeover",
      text: "Brands exhaust a lot of resources to garner attention from tech-savvy audiences. In today’s fast-paced digital environment, a faulty user experience will send users bouncing right out of the website. A redesigned website refocuses your digital presence into an intuitive, user-friendly experience."
    },
    {
      title: "Your website has an expiration date",
      text: "Even the most optimized and expertly-designed websites lose their luster. To extend the ‘websites are your home’ analogy, consider how often you need to repair and update things around the house. The same is true for websites—a fresh, optimized website signals your commitment to staying current and efficient."
    },
    {
      title: "Your website has an expiration date",
      text: "Even the most optimized and expertly-designed websites lose their luster. To extend the ‘websites are your home’ analogy, consider how often you need to repair and update things around the house. The same is true for websites—a fresh, optimized website signals your commitment to staying current and efficient."
    }
  ];

const OurServiceCard = () => {
   
  return (
   <>
  <div className="container mx-auto flex ">
      <div className="row flex -mx-8  flex-wrap">
        {content.map((item, index) => (
          <div key={index} className="col-4 w-[33.3%] px-8 pt-8 ">
            <h3 className="text-3xl font-bold text-[var(--blue)]">{item.title}</h3>
            <p className="mt-2 text-lg">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
   
   
   </>
  )
}

export default OurServiceCard