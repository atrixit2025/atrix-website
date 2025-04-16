import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import GenericDataTable from "../../components/GenericDataTable/GenericDataTable";
import { FAQCategoryContext } from "../../ContextApi/FAQCaategoryContextApi";

export default function FAQ() {
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();
  const { fetchCategoryCounts } = useContext(FAQCategoryContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5300/FAQ/get");
        
        const FAQsWithImages = await Promise.all(
          response.data.FAQ.map(async (FAQ) => {
            return {
              id: FAQ._id,
              name: FAQ.title,
              Category: FAQ.category,
              description: FAQ.description.length > 50 
              ? `${FAQ.description.substring(0, 50)}...` 
              : FAQ.description,
            fullDescription: FAQ.description,
              Date: new Date(FAQ.updatedAt).toLocaleDateString(),
              updatedAt: FAQ.updatedAt,
              
            };
          })
        );
        
        setTableData(FAQsWithImages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id, title, category) => {
    try {
      await axios.delete("http://localhost:5300/FAQ/delete", {
        data: { title, category },
      });
      setTableData(prev => prev.filter(item => item.id !== id));
      await fetchCategoryCounts();
      return true;
    } catch (error) {
      console.error("Error deleting FAQ:", error);
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
      await axios.delete("http://localhost:5300/FAQ/delete", { data: deleteData });
      setTableData(prev => prev.filter(item => !selectedIds.includes(item.id)));
      await fetchCategoryCounts();
      return true;
    } catch (error) {
      console.error("Error in bulk delete:", error);
      throw error;
    }
  };

const handleEdit = (item) => {
  navigate("/Dashboard/AddNewFAQ", { 
    state: { 
        FAQ: {
        id: item.id,
        title: item.name,
        category: item.Category,
        description: item.fullDescription,
      
      } 
    } 
  });
};


const columns = [
  { key: "name", title: "Title" },
  { key: "Category", title: "Category" },
  { key: "description", title: "Description" },

  { key: "Date", title: "Date" }
];

  return (
    <>
      <PageBreadcrumb 
        pageTitle="FAQ"
        buttonText="Add New FAQ"
        buttonLink="/Dashboard/AddNewFAQ" 
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