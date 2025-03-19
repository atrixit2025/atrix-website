
import React from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";

export default function Technology() {
  return (
    <>
   
      <div></div>
      <PageBreadcrumb pageTitle="Technology" />
      <div className="space-y-6">
        {/* <ComponentCard title="Technology"> */}
          <BasicTableOne />
        {/* </ComponentCard> */}
      </div>
    </>
  );
}
