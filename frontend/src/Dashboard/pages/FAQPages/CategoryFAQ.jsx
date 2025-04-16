import React from "react";
import GenericCategory from "../../components/form/GenericCategory/GenericCategory";
import { FAQCategoryContext } from "../../ContextApi/FAQCaategoryContextApi";
import CategoryFAQTable from "./CategoryFAQTable";

function FAQCategory() {
  return (
    <GenericCategory
      contextApi={FAQCategoryContext}
      pageTitle="Category FAQ"
      TableComponent={CategoryFAQTable}
      categoryType="FAQ"
    />
  );
}

export default FAQCategory;