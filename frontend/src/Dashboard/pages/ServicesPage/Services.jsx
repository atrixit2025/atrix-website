import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";;
import GenericDataTable from "../../components/GenericDataTable/GenericDataTable";
export default function Services() {
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5300/Services/get");
        
        const ServicessWithImages = await Promise.all(
          response.data.Services.map(async (services) => {
            let featuredImageUrl = "/images/user/user-22.jpg";
            let iconImageUrl = "/images/default-icon.png"; // Define default icon image
            
            // Fetch featured image if exists
            if (services.FeaturedImage) {
              try {
                const imgResponse = await axios.get(
                  `http://localhost:5300/Image/get/${services.FeaturedImage}`
                );
                featuredImageUrl = imgResponse.data.Image?.image || featuredImageUrl;
              } catch (error) {
                console.error("Error fetching featured image:", error);
              }
            }
            
            // Fetch icon image if exists
            if (services.iconImageId) {
              try {
                const iconResponse = await axios.get(
                  `http://localhost:5300/Image/get/${services.iconImageId}`
                );
                iconImageUrl = iconResponse.data.Image?.image || iconImageUrl;
              } catch (error) {
                console.error("Error fetching icon image:", error);
              }
            }
            
            return {
              id: services._id,
              name: services.title,
              Category: services.category,
              description: services.text,
              Date: new Date(services.updatedAt).toLocaleDateString(),
              featuredImage: featuredImageUrl,
              FeaturedImageId: services.FeaturedImage,
              iconImage: iconImageUrl, // Now properly defined
              iconImageId: services.iconImageId,
              contentSections: services.contentSections || [],
              tags: services.tags || [],
              portfolioCategories: services.portfolioCategories || [],
              updatedAt: services.updatedAt,
            };
          })
        );
        
        setTableData(ServicessWithImages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id, title, category) => {
    try {
      await axios.delete("http://localhost:5300/Services/delete", {
        data: { title, category },
      });
      setTableData(prev => prev.filter(item => item.id !== id));
      return true
    } catch (error) {
      console.error("Error deleting Service:", error);
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
      await axios.delete("http://localhost:5300/Services/delete", { data: deleteData });
      setTableData(prev => prev.filter(item => !selectedIds.includes(item.id)));
      return true
    } catch (error) {
      console.error("Error in bulk delete:", error);
      throw error; 
    }
  };

  const handleEdit = (item) => {
    navigate("/Dashboard/AddNewServices", { 
      state: { 
        Services: {
          id: item.id,
          title: item.name,
          category: item.Category,
          FeaturedImage: item.FeaturedImageId,
          featuredImageUrl: item.featuredImage,
          iconImage: item.iconImage, // Pass the iconImage URL
          iconImageId: item.iconImageId,
          contentSections: item.contentSections.map(section => ({
            ...section,
            imageUrl: section.imageId ? `http://localhost:5300/Image/get/${section.imageId}` : null
          })),
          text: item.description,
          tags: item.tags || [], // Pass tags
          portfolioCategories: item.portfolioCategories || [] // Pass portfolio categories
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
 
    { key: "Date", title: "Date" }
  ];

  return (
    <>
      <PageBreadcrumb 
        pageTitle="Services"
        buttonText="Add New Service"
        buttonLink="/Dashboard/AddNewServices" 
      />
      <GenericDataTable
        data={tableData}
        columns={columns}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onBulkDelete={handleBulkDelete}
      />
    </>
  );
}