// import React from "react";
// import PageBreadcrumb from "../../components/common/PageBreadCrumb";
// import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";

// export default function Technology() {
//   return (
//     <>
   
//       <div></div>
//       <PageBreadcrumb
//         pageTitle="Technology"
//         buttonText="Add New  Technology" // Custom button text
//         buttonLink="/Dashboard/AddNewTechnology" // Custom button link
//       />
//       <div className="space-y-6">
//         {/* <ComponentCard title="Technology"> */}
//           <BasicTableOne />
//         {/* </ComponentCard> */}
//       </div>
//     </>
//   );
// }
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import GenericDataTable from "../../components/GenericDataTable/GenericDataTable";
import { TechnologyCategoryContext } from "../../ContextApi/CategoryContextApi";

export default function Technology() {
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();
  const {fetchCategoryCounts ,categoryCounts} = useContext(TechnologyCategoryContext);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5300/Technology/get");
        const Technologys = response.data.Technology.map((tech) => {
          // Check if image data is populated
          const imageUrl = tech.image?.image 
            ? tech.image.image 
            : "/images/user/user-22.jpg"; // Fallback image
          
          return {
            id: tech._id,
            name: tech.title,
            Category: tech.category,
            Date: new Date(tech.updatedAt).toLocaleDateString(),
            team: {
              images: [imageUrl], // Use the proper image URL
            },
            imageId: tech.image?._id,
          };
        });
  
        setTableData(Technologys);
        await fetchCategoryCounts();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id, title, category) => {
    try {
      await axios.delete("http://localhost:5300/Technology/delete", {
        data: { title, category },
      });
      setTableData(prev => prev.filter(item => item.id !== id));
      await fetchCategoryCounts();
      return true
    } catch (error) {
      console.error("Error deleting Technology:", error);
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
      await axios.delete("http://localhost:5300/Technology/delete", { data: deleteData });
      setTableData(prev => prev.filter(item => !selectedIds.includes(item.id)));
      await fetchCategoryCounts();
      return true
    } catch (error) {
      console.error("Error in bulk delete:", error);
      throw error;
    }
  };

  const handleEdit = (item) => {
    navigate("/Dashboard/AddNewTechnology", { state: { technology: item } });
  };

  const columns = [
    { key: "name", title: "Title" },
    { key: "Category", title: "Category" },
    {
      key: "team",
      title: "Image",
      render: (item) => (
        <div className="w-16 h-16 overflow-hidden rounded">
          <img
            src={`http://localhost:5300${item.team.images[0]}`}
            alt="Technology"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = "/images/user/user-22.jpg";
            }}
          />
        </div>
      )
    },
    { key: "Date", title: "Date" }
  ];

  return (
    <>
      <PageBreadcrumb
        pageTitle="Technology"
        buttonText="Add New Technology"
        buttonLink="/Dashboard/AddNewTechnology"
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