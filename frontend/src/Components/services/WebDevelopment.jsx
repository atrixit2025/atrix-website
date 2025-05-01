import React from "react";
import Button from "../Button";

const WebDevelopment = ({ secData, targetRef }) => {
  return (
    <div className="web-development-sec my-36">
      <div className="container mx-auto">
        <div className="web-dev-wrapper grid grid-cols-12 gap-10">
          <div className="col-span-6">
            <h2 className="text-4xl font-bold ">{secData.heading_1}</h2>
            <p className=" mt-[10px] max-w-[590px]">{secData.description_1}</p>
          </div>
          <div className="col-span-6 flex">
            <div className="img-wrapper ml-auto">
              <img src={secData.img_1} alt="" />
            </div>
          </div>
        </div>

        <div className="web-dev-wrapper grid grid-cols-12 gap-10 mt-12">
          <div className="col-span-7">
            <div className="img-wrapper ml-auto w-full">
              <img src={secData.img_2} alt="" className="w-full" />
            </div>
          </div>

          <div className="col-span-5 flex flex-col justify-end">
            <h2 className="text-4xl font-bold ">{secData.heading_2}</h2>
            <p className=" mt-[10px]  max-w-[570px]">{secData.description_2}</p>
            <div className="mt-5">
              <Button mybtn="Get A Quote" targetRef={targetRef} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WebDevelopment;
