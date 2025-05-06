import React from "react";
import Button from "../Button";

const WebDevelopment = ({ secData, targetRef }) => {
  return (
    <div className="web-development-sec my-20 lg:my-36">
      <div className="container mx-auto px-4 lg:px-0">
        {/* First Row - Maintains exact 6-6 column layout on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          <div className="lg:col-span-6">
            <h2 className="text-3xl lg:text-4xl font-bold">{secData.heading_1}</h2>
            <p className="mt-3 lg:mt-[10px] max-w-full lg:max-w-[590px]">
              {secData.description_1}
            </p>
          </div>
          <div className="lg:col-span-6 flex ">
            <div className="w-full lg:w-auto ml-0 lg:ml-auto">
              <img src={secData.img_1} alt="" className="w-full lg:w-auto" />
            </div>
          </div>
        </div>

        {/* Second Row - Maintains exact 7-5 column layout on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 mt-8 lg:mt-12">
          <div className="lg:col-span-7">
            <div className="w-full ml-0 lg:ml-auto">
              <img src={secData.img_2} alt="" className="w-full" />
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-end">
            <h2 className="text-3xl lg:text-4xl font-bold">{secData.heading_2}</h2>
            <p className="mt-3 lg:mt-[10px] max-w-full lg:max-w-[570px]">
              {secData.description_2}
            </p>
            <div className="mt-4 lg:mt-5">
              <Button mybtn="Get A Quote" targetRef={targetRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebDevelopment;