import React, { useEffect } from "react";
import Asset1 from "../assets/ServicesIcons/Asset 1.svg";
import Asset2 from "../assets/ServicesIcons/Asset 2.svg";
import Asset3 from "../assets/ServicesIcons/Asset 3.svg";
import Asset4 from "../assets/ServicesIcons/Asset 4.svg";
import Asset5 from "../assets/ServicesIcons/Asset 5.svg";
import Asset6 from "../assets/ServicesIcons/Asset 6.svg";
import Asset7 from "../assets/ServicesIcons/Asset 7.svg";

import graphic from "../assets/ServicesImage/graphic.svg";
import dev from "../assets/ServicesImage/dev.svg";
import log from "../assets/ServicesImage/log.svg";
import marketing from "../assets/ServicesImage/marketing.svg";
import staffing from "../assets/ServicesImage/staffing.svg";
import visual from "../assets/ServicesImage/visual.svg";
import video from "../assets/ServicesImage/video.svg";

import "../CSS/one.css";
import Button from "./Button";


const services = [
  {
    id: 1,
    image: graphic,
    icon: Asset1,
    title: "Branding/graphic design",
    description:
      "Did you know? 94% of first impressions are design-related! That’s why strong visuals are key to brand success. Graphic design isn’t just about looks - it’s about delivering your message effectively. At Atrix IT Solutions, we bring your vision to life with top-notch designs tailored to your needs. Whether it’s branding, websites, infographics, or eBooks, our expert team creates visually captivating content that engages and inspires. Let’s design something impactful!",
    button: ["BRANDING", "LOGO DESIGN", "PACKAGING", "PRODUCT DESIGN", "PRINT MEDIA", "ADVERTISEMENT","UI/UX","SOCIAL MEDIA DESIGN"],
  },
  {
    id: 2,
    image: dev,
    icon: Asset2,
    title: "Web Development",
    description:
      "Create stunning, user-friendly websites that captivate, engage, and drive real results with our experts! Whether you need a new website, a redesign, or custom development, we ensure a seamless experience with modern, responsive designs tailored to your brand. Our expert team focuses on creating visually appealing and high-performing websites that boost visibility, attract customers, and grow your business effortlessly. So, take your online presence to the next level!",
    button: ["AI", "METAVERSE", "SALESFORCE", "CRM", "CMS", "PHP","LARAVEL","REACT JS","NODE JS "],

  },
  {
    id: 3,
    image: marketing,
    icon: Asset3,
    title: "Digital Marketing",
    description:
      "At Atrix IT Solutions, get your own digital marketing strategy built from scratch. Our expert team crafts tailored campaigns to drive traffic, engage customers, and convert leads into loyal clients. Whether it’s SEO, social media marketing, or content creation, we focus on delivering real, measurable results that help your brand stand out. Ready to take your business to the next level? Partner with us today and watch your online presence grow!",
    button: ["MARKETING", "STRATEGY", "SEO", "SMO", "DIGITAL ADS", "CONTENT CREATION"],
  },
  {
    id: 4,
    image: visual,
    icon: Asset5,
    title: "Visual Effects",
    description:
      "Looking to bring your ideas to life with stunning visual effects? At Atrix IT Solutions, we specialize in creating eye-catching VFX that captivate and engage your audience. Whether it's for film, advertisements, or digital media, our expert team delivers cutting-edge effects that enhance your project and leave a lasting impact. Transform your vision into reality with Atrix IT Solutions today and make your visuals unforgettable!  ",
    button: ["VFX", "SFX", "MOTION GRAPHICS", "EDITING", "COMPOSITION", "GRADING","3D"],

  },
  {
    id: 5,
    image: video,
    icon: Asset4,
    title: "Photo/Videography",
    description:
      "Your moments deserve the spotlight! At Atrix IT Solutions, we specialize in photo and videography that showcases your vision in the most stunning way. From events and branding to creative projects, our team ensures every shot is perfect. With high-quality photography and dynamic videography, we make your ideas come to life. Ready to capture the perfect shot? Partner with Atrix IT Solutions and let’s create something amazing together!",
    button: ["CORPORATE SHOOT", "PRODUCT SHOOT","FOOD PHOTOGRAPHY","COMMERCIAL SHOOT "],
  },
  {
    id: 6,
    image: staffing,
    icon: Asset6,
    title: "Staffing",
    description:
      "Ready to boost your business with a flexible workforce? Our solution helps you create a staffing plan that adapts to your needs, saving you money and ensuring compliance. With our platform, you can improve efficiency, reduce costs, and stay ahead in today’s fast-paced market. Empower your business with a staffing strategy designed to grow and succeed!",
    button: ["US STAFFING", "US RECRUITER", "PAYROLL", "TALENT ACQUISITION ", "US HIRING"],

  },
  {
    id: 7,
    image:  log,
    icon: Asset7,
    title: "Logistics ",
    description:
      "Atrix is a modern logistics firm dedicated to providing our clients throughout the world with outstanding service and cutting-edge solutions. Having worked in the transportation and logistics industry for five years, we have made a name for ourselves as a reliable partner. Road freight is in our extensive service offering, which enables us to satisfy the varied demands of companies in a number of sectors.",
    button: ["OTR", "DRAYAGE", "JCTRANS"],

  },
];

