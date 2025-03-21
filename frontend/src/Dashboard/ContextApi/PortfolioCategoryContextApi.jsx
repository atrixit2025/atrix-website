import React, { createContext, useState, useEffect } from "react";
import axios from "axios";


export const PortfolioCategoryContext = createContext();


export const PortfolioCategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);


  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5300/PortfolioCategory/Portfolio/category/get");
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Add a new Portfoliocategory
  const addPortfolioCategory = async (PortfoliocategoryData) => {
    try {
      const response = await axios.post("http://localhost:5300/PortfolioCategory/Portfolio/category/add", PortfoliocategoryData);
      setCategories((prevCategories) => [...prevCategories, response.data.PortfolioCategory]);
    } catch (error) {
      console.error("Error adding Portfoliocategory:", error);
      throw error; // Re-throw the error to handle it in the component
    }
  };

  // Edit a Portfoliocategory
  const editPortfolioCategory = async (name, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:5300/PortfolioCategory/Portfolio/category/name/${name}`, updatedData);
      setCategories((prevCategories) =>
        prevCategories.map((Portfoliocategory) =>
          Portfoliocategory.name === name ? response.data.Portfoliocategory : category
        )
      );
      console.log("edit",response)
    } catch (error) {
      console.error("Error editing Portfoliocategory:", error);
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
  const deletePortfolioCategory = async (name) => {
    try {
      await axios.delete(`http://localhost:5300/PortfolioCategory/Portfolio/category/name/${name}`);
      await fetchParentCategories(); 
    } catch (error) {
      console.error("Error deleting Portfoliocategory:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);


  // Fetch categories when the provider mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <PortfolioCategoryContext.Provider value={{ categories, fetchCategories, addPortfolioCategory,fetchParentCategories, editPortfolioCategory, deletePortfolioCategory }}>
      {children}
    </PortfolioCategoryContext.Provider>
  );
};