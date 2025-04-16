
import React from "react";
import CategoryTable from "../../components/form/form-CategoryTable/CategoryTable";
import { FAQCategoryContext } from "../../ContextApi/FAQCaategoryContextApi";

export default function CategoryFAQTable({ onEditClick }) {


  return (
    <>
      <CategoryTable
        onEditClick={onEditClick}
        context={FAQCategoryContext}
        apiEndpoint="http://localhost:5300/FAQCategory"
        showDescription={true}
      />
    </>
  );
}