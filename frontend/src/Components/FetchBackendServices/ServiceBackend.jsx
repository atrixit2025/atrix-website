import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import axios from "axios";

const ServiceBackend = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5300/Services/get");
        
        const servicesWithImages = await Promise.all(
          response.data.Services.map(async (service) => {
            // Default image URLs
            let featuredImageUrl = "/images/user/user-22.jpg";
            let iconImageUrl = "/images/default-icon.png";
            let bannerImageUrl = "/images/default-banner.jpg";
            
            // Fetch featured image if available
            if (service.FeaturedImage) {
              try {
                const imgResponse = await axios.get(
                  `http://localhost:5300/Image/get/${service.FeaturedImage}`
                );
                featuredImageUrl = imgResponse.data.Image?.image || featuredImageUrl;
              } catch (error) {
                console.error("Error fetching featured image:", error);
              }
            }
            
            // Fetch icon image if available
            if (service.iconImageId) {
              try {
                const iconResponse = await axios.get(
                  `http://localhost:5300/Image/get/${service.iconImageId}`
                );
                iconImageUrl = iconResponse.data.Image?.image || iconImageUrl;
              } catch (error) {
                console.error("Error fetching icon image:", error);
              }
            }
            
            // Fetch banner image if available
            if (service.Bannerdata?.[0]?.imageId) {
              try {
                const bannerResponse = await axios.get(
                  `http://localhost:5300/Image/get/${service.Bannerdata[0].imageId}`
                );
                bannerImageUrl = bannerResponse.data.Image?.image || bannerImageUrl;
              } catch (error) {
                console.error("Error fetching banner image:", error);
              }
            }
            
            return {
              id: service._id,
              title: service.title,
              category: service.category,
              description: service.description,
              quote: service.Servicesquote,
              date: new Date(service.updatedAt).toLocaleDateString(),
              featuredImage: featuredImageUrl.startsWith('http') ? featuredImageUrl : `http://localhost:5300${featuredImageUrl}`,
              iconImage: iconImageUrl.startsWith('http') ? iconImageUrl : `http://localhost:5300${iconImageUrl}`,
              bannerImage: bannerImageUrl.startsWith('http') ? bannerImageUrl : `http://localhost:5300${bannerImageUrl}`,
              bannerData: service.Bannerdata || [],
              tags: service.tags || [],
              whyNeed: service.WhydoNeed || [],
              process: service.Process || [],
              textToImageData: service.texttoimageandimagetotext || null,
              headerContent: service.Headercontent?.[0] || null,
              whyAtrix: service.WhyAtrix || [],
              portfolioCategories: service.portfolioCategories || [],
              faqCategories: service.faqCategories || [],
              updatedAt: service.updatedAt,
            };
          })
        );
        
        setServices(servicesWithImages);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load services. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleClick = (service) => {
    navigate(`/${
        service.title
        .toLowerCase() 
        .replace(/\s+/g, '-')    
        .replace(/[^\w\-]+/g, '') 
        .replace(/\-\-+/g, '-')   
        .replace(/^-+/, '')      
        .replace(/-+$/, '')}`, { 
      state: { 
        service: {
          id: service.id,
          title: service.title,
          category: service.category,
          description: service.description,
          quote: service.quote,
          featuredImage: service.featuredImage,
          iconImage: service.iconImage,
          bannerImage: service.bannerImage,
          bannerData: service.bannerData,
          tags: service.tags,
          textToImageData: service.textToImageData,
          headerContent: service.headerContent,
          whyNeed: service.whyNeed,
          process: service.process,
          whyAtrix: service.whyAtrix,
          portfolioCategories: service.portfolioCategories,
          faqCategories: service.faqCategories
        } 
      } 
    });
  };

  if (loading) return <div className="container mx-auto py-20 text-center">Loading services...</div>;
  if (error) return <div className="container mx-auto py-20 text-center text-red-500">{error}</div>;
  if (services.length === 0) return <div className="container mx-auto py-20 text-center">No services found</div>;

  return (
    <>
      <div className="services-hero relative h-full w-full z-0 pt-55 pb-20">
        <div className="services-hero-text container mx-auto">
          <h1 className="text-9xl font-[900]">
            WEBSITE <br />
            DESIGN AND <br />
            DEVELOPMENT
          </h1>
        </div>
      </div>

      <div className="Brand-Experience container flex justify-between mx-auto mt-22">
        <h2 className="text-2xl">
          Crafted by our team of experts and powered by cutting-edge AI
          technology, our services deliver measurable, impactful results that
          drive growth and elevate your business.
        </h2>
      </div>

      <div className="container mx-auto">
        <div className="columns-3 gap-20 mt-12">
          {services.map((service) => (
            <div key={service.id} className="pt-18 inline-block w-full">
              <h3 className="text-3xl font-bold flex items-center gap-2">
                <div className="icon-bg min-w-12 h-12 relative flex justify-center items-center bg-gradient-to-r from-(--blue) to-(--green) rounded-full translate-y-2 mr-1 mb-3">
                  <img
                    className="w-6 h-6 filter brightness-0 invert"
                    src={service.iconImage}
                    alt={service.title}
                    onError={(e) => {
                      e.target.src = '/images/default-icon.png';
                    }}
                  />
                </div>
                {service.title}
              </h3>

           

              <ul className="mt-4 text-lg">
                {service.tags.map((listItem, liIndex) => (
                  <li
                    key={`${service.id}-${liIndex}`}
                    className="flex items-center justify-between border-b-2 border-white/15 hover:border-(--green) pb-4 pt-4 group cursor-pointer hover:scale-102 duration-350"
                    onClick={() => handleClick(service)}
                  >
                    <span className="flex items-center justify-between w-full group-hover:text-(--green) font-bold">
                      {listItem}
                      <AiOutlineArrowRight className="text-gray-500 text-2xl group-hover:text-(--green) -rotate-45 group-hover:rotate-2 transform duration-300" />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ServiceBackend;