import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Checkbox from "../../form/input/Checkbox";
import axios from "axios"; // Import axios
import { useNavigate } from "react-router-dom";
import SelectBulk from "../../form/SelectBulk";

interface Order {
  id: number;
  name: string;
  Category: string;
  Date: string;
  team: {
    images: string[];
  };
  status: string;
  budget: string;
}

export default function BasicTableOne() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [tableData, setTableData] = useState<Order[]>([]); // State to store fetched data
  const navigate = useNavigate()
  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5300/technology/get");
        const technologies = response.data.Technology;

        // Map the fetched data to the tableData format
        const mappedData = technologies.map((tech, index) => ({
          id: tech._id,
          name: tech.title,
          Category: tech.category,
          Date: new Date(tech.updatedAt).toLocaleDateString(), // Format date
          team: {
            images: [tech.image?.image || "/images/user/user-22.jpg"], // Use the image URL or a fallback
          },
          imageId: tech.image?._id, // Add the imageId to the order object
        }));

        setTableData(mappedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number, title: string, category: string) => {
    try {
      // Send a DELETE request to the server
      const response = await axios.delete("http://localhost:5300/technology/delete", {
        data: { title, category }, // Send title and category in the request body
      });

      if (response.status === 200) {
        // Remove the deleted technology from the tableData state
        setTableData((prevData) => prevData.filter((order) => order.id !== id));
        alert("Technology deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting technology:", error);
      alert("Error deleting technology. Please try again.");
    }
  };


  // Handle individual row selection
  const handleRowSelect = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // Handle "Select All" functionality
  const handleSelectAll = () => {
    if (selectedRows.length === tableData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(tableData.map((order) => order.id));
    }
  };

  const [bulkAction, setBulkAction] = useState('');



  const handleBulkDelete = async () => {
    if (selectedRows.length === 0) {
      alert('Please select at least one item');
      return;
    }
  
    if (!window.confirm(`Are you sure you want to delete ${selectedRows.length} items?`)) {
      return;
    }
  
    try {
      // Get the titles and categories of selected items
      const selectedItems = tableData.filter(item => selectedRows.includes(item.id));
      
      // Prepare data for bulk delete
      const deleteData = {
        titles: selectedItems.map(item => item.name),
        categories: selectedItems.map(item => item.Category)
      };
  
      const response = await axios.delete("http://localhost:5300/technology/delete", {
        data: deleteData
      });
  
      if (response.status === 200) {
        setTableData(prev => prev.filter(item => !selectedRows.includes(item.id)));
        setSelectedRows([]);
        setBulkAction('');
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error in bulk delete:", error);
      alert(error.response?.data?.message || "Error deleting items. Please try again.");
    }
  };

  // Handle bulk action selection
  const bulkOptions = [
    { value: 'BulkActions', label: 'Bulk Actions' },
    { value: 'delete', label: 'Delete' },
  ];

  const handleBulkAction = (selectedOption) => {
    if (!selectedOption || !selectedOption.value) return;
    const action = selectedOption.value;
    setBulkAction(action);
  };

  const handleEdit = (order: Order) => {
    navigate("/DashboardAddNewTechnology", {
      state: { technology: order }, // Pass the entire order object as state
    });
  };
  return (
    <>
      <div className="flex items-center gap-4">
        <div className="">
          <SelectBulk
            options={bulkOptions}
            placeholder="Bulk Actions"
            onChange={(selected) => handleBulkAction(selected)}
            className="w-full border rounded-lg"
            value={bulkOptions.find(option => option.value === bulkAction) || null}
          />
        </div>

        {bulkAction === 'delete' && (
          <button
            onClick={handleBulkDelete}
            disabled={selectedRows.length === 0}
            className={`px-4 py-2 rounded ${selectedRows.length > 0
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
          >
            {selectedRows.length > 0 ? `Apply (${selectedRows.length})` : 'Apply'}
          </button>
        )}
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="2xl:min-w-[1102px]">
            <Table>
              {/* Table Header */}
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-6 py-4 font-medium text-gray-500 text-start text-theme-xl dark:text-gray-400"
                  >
                    <Checkbox
                      checked={selectedRows.length === tableData.length}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Title
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Category
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Images
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Date
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {tableData.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <Checkbox
                        checked={selectedRows.includes(order.id)}
                        onChange={() => handleRowSelect(order.id)}
                      />
                    </TableCell>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <div className="flex items-center gap-3">
                        <div>
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {order.name}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {order.Category}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <div className="flex -space-x-2">
                        {order.team.images.map((teamImage, index) => (
                          <div
                            key={index}
                            className="w-12 h-12 overflow-hidden "
                          >
                            <img
                              width={20}
                              height={20}
                              src={`http://localhost:5300${teamImage}`} // Use the full image URL
                              alt={`Team member ${index + 1}`}
                              className="w-full size-11 "
                            />
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {order.Date}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      <div className="flex gap-2">
                        <BiEdit className="cursor-pointer text-gray-500 hover:text-gray-700 text-2xl" onClick={() => handleEdit(order)} />
                        <MdDelete className="cursor-pointer text-gray-500 hover:text-red-500 text-2xl" onClick={() => handleDelete(order.id, order.name, order.Category)} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>

  );
}