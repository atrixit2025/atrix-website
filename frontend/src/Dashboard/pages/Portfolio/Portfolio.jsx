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
          response.data.Portfolio.map(async (tech) => {
            let featuredImageUrl = "/images/user/user-22.jpg";
            
            if (tech.FeaturedImage) {
              try {
                const imgResponse = await axios.get(
                  `http://localhost:5300/Image/get/${tech.FeaturedImage}`
                );
                featuredImageUrl = imgResponse.data.Image?.image || featuredImageUrl;
              } catch (error) {
                console.error("Error fetching featured image:", error);
              }
            }
            
            return {
              id: tech._id,
              name: tech.title,
              Category: tech.category,
              description: tech.text, // Changed from tech.description to tech.text
              Date: new Date(tech.updatedAt).toLocaleDateString(),
              featuredImage: featuredImageUrl,
              FeaturedImageId: tech.FeaturedImage,
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
        Portfolio: {
          ...item,
          imageId: item.FeaturedImageId // Make sure this matches what AddNewPortfolio expects
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
        <div className="w-16 h-16 overflow-hidden  rounded">
          <img
            src={`http://localhost:5300${item.featuredImage}`}
            alt="Featured"
            className="w-full h-full object-cover"
          />
        </div>
      )
    },
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