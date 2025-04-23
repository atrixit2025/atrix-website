import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import Button from "../Button";
import ServicesData from "../../data/ServicesData";
import Asset1 from "../../assets/ServicesIcons/Asset 2.svg";




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
    icon: Asset1,
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
    icon: Asset1,
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
    icon: Asset1,
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
    icon: Asset1,
    title: "Photo/Video Production",
    items: [
      "Corporate Shoot",
      "Product Shoot",
      "Food Photography",
      "Commercial Shoot",
    ],
  },
  {
    icon: Asset1,
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
    icon: Asset1,
    title: "Logistics",
    items: ["OTR", "Drayage", "Jctrans"],
  },
];



const OurServiceCard = () => {
  return (
    <>
      <div className="container mx-auto">
        <div className="columns-3 gap-20 mt-12">
          {ServicesData.map((item, index) => (
            <div key={index} className="  pt-18 inline-block w-full">
              <Link to={`${item.service_id}`} className=" cursor-pointer"  >
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


              <ul className="mt-2 text-lg   ">
                {item.sub_service.map((listItem, listIndex) => (
                  listItem.all_services.map((servList, servIndex) => (
                    <li
                      key={servIndex}
                      className="flex items-center justify-between border-b-2  border-white/15  hover:border-(--green)  pb-4 pt-4 group cursor-pointer hover:scale-102 duration-350 "
                    >
                      <Link
                        to={`${item.service_id}`}

                        className="flex items-center justify-between w-full group-hover:text-(--green) font-bold  "
                      >
                        <span>{servList.service_name}</span>
                        <AiOutlineArrowRight className="text-gray-500 text-2xl group-hover:text-(--green) -rotate-45 group-hover:rotate-2 transform duration-300  group " />
                      </Link>
                    </li>
                  ))

                  // <li
                  //   key={listIndex}
                  //   className="flex items-center justify-between border-b-2  border-white/15  hover:border-(--green)  pb-4 pt-4 group cursor-pointer hover:scale-102 duration-350 "
                  // >
                  //   <Link
                  //     to={`${item.service_id}`}

                  //     className="flex items-center justify-between w-full group-hover:text-(--green) font-bold  "
                  //   >
                  //     <span>{listItem}</span>
                  //     <AiOutlineArrowRight className="text-gray-500 text-2xl group-hover:text-(--green) -rotate-45 group-hover:rotate-2 transform duration-300  group " />
                  //   </Link>
                  // </li>
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



    </>
  );
};

export default OurServiceCard;
