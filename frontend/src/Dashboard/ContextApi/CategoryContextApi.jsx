import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
export const CategoryContext = createContext();

// Create the provider component
export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  // Fetch all categories from the backend
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5300/category/get");
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Add a new category
  const addCategory = async (categoryData) => {
    try {
      const response = await axios.post("http://localhost:5300/category/add", categoryData);
      setCategories((prevCategories) => [...prevCategories, response.data.Category]);
    } catch (error) {
      console.error("Error adding category:", error);
      throw error; // Re-throw the error to handle it in the component
    }
  };

  // Edit a category
  const editCategory = async (name, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:5300/category/name/${name}`, updatedData);
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.Name === name ? response.data.category : category
        )
      );
    } catch (error) {
      console.error("Error editing category:", error);
      throw error;
    }
  };

  // Delete a category
  const deleteCategory = async (name) => {
    try {
      await axios.delete(`http://localhost:5300/category/name/${name}`);
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.Name !== name)
      );
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  };

  // Fetch categories when the provider mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, fetchCategories, addCategory, editCategory, deleteCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};