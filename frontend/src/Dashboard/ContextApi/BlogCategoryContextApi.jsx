import React, { createContext, useState, useEffect } from "react";
import axios from "axios";


export const BlogCategoryContext = createContext();


export const BlogCategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [totalBlogCount, setTotalBlogCount] = useState(0);


  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5300/BlogCategory/blog/category/get");
      setCategories(response.data.categories);
      await fetchCategoryCounts();
      await fetchCounts()


    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };


  const addCategory = async (BlogcategoryData) => {
    try {
      const response = await axios.post("http://localhost:5300/BlogCategory/blog/category/add", BlogcategoryData);
      setCategories((prevCategories) => [...prevCategories, response.data.BlogCategory]);
      await fetchCategoryCounts();
      await fetchCounts()

    } catch (error) {
      console.error("Error adding Blogcategory:", error);
      throw error;
    }
  };


  const editCategory = async (name, updatedData) => {
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
      await fetchCounts()


      return response.data;
    } catch (error) {
      console.error("Error editing Portfolio category:", error);
      throw error;
    }

  };


  const deleteCategory = async (name) => {
    try {
      await axios.delete(`http://localhost:5300/BlogCategory/blog/category/name/${name}`);
      setCategories((prevCategories) =>
        prevCategories.filter((Blogcategory) => Blogcategory.Name !== name)
      );
      await fetchCategoryCounts();
      await fetchCounts()

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

  const fetchCategoryCounts = async () => {
    try {
      const response = await axios.get('http://localhost:5300/Blog/count/category');

      const countsObj = response.data.categoryCounts.reduce((acc, curr) => {
        acc[curr.category] = curr.count;
        return acc;
      }, {});
      setCategoryCounts(countsObj);
    } catch (error) {
      console.error('Error fetching category counts:', error);
    }
  };


  const fetchCounts = async () => {
    try {
      const response = await axios.get('http://localhost:5300/Blog/count');
      setTotalBlogCount(response.data.count || 0); // Update to match your backend response
    } catch (error) {
      console.error('Error fetching total blog count:', error);
    }
  };



  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <BlogCategoryContext.Provider value={{
      categories,
      fetchCategories,
      addCategory,
      editCategory,
      deleteCategory,
      fetchParentCategories,
      fetchCategoryCounts,
      categoryCounts,
      fetchCounts,
      totalBlogCount 
    }}>
      {children}
    </BlogCategoryContext.Provider>
  );
};