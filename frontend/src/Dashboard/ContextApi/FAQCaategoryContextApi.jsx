import React, { createContext, useState, useEffect } from "react";
import axios from "axios";


export const FAQCategoryContext = createContext();


export const FAQCategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});


  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5300/FAQCategory/FAQ/category/get");
      setCategories(response.data.categories);
      await fetchCategoryCounts();


    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Add a new FAQcategory
  const addCategory = async (FAQcategoryData) => {
    try {
      const response = await axios.post("http://localhost:5300/FAQCategory/FAQ/category/add", FAQcategoryData);
      setCategories((prevCategories) => [...prevCategories, response.data.FAQCategory]);
      await fetchCategoryCounts();

    } catch (error) {
      console.error("Error adding FAQcategory:", error);
      throw error; // Re-throw the error to handle it in the component
    }
  };

  // Edit a FAQcategory
  const editCategory = async (name, updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:5300/FAQCategory/FAQ/category/name/${name}`,
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

  // Delete a FAQcategory
  const deleteCategory = async (name) => {
    try {
      await axios.delete(`http://localhost:5300/FAQCategory/FAQ/category/name/${name}`);
      setCategories((prevCategories) =>
        prevCategories.filter((FAQcategory) => FAQcategory.Name !== name)
      );
      await fetchCategoryCounts();

    } catch (error) {
      console.error("Error deleting FAQcategory:", error);
      throw error;
    }
  };


  const fetchParentCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5300/FAQCategory/FAQ/category/get");
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  // Fetch categories when the provider mounts

  const fetchCategoryCounts = async () => {
    try {
      const response = await axios.get('http://localhost:5300/FAQ/count/category');
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
    <FAQCategoryContext.Provider value={{ categories, fetchCategories, addCategory, editCategory, deleteCategory, fetchParentCategories, fetchCategoryCounts, categoryCounts }}>
      {children}
    </FAQCategoryContext.Provider>
  );
};