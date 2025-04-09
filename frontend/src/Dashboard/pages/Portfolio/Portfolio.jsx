import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import GenericDataTable from "../../components/GenericDataTable/GenericDataTable";
import { PortfolioCategoryContext } from "../../ContextApi/PortfolioCategoryContextApi";

export default function Portfolio() {
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();
  const { fetchCategoryCounts } = useContext(PortfolioCategoryContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5300/Portfolio/get");
        
        const PortfoliosWithImages = await Promise.all(
          response.data.Portfolio.map(async (portfolio) => {
            let featuredImageUrl = "/images/user/user-22.jpg";
            
            if (portfolio.FeaturedImage) {
              try {
                const imgResponse = await axios.get(
                  `http://localhost:5300/Image/get/${portfolio.FeaturedImage}`
                );
                featuredImageUrl = imgResponse.data.Image?.image || featuredImageUrl;
              } catch (error) {
                console.error("Error fetching featured image:", error);
              }
            }
            
            return {
              id: portfolio._id,
              name: portfolio.title,
              Category: portfolio.category,
              description: portfolio.text,
              Date: new Date(portfolio.updatedAt).toLocaleDateString(),
              featuredImage: featuredImageUrl,
              FeaturedImageId: portfolio.FeaturedImage,
              // Include all the content sections
              contentSections: portfolio.contentSections || [],
              // Include any other fields you need
              updatedAt: portfolio.updatedAt,
              // Add other fields as needed
              
            };
          })
        );
        
        setTableData(PortfoliosWithImages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id, title, category) => {
    try {
      await axios.delete("http://localhost:5300/Portfolio/delete", {
        data: { title, category },
      });
      setTableData(prev => prev.filter(item => item.id !== id));
      await fetchCategoryCounts();
      return true;
    } catch (error) {
      console.error("Error deleting Portfolio:", error);
      throw error;
    }
  };

  const handleBulkDelete = async (selectedIds) => {
    const selectedItems = tableData.filter(item => selectedIds.includes(item.id));
    const deleteData = {
      titles: selectedItems.map(item => item.name),
      categories: selectedItems.map(item => item.Category)
    };

    try {
      await axios.delete("http://localhost:5300/Portfolio/delete", { data: deleteData });
      setTableData(prev => prev.filter(item => !selectedIds.includes(item.id)));
      await fetchCategoryCounts();
      return true;
    } catch (error) {
      console.error("Error in bulk delete:", error);
      throw error;
    }
  };
  const handleEdit = (item) => {
    navigate("/Dashboard/AddNewPortfolio", { 
      state: { 
        item: {
          id: item.id,
          title: item.name,
          category: item.Category,
          FeaturedImage: item.FeaturedImageId,
          featuredImageUrl: item.featuredImage,
          contentSections: item.contentSections.map(section => ({
            ...section,
            // Add imageUrl if you have it, or we'll fetch it in the form
            imageUrl: section.imageId ? `http://localhost:5300/Image/get/${section.imageId}` : null
          })),
          text: item.description,
        } 
      } 
    });
  };

  const columns = [
    { key: "name", title: "Title" },
    { key: "Category", title: "Category" },
    { 
      key: "featuredImage", 
      title: "Featured Image",
      render: (item) => (
        <div className="w-16 h-16 overflow-hidden rounded">
          <img
            src={`http://localhost:5300${item.featuredImage}`}
            alt="Featured"
            className="w-full h-full object-cover"
          />
        </div>
      )
    },
    // { 
    //   key: "contentSections", 
    //   title: "Sections",
    //   render: (item) => (
    //     <span>{item.contentSections?.length || 0} sections</span>
    //   )
    // },
    { key: "Date", title: "Date" }
  ];

  return (
    <>
      <PageBreadcrumb 
        pageTitle="Portfolio"
        buttonText="Add New Portfolio"
        buttonLink="/Dashboard/AddNewPortfolio" 
      />
      <GenericDataTable
        data={tableData}
        columns={columns}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onBulkDelete={handleBulkDelete}
      />


      <div>
        
      </div>
    </>
  );
}