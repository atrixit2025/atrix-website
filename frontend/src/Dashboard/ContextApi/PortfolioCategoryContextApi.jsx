import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const PortfolioCategoryContext = createContext();


export const PortfolioCategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});


  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5300/PortfolioCategory/Portfolio/category/get");
      // First set the categories
      setCategories(response.data.categories);
      await fetchCategoryCounts();
      
      
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  


  // Add a new Portfoliocategory
  const addPortfolioCategory = async (PortfoliocategoryData) => {
    try {
      const response = await axios.post(
        "http://localhost:5300/PortfolioCategory/Portfolio/category/add", 
        PortfoliocategoryData
      );
      setCategories(prevCategories => [...prevCategories, response.data.PortfolioCategory]);
      await fetchCategoryCounts();

    } catch (error) {
      console.error("Error adding Portfoliocategory:", error);
      throw error;
    }
  };

  // Edit a Portfoliocategory
  const editPortfolioCategory = async (name, updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:5300/PortfolioCategory/Portfolio/category/name/${name}`,
        updatedData
      );
      
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.name === name ? response.data.updatedCategory : category
        )
      );
      
      await fetchCategoryCounts();

      return response.data;
    } catch (error) {
      console.error("Error editing Portfolio category:", error);
      throw error;
    }
  };

  const fetchParentCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5300/PortfolioCategory/Portfolio/category/get");
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  // Delete a Portfoliocategory
  const deleteCategory = async (name) => {
    try {
      await axios.delete(`http://localhost:5300/PortfolioCategory/Portfolio/category/name/${name}`);
      await fetchCategoryCounts();

    } catch (error) {
      console.error("Error deleting Portfoliocategory:", error);
      throw error;
    }
  };

  const fetchCategoryCounts = async () => {
    try {
      const response = await axios.get('http://localhost:5300/Portfolio/count/category');
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
    <PortfolioCategoryContext.Provider value={{ categories,categoryCounts, fetchCategories, addPortfolioCategory,fetchCategoryCounts,fetchParentCategories, editPortfolioCategory, deleteCategory }}>
      {children}
    </PortfolioCategoryContext.Provider>
  );
};