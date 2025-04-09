import React from "react";
import { ServicesCategoryContext } from "../../ContextApi/ServicesCategoryContextApi";;
import CategoryTable from "../../components/form/form-CategoryTable/CategoryTable";

export default function CategoryServicesTable({ onEditClick }) {


  return (
    <>
      <CategoryTable
        onEditClick={onEditClick}
        context={ServicesCategoryContext}
        apiEndpoint="http://localhost:5300/ServicesCategory"
        showDescription={true}
      />
    </>
  );
}