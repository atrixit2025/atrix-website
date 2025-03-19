import React, { useContext, useState } from "react";
import { CategoryContext } from "../../ContextApi/CategoryContextApi";
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

export default function CategoryTable({ onEditClick }) {
  const { categories, deleteCategory } = useContext(CategoryContext);
  const [selectedRows, setSelectedRows] = useState([]);

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
  const handleDelete = (name) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      deleteCategory(name);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
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
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Description
                </TableCell>
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
                  <TableCell className="px-6 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {category.Description}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {category.Slug}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {category.count || 0}
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
  );
}