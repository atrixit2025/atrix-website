import React from "react";
import { Link } from "react-router-dom"; 
import { AiOutlineArrowRight } from "react-icons/ai";
import Button from "../Button";
import Asset1 from "../../assets/ServicesIcons/Asset 1.svg";
import Asset2 from "../../assets/ServicesIcons/Asset 2.svg";
import Asset3 from "../../assets/ServicesIcons/Asset 3.svg";
import Asset4 from "../../assets/ServicesIcons/Asset 4.svg";
import Asset5 from "../../assets/ServicesIcons/Asset 5.svg";
import Asset6 from "../../assets/ServicesIcons/Asset 6.svg";
import Asset7 from "../../assets/ServicesIcons/Asset 7.svg";

const content = [
  {
     icon: Asset1,
    title: "Branding/Graphic Design",
    items: [
      "Branding",
      "Logo Design",
      "Packaging",
      "Product Design",
      "Print Media",
      "Advertisement",
      "Ui/UX",
      "Social Media Design",
    ],
  },
  {
     icon: Asset2,
    title: "Web Development",
    items: [
      "AI",
      "Metaverse",
      "Salesforce",
      "CRM",
      "CMS",
      "PHP",
      "Laravel",
      "React Js",
      "Node Js",
    ],
  },
  {
     icon: Asset3,
    title: "Digital Marketing",
    items: [
      "Marketing",
      "Strategy",
      "SEO",
      "SMO",
      "Digital Ads",
      "Content Creation",
    ],
  },
  {
     icon: Asset4,
    title: "Visual Effects",
    items: [
      "VFX",
      "SFX",
      "3D",
      "Editing",
      "Composition",
      "Grading",
      "Motion Graphics",
    ],
  },
  {
     icon: Asset5,
    title: "Photo/Video Production",
    items: [
      "Corporate Shoot",
      "Product Shoot",
      "Food Photography",
      "Commercial Shoot",
    ],
  },
  {
     icon: Asset6,
    title: "Staffing",
    items: [
      "Us Staffing",
      "Us Recruiter",
      "Payroll",
      "Talent Acquisition",
      "Us Hiring",
    ],
  },
  {
     icon: Asset7,
    title: "Logistics",
    items: ["OTR", "Drayage", "Jctrans"],
  },
];

const OurServiceCard = () => {
  return (
    <div className="container mx-auto">
      <div className="columns-3 gap-20 mt-12">
        {content.map((item, index) => (
          <div key={index} className="  pt-18 inline-block w-full">
            
            <h3 className="text-3xl font-bold flex items-center gap-2 ]">
              <div className=" icon-bg min-w-12 h-12 relative flex justify-center items-center bg-gradient-to-r from-(--blue) to-(--green) rounded-full translate-y-2 mr-1 mb-3"> 
                 <img className="w-6 h-6 filter grayscale-100 brightness-800" src={item.icon} alt="" />  </div>
                
                 {item.title}
            </h3>

            <ul className="mt-2 text-lg   ">
              {item.items.map((listItem, liIndex) => (
                <li
                  key={liIndex}
                  className="flex items-center justify-between border-b-2  border-white/15  hover:border-(--green)  pb-4 pt-4 group cursor-pointer hover:scale-102 duration-350 "
                >
                  <Link
                    to="/"
                    className="flex items-center justify-between w-full group-hover:text-(--green) font-bold  "
                  >
                    <span>{listItem}</span>
                    <AiOutlineArrowRight className="text-gray-500 text-2xl group-hover:text-(--green) -rotate-45 group-hover:rotate-2 transform duration-300  group " />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* <div className="mt-8">
          <div className="bg-[#262626] p-8 rounded-2xl text-center shadow-lg ">
            <h1 className="text-3xl font-bold ">
              READY TO ELEVATE YOUR BRAND?
            </h1>
            <p className=" pt-3 ">
              Let’s connect so we can understand your business objectives and
              craft a plan to exceed them.
            </p>
            <div className=" btn mt-4 flex justify-center">
              <Button mybtn={"LET'S TALK"} />
            </div>
          </div>
        </div> */}

        
      </div>
    </div>
  );
};

export default OurServiceCard;
