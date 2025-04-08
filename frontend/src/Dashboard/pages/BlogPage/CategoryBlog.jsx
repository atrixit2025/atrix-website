import React from "react";
import { BlogCategoryContext } from "../../ContextApi/BlogCategoryContextApi";
import CategoryBlogTable from "./CategoryBlogTable";
import GenericCategory from "../../components/form/GenericCategory/GenericCategory";

function BlogCategoryPage() {
  return (
    <GenericCategory
      contextApi={BlogCategoryContext}
      pageTitle="Category Blog"
      TableComponent={CategoryBlogTable}
      categoryType="blog"
    />
  );
}

export default BlogCategoryPage;