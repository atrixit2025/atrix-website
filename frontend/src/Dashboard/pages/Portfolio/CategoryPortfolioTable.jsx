import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Checkbox from "../../components/form/input/Checkbox";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { PortfolioCategoryContext } from "../../ContextApi/PortfolioCategoryContextApi";
import SelectBulk from "../../components/form/SelectBulk";
import axios from "axios";

export default function CategoryPortfolioTable({ onEditClick }) {
  const { categories, deletePortfolioCategory, fetchCategories,CountPortfolioCategory } = useContext(PortfolioCategoryContext);
  const [selectedRows, setSelectedRows] = useState([]);
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
      const response = await axios.delete(
        'http://localhost:5300/PortfolioCategory/delete-many',
        {
          data: { ids: selectedRows }
        }
      );

      if (response.status === 200) {
        // Refresh the categories list
        await fetchCategories();
        // Clear selection
        setSelectedRows([]);
        setBulkAction('');
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error in bulk delete:", error);
      alert(error.response?.data?.message || "Error deleting items. Please try again.");
    }
  };

  // Handle individual delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deletePortfolioCategory(id);
        await fetchCategories();
      } catch (error) {
        console.error("Error deleting category:", error);
        alert("Error deleting category. Please try again.");
      }
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
  // Handle individual row selection
  const handleRowSelect = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // Handle "Select All" functionality
  const handleSelectAll = () => {
    if (selectedRows.length === categories.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(categories.map((category) => category._id));
    }
  };

  // Handle delete action
  // const handleDelete = (name) => {
  //   if (window.confirm("Are you sure you want to delete this category?")) {
  //       deletePortfolioCategory(name);
  //   }
  // };



  return (
    <>
      <div className="space-y-6">
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
                        checked={selectedRows.length === categories.length}
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Name
                    </TableCell>
                    {/* <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Description
                    </TableCell> */}
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Slug
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Count
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
                  {categories.map((category) => (
                    <TableRow key={category._id}>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <Checkbox
                          checked={selectedRows.includes(category._id)}
                          onChange={() => handleRowSelect(category._id)}
                        />
                      </TableCell>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <div className="flex items-center gap-3">
                          <div>
                            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                              {category.Name}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      {/* <TableCell className="px-6 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {category.Description}
                      </TableCell> */}
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {category.Slug}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {category.CountPortfolioCategory || 0}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        <div className="flex gap-2">
                          <BiEdit
                            className="cursor-pointer text-gray-500 hover:text-gray-700 text-2xl"
                            onClick={() => onEditClick(category)}
                          />
                          <MdDelete
                            className="cursor-pointer text-gray-500 hover:text-red-500 text-2xl"
                            onClick={() => handleDelete(category.Name)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}