const OurServices = () => {
  useEffect(() => {
    const handleScroll = () => {
      const cards = document.querySelectorAll(".service-card");
      const stickyImages = document.querySelectorAll(".serviceImg");
      const windowHeight = window.innerHeight;

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();

        if (rect.top <= windowHeight / 2   && rect.bottom >= windowHeight / 2 ) {
          card.style.opacity = "1";
          if (stickyImages[index]) {
            stickyImages[index].classList.add("active-img");
            stickyImages[index].style.opacity = "1";
            // stickyImages[index].style.transform = "translate(-30%, -30%) ";
          }
        } else {
          card.style.opacity = "0.2";
          if (stickyImages[index]) {
            stickyImages[index].classList.remove("active-img");
            stickyImages[index].style.opacity = "0";
            // stickyImages[index].style.transform = "translate(-50%, -50%) ";
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="Services-section  text-(--whitelight) ">

      <div className="container mx-auto  max-w-[1280px] w-[90%]">
        <div className=" py-14 md:py-32 ">
        
        <div className="md:flex flex-wrap justify-start gap-10 ">
        <h2 className=" text-4xl md:text-6xl font-bold">Our <br/>Services</h2>


                    <div className='w-full max-w-[550px] mt-14'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 477 65">
                            <path fill="#2f2f2f" d="M0.333333 3C0.333333 4.47276 1.52724 5.66667 3 5.66667C4.47276 5.66667 5.66667 4.47276 5.66667 3C5.66667 1.52724 4.47276 0.333333 3 0.333333C1.52724 0.333333 0.333333 1.52724 0.333333 3ZM475 3L475.255 3.42984L476.82 2.5H475V3ZM438.668 65L441.872 60.197L436.111 59.8239L438.668 65ZM3 3.5H475V2.5H3V3.5ZM474.745 2.57016C459.928 11.3742 441.341 27.8789 438.461 60.47L439.457 60.5581C442.3 28.3895 460.613 12.1303 475.255 3.42984L474.745 2.57016Z"></path>
                        </svg>
                    </div>
                    <div className='mt-1  md:text-end'>
                        <div className=' flex md:justify-end'>
                            <Button className="" mybtn={"View All Services"} />
                        </div>
                        <p className='md:w-86 text-gray font-bold mt-4'>
                            Offer a wide range of services to help businesses establish and enhance their online presence.
                        </p>
                    </div>
                </div>
        
        <div className="flex flex-col md:flex-row   gap-2  mt-10  md:mt-20 ">

          <div className="w-full md:w-1/2  ">
            {services.map((service) => (
              <div
                key={service.id}
                className="service-card opacity-30 transition-opacity duration-300 mt-20 md:mt-40 first:mt-0 "
              >
                <div className="flex justify-center items-center pb-5">
                 <img   key={service.id}
                  src={service.image}
                  alt={service.title} 
                  className="md:hidden flex h-80 w-auto"
                  />
                  </div>
                <div className="flex  items-center gap-3 ">
                  <div className="min-w-12 h-12 relative flex justify-center items-center bg-gradient-to-r from-(--blue) to-(--green) rounded-full translate-y-2 mr-1">
                  <img src={service.icon} className="w-6 h-6 filter grayscale-100 brightness-800" />
                    {/* <div className="inline-block ml-2 mt-2 text-2xl">{service.icon}</div> */}
                  </div>
                  <h3 className="text-xl md:text-4xl font-bold mt-4 ">{service.title}</h3>
                </div>
                <p className="text-sm md:text-lg mt-6 md:mt-9 text-(--white) leading-7 md:leading-8">
                  {service.description}
                </p>
                {service.button && (
                <div className="flex flex-wrap mt-6 md:mt-10">
               {  service.button.map((btn, i) => (
                    <div
                      key={i}
                      className="custom-gradient duration-300 rounded-full px-4 py-1 md:px-6 md:py-2 mt-2 mr-2"

                    >
                      {btn}
                    </div>
                  ))}
                </div>
            )}
                
              </div>
            ))}
          </div>
 
          <div className="w-1/2  relative md:block   hidden  ">
            <div className="sticky top-[25vh]  w-[75%] min-h-[400px] ">
              {services.map((serviceimg, index) => (
                <img
                  key={serviceimg.id}
                  src={serviceimg.image}
                  alt={serviceimg.title}
               className="serviceImg absolute z-10 left-1/4  h-full w-full opacity-0 transition-all duration-200"
                />
              ))}
            </div>
          </div>
     
        </div>
      </div>
    </div>
    </div>
  );
};

export default OurServices;



{/* <div className="w-full md:w-1/2 relative mt-10 md:mt-0">
<div className="sticky top-20 md:top-96 h-96">
  {services.map((serviceimg, index) => (
    <img
      key={serviceimg.id}
      src={serviceimg.image}
      alt={serviceimg.title}
      className="serviceImg absolute z-10 left-1/2 md:left-96 transform -translate-x-1/2 max-w-[90%] md:max-w-[100%] h-auto opacity-0 scale-70 transition-all duration-200"
    />
  ))}
</div>
</div> */}