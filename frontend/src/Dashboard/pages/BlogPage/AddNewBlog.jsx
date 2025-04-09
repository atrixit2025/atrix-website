import React,{useContext} from "react";
import { useLocation } from "react-router-dom";
import GenericForm from "../../components/form/form-Add-New/GenericForm";
import { BlogCategoryContext } from "../../ContextApi/BlogCategoryContextApi";
// import { BlogCategoryContext } from "../../ContextApi/BlogCategoryContextApi";

export default function AddNewBlog() {
  const location = useLocation();
  const { blog } = location.state || {};
  const { fetchCategoryCounts } = useContext(BlogCategoryContext );
console.log("blog",blog)
  return (
    <GenericForm
      title="Add New Blog"
      editTitle="Edit Blog"
      apiEndpoint="http://localhost:5300/Blog"
      categoryEndpoint="http://localhost:5300/BlogCategory/blog/category/get"
      redirectPath="/Dashboard/Blog"
      contentType="blog"
      item={blog}
      hasContentSections={true}
      hasRichText={true}
      initialData={blog}
      onSuccess={fetchCategoryCounts}
    />
  );
}