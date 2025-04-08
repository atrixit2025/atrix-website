
import React,{useContext} from "react";
import { useLocation } from "react-router-dom";
import GenericForm from "../../components/form/form-Add-New/GenericForm";
import { ServicesCategoryContext } from "../../ContextApi/ServicesCategoryContextApi";
// import { ServicesCategoryContext } from "../../ContextApi/ServicesCategoryContextApi";

export default function AddNewServices() {
  const location = useLocation();
  const { services } = location.state || {};
  const { fetchCategoryCounts } = useContext(ServicesCategoryContext );
console.log("Services",services)
  return (
    <GenericForm
      title="Add New Services"
      editTitle="Edit Services"
      apiEndpoint="http://localhost:5300/Services"
      categoryEndpoint="http://localhost:5300/ServicesCategory/Services/category/get"
      redirectPath="/Dashboard/Services"
      contentType="Services"
      item={services}
      hasContentSections={true}
      hasRichText={true}
      initialData={services}
      onSuccess={fetchCategoryCounts}
    />
  );
}