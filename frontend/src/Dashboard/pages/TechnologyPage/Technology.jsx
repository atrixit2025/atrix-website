import React from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";

export default function Technology() {
  return (
    <>
   
      <div></div>
      <PageBreadcrumb
        pageTitle="Technology"
        buttonText="Add New  Technology" // Custom button text
        buttonLink="/DashboardAddNewTechnology" // Custom button link
      />
      <div className="space-y-6">
        {/* <ComponentCard title="Technology"> */}
          <BasicTableOne />
        {/* </ComponentCard> */}
      </div>
    </>
  );
}
