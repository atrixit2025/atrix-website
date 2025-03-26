import React, { createContext, useState, useEffect } from "react";
import axios from "axios";


export const BlogCategoryContext = createContext();


export const BlogCategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});


  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5300/BlogCategory/blog/category/get");
      setCategories(response.data.categories);
      await fetchCategoryCounts();


    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Add a new Blogcategory
  const addBlogCategory = async (BlogcategoryData) => {
    try {
      const response = await axios.post("http://localhost:5300/BlogCategory/blog/category/add", BlogcategoryData);
      setCategories((prevCategories) => [...prevCategories, response.data.BlogCategory]);
      await fetchCategoryCounts();

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

      await fetchCategoryCounts();

      // console.log("edit", response);
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
      await fetchCategoryCounts();

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

  const fetchCategoryCounts = async () => {
    try {
      const response = await axios.get('http://localhost:5300/Blog/count/category');
      // Convert array to object for easier lookup
      const countsObj = response.data.categoryCounts.reduce((acc, curr) => {
        acc[curr.category] = curr.count;
        return acc;
      }, {});
      setCategoryCounts(countsObj);
    } catch (error) {
      console.error('Error fetching category counts:', error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <BlogCategoryContext.Provider value={{ categories, fetchCategories, addBlogCategory, editBlogCategory, deleteBlogCategory, fetchParentCategories, fetchCategoryCounts, categoryCounts }}>
      {children}
    </BlogCategoryContext.Provider>
  );
};