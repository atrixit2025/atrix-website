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
        const services = response.data.Services.map((tech) => ({
          id: tech._id,
          name: tech.title,
          Category: tech.category,
          Date: new Date(tech.updatedAt).toLocaleDateString(),
          team: {
            images: [tech.image?.image || "/images/user/user-22.jpg"],
          },
          imageId: tech.image?._id,
        }));
        setTableData(services);
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
      alert("Service deleted successfully!");
    } catch (error) {
      console.error("Error deleting Service:", error);
      alert("Error deleting Service. Please try again.");
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
      alert("Selected services deleted successfully!");
    } catch (error) {
      console.error("Error in bulk delete:", error);
      alert(error.response?.data?.message || "Error deleting items. Please try again.");
    }
  };

  const handleEdit = (item) => {
    navigate("/DashboardAddNewServices", { state: { Services: item } });
  };

  const columns = [
    { key: "name", title: "Title" },
    { key: "Category", title: "Category" },
    { 
      key: "team", 
      title: "Images",
      render: (item) => (
        <div className="flex -space-x-2">
          {item.team.images.map((img, i) => (
            <div key={i} className="w-12 h-12 overflow-hidden">
              <img
                src={`http://localhost:5300${img}`}
                alt={`Image ${i}`}
                className="w-full size-11"
              />
            </div>
          ))}
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
        buttonLink="/DashboardAddNewServices" 
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