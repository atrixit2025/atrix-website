import React from "react";
import { BlogCategoryContext } from "../../ContextApi/BlogCategoryContextApi";;
import CategoryTable from "../../components/form/form-CategoryTable/CategoryTable";

export default function CategoryBlogTable({ onEditClick }) {


  return (
    <>
      <CategoryTable
        onEditClick={onEditClick}
        context={BlogCategoryContext}
        apiEndpoint="http://localhost:5300/BlogCategory"
        showDescription={true}
      />
    </>
  );
}