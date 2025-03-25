import React, { createContext, useState, useEffect } from "react";
import axios from "axios";


export const PortfolioCategoryContext = createContext();


export const PortfolioCategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);


  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5300/PortfolioCategory/Portfolio/category/get");
      // First set the categories
      setCategories(response.data.categories);
      
      // Then fetch counts for each category
      response.data.categories.forEach(async (category) => {
        await CountPortfolioCategory(category._id);
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  
  const CountPortfolioCategory = async (id) => {
    if (!id) {
      console.error("Cannot fetch count - no ID provided");
      return 0;
    }
    
    try {
      const response = await axios.get(
        `http://localhost:5300/PortfolioCategory/Portfolio/category/count/${id}`
      );
      
      setCategories(prevCategories => 
        prevCategories.map(category => 
          category._id === id 
            ? { 
                ...category, 
                CountPortfolioCategory: response.data.subcategoryCount || 0 
              }
            : category
        )
      );
      
      return response.data.subcategoryCount || 0;
    } catch (error) {
      console.error("Error fetching category count:", error);
      return 0;
    }
  };

  // Add a new Portfoliocategory
  const addPortfolioCategory = async (PortfoliocategoryData) => {
    try {
      const response = await axios.post(
        "http://localhost:5300/PortfolioCategory/Portfolio/category/add", 
        PortfoliocategoryData
      );
      
      const newCategory = response.data.PortfolioCategory;
      
      // Initialize count to 0 immediately
      const categoryWithCount = { 
        ...newCategory, 
        CountPortfolioCategory: 0 
      };
      
      // Add the new category to state with initial count
      setCategories(prevCategories => [...prevCategories, categoryWithCount]);
      
      // Now fetch the actual count (this will update it when response comes)
      await CountPortfolioCategory(newCategory._id);
      
      return newCategory;
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
      
      console.log("edit", response);
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
  const deletePortfolioCategory = async (name) => {
    try {
      await axios.delete(`http://localhost:5300/PortfolioCategory/Portfolio/category/name/${name}`);
      await fetchParentCategories(); 
    } catch (error) {
      console.error("Error deleting Portfoliocategory:", error);
      throw error;
    }
  };

// Update the CountPortfolioCategory method



// const [countCategories, setCountCategories] = useState([])

 

// const CountPortfolioCategory = async (id) => {
//   console.log("Fetching count for category:", id);
  
//   try {
//     const response = await axios.get(
//       `http://localhost:5300/PortfolioCategory/Portfolio/category/count/${id}`
//     );
    
//     if (response.data && typeof response.data.count === 'number') {
//       setCategories(response.data.count);
//   } else {
//       console.error("Unexpected response format:", response.data);
//   }
    
//     return response.data.subcategoryCount;
//   } catch (error) {
//     console.error("Error fetching category count:", error);
    
//   }
// };
  


  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <PortfolioCategoryContext.Provider value={{ categories, fetchCategories, addPortfolioCategory,fetchParentCategories, editPortfolioCategory, deletePortfolioCategory,CountPortfolioCategory }}>
      {children}
    </PortfolioCategoryContext.Provider>
  );
};