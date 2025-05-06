import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import Button from "../Button";
import ServicesData from "../../data/ServicesData";
import Asset1 from "../../assets/ServicesIcons/Asset 2.svg";




// const content = [
//   {
//     icon: Asset1,
//     title: "Branding / Graphic Design",
//     items: [
//       "Branding",
//       "Logo Design",
//       "Packaging",
//       "Product Design",
//       "Print Media",
//       "Advertisement",
//       "Ui/UX",
//       "Social Media Design",
//     ],
//   },
//   {
//     icon: Asset1,
//     title: "Web Development",
//     items: [
//       "AI",
//       "Metaverse",
//       "Salesforce",
//       "CRM",
//       "CMS",
//       "PHP",
//       "Laravel",
//       "React Js",
//       "Node Js",
//     ],
//   },
//   {
//     icon: Asset1,
//     title: "Digital Marketing",
//     items: [
//       "Marketing",
//       "Strategy",
//       "SEO",
//       "SMO",
//       "Digital Ads",
//       "Content Creation",
//     ],
//   },
//   {
//     icon: Asset1,
//     title: "Visual Effects",
//     items: [
//       "VFX",
//       "SFX",
//       "3D",
//       "Editing",
//       "Composition",
//       "Grading",
//       "Motion Graphics",
//     ],
//   },
//   {
//     icon: Asset1,
//     title: "Photo/Video Production",
//     items: [
//       "Corporate Shoot",
//       "Product Shoot",
//       "Food Photography",
//       "Commercial Shoot",
//     ],
//   },
//   {
//     icon: Asset1,
//     title: "Staffing",
//     items: [
//       "Us Staffing",
//       "Us Recruiter",
//       "Payroll",
//       "Talent Acquisition",
//       "Us Hiring",
//     ],
//   },
//   {
//     icon: Asset1,
//     title: "Logistics",
//     items: ["OTR", "Drayage", "Jctrans"],
//   },
// ];



const OurServiceCard = () => {
  return (
    <>
      <div className="container mx-auto w-[90%]">
        <div className="columns-1 md:columns-3 gap-20 mt-12">
          {ServicesData.map((item, index) => (
            <div key={index} className="  pt-18 inline-block w-full">
              <Link to={`/service/${item.slug}`} className=" cursor-pointer"  >
                <h3 className="text-3xl font-bold flex items-center gap-2 ]">
                  <div className=" icon-bg min-w-12 h-12 relative flex justify-center items-center bg-gradient-to-r from-(--blue) to-(--green) rounded-full translate-y-2 mr-1 mb-3">
                    <img
                      className="w-6 h-6 filter grayscale-100 brightness-800"
                      src={item.icon}
                      alt=""
                    />{" "}
                  </div>
                  {item.service_title}
                </h3>
              </Link>
              <ul className="mt-2 text-lg">
                {
                  item.tags.map((tagItem, tagindex) => (
                    <li
                      key={tagindex}
                      className="flex items-center justify-between border-b-2  border-white/15  hover:border-(--green)  pb-4 pt-4 group cursor-pointer hover:scale-102 duration-350 "
                    >
                      <Link
                        to={`/service/${item.slug}`}
                        className="flex items-center justify-between w-full group-hover:text-(--green) font-bold"
                      >
                        <span>{tagItem}</span>
                        <AiOutlineArrowRight className="text-gray-500 text-2xl group-hover:text-(--green) -rotate-45 group-hover:rotate-2 transform duration-300  group " />
                      </Link>
                    </li>
                  ))
                }
              </ul>
            </div>
          ))}
        </div>
      </div>

    </>
  );
};

export default OurServiceCard;
