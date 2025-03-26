import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import GenericDataTable from "../../components/GenericDataTable/GenericDataTable";

export default function Portfolio() {
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5300/Portfolio/get");
        const portfolios = response.data.Portfolio.map((tech) => ({
          id: tech._id,
          name: tech.title,
          Category: tech.category,
          Date: new Date(tech.updatedAt).toLocaleDateString(),
          team: {
            images: [tech.image?.image || "/images/user/user-22.jpg"],
          },
          imageId: tech.image?._id,
        }));

        setTableData(portfolios);
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
      return true
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
      return true
    } catch (error) {
      console.error("Error in bulk delete:", error);
      throw error;
    }
  };

  const handleEdit = (item) => {
    navigate("/Dashboard/AddNewPortfolio", { state: { portfolio: item } });
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
 
    </>
  );
}