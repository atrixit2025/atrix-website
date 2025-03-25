import React, { createContext, useState, useEffect } from "react";
import axios from "axios";


export const BlogCategoryContext = createContext();


export const BlogCategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);


  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5300/BlogCategory/blog/category/get");
      setCategories(response.data.categories);
      
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Add a new Blogcategory
  const addBlogCategory = async (BlogcategoryData) => {
    try {
      const response = await axios.post("http://localhost:5300/BlogCategory/blog/category/add", BlogcategoryData);
      setCategories((prevCategories) => [...prevCategories, response.data.BlogCategory]);
    } catch (error) {
      console.error("Error adding Blogcategory:", error);
      throw error; // Re-throw the error to handle it in the component
    }
  };

  // Edit a Blogcategory
  const editBlogCategory = async (name, updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:5300/BlogCategory/blog/category/name/${name}`,
        updatedData
      );

      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.name === name ? response.data.updatedCategory : category
        )
      );

      console.log("edit", response);
      return response.data;
    } catch (error) {
      console.error("Error editing Portfolio category:", error);
      throw error;
    }

  };

  // Delete a Blogcategory
  const deleteBlogCategory = async (name) => {
    try {
      await axios.delete(`http://localhost:5300/BlogCategory/blog/category/name/${name}`);
      setCategories((prevCategories) =>
        prevCategories.filter((Blogcategory) => Blogcategory.Name !== name)
      );
    } catch (error) {
      console.error("Error deleting Blogcategory:", error);
      throw error;
    }
  };


  const fetchParentCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5300/BlogCategory/blog/category/get");
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  // Fetch categories when the provider mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <BlogCategoryContext.Provider value={{ categories, fetchCategories, addBlogCategory, editBlogCategory, deleteBlogCategory, fetchParentCategories }}>
      {children}
    </BlogCategoryContext.Provider>
  );
};