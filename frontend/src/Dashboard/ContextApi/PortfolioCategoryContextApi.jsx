import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const PortfolioCategoryContext = createContext();

export const PortfolioCategoryProvider = ({ children }) => {
  // Single state object that contains all related data
  const [portfolioState, setPortfolioState] = useState({
    categories: [],
    categoryCounts: {},
    totalPortfolioCount: 0,
    loading: false,
    error: null
  });

  const fetchCategories = async () => {
    try {
      setPortfolioState(prev => ({ ...prev, loading: true }));
      
      const response = await axios.get(
        "http://localhost:5300/PortfolioCategory/Portfolio/category/get"
      );
      
      setPortfolioState(prev => ({
        ...prev,
        categories: response.data.categories,
        loading: false
      }));
      
      await fetchCategoryCounts();
      await fetchCounts();
      
    } catch (error) {
      setPortfolioState(prev => ({
        ...prev,
        error: error.message,
        loading: false
      }));
      console.error("Error fetching categories:", error);
    }
  };

  const addCategory = async (PortfoliocategoryData) => {
    try {
      setPortfolioState(prev => ({ ...prev, loading: true }));
      
      const response = await axios.post(
        "http://localhost:5300/PortfolioCategory/Portfolio/category/add", 
        PortfoliocategoryData
      );
      
      setPortfolioState(prev => ({
        ...prev,
        categories: [...prev.categories, response.data.PortfolioCategory],
        loading: false
      }));
      
      await fetchCategoryCounts();
      await fetchCounts();
      
    } catch (error) {
      setPortfolioState(prev => ({
        ...prev,
        error: error.message,
        loading: false
      }));
      throw error;
    }
  };

  const editCategory = async (name, updatedData) => {
    try {
      setPortfolioState(prev => ({ ...prev, loading: true }));
      
      const response = await axios.put(
        `http://localhost:5300/PortfolioCategory/Portfolio/category/name/${name}`,
        updatedData
      );
      
      setPortfolioState(prev => ({
        ...prev,
        categories: prev.categories.map(category =>
          category.name === name ? response.data.updatedCategory : category
        ),
        loading: false
      }));
      
      await fetchCategoryCounts();
      await fetchCounts();
      
      return response.data;
    } catch (error) {
      setPortfolioState(prev => ({
        ...prev,
        error: error.message,
        loading: false
      }));
      throw error;
    }
  };

  const fetchParentCategories = async () => {
    try {
      setPortfolioState(prev => ({ ...prev, loading: true }));
      
      const response = await axios.get(
        "http://localhost:5300/PortfolioCategory/Portfolio/category/get"
      );
      
      setPortfolioState(prev => ({
        ...prev,
        categories: response.data.categories,
        loading: false
      }));
      
    } catch (error) {
      setPortfolioState(prev => ({
        ...prev,
        error: error.message,
        loading: false
      }));
    }
  };

  const deleteCategory = async (name) => {
    try {
      setPortfolioState(prev => ({ ...prev, loading: true }));
      
      await axios.delete(
        `http://localhost:5300/PortfolioCategory/Portfolio/category/name/${name}`
      );
      
      setPortfolioState(prev => ({
        ...prev,
        categories: prev.categories.filter(category => category.name !== name),
        loading: false
      }));
      
      await fetchCategoryCounts();
      await fetchCounts();
      
    } catch (error) {
      setPortfolioState(prev => ({
        ...prev,
        error: error.message,
        loading: false
      }));
      throw error;
    }
  };

  const fetchCategoryCounts = async () => {
    try {
      setPortfolioState(prev => ({ ...prev, loading: true }));
      
      const response = await axios.get(
        'http://localhost:5300/Portfolio/count/category'
      );
      
      const countsObj = response.data.categoryCounts.reduce((acc, curr) => {
        acc[curr.category] = curr.count;
        return acc;
      }, {});
      
      setPortfolioState(prev => ({
        ...prev,
        categoryCounts: countsObj,
        loading: false
      }));
      
    } catch (error) {
      setPortfolioState(prev => ({
        ...prev,
        error: error.message,
        loading: false
      }));
    }
  };
  
  const fetchCounts = async () => {
    try {
      setPortfolioState(prev => ({ ...prev, loading: true }));
      
      const response = await axios.get('http://localhost:5300/Portfolio/count');
      
      setPortfolioState(prev => ({
        ...prev,
        totalPortfolioCount: response.data.count || 0,
        loading: false
      }));
      
    } catch (error) {
      setPortfolioState(prev => ({
        ...prev,
        error: error.message,
        loading: false
      }));
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <PortfolioCategoryContext.Provider value={{ 
      ...portfolioState,
      fetchCategories,
      addCategory,
      editCategory,
      deleteCategory,
      fetchParentCategories,
      fetchCategoryCounts,
      fetchCounts
    }}>
      {children}
    </PortfolioCategoryContext.Provider>
  );
};