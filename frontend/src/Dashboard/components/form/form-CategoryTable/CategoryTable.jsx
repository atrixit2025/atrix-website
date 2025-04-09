import React, { useContext, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import SelectBulk from "../SelectBulk";
import Checkbox from "../input/Checkbox";
import CustomAlert from "../../Alert/Alert";
// import CustomAlert from "../Alert/Alert"; // Import your alert component
import axios from "axios";
export default function CategoryTable({ 
  onEditClick, 
  context, 
  apiEndpoint,
  showDescription = true 
}) {
  const { 
    categories, 
    deleteCategory, 
    fetchCategories,
    fetchCategoryCounts, 
    categoryCounts 
  } = useContext(context);
  
  const [selectedRows, setSelectedRows] = useState([]);
  const [bulkAction, setBulkAction] = useState('');
  const [alert, setAlert] = useState({
    show: false,
    type: '',
    message: ''
  });
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [currentDeleteAction, setCurrentDeleteAction] = useState(null);

  const showAlert = (type, message) => {
    setAlert({
      show: true,
      type,
      message
    });
  };

  const closeAlert = () => {
    setAlert({
      show: false,
      type: '',
      message: ''
    });
  };

  const bulkOptions = [
    { value: 'BulkActions', label: 'Bulk Actions' },
    { value: 'delete', label: 'Delete' },
  ];

  const handleBulkAction = (selectedOption) => {
    if (!selectedOption?.value) return;
    setBulkAction(selectedOption.value);
  };

  const handleRowSelect = (id) => {
    setSelectedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id) 
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedRows(prev => 
      prev.length === categories.length 
        ? [] 
        : categories.map(category => category._id)
    );
  };

  const confirmBulkDelete = () => {
    if (selectedRows.length === 0) {
      showAlert('warning', 'Please select at least one item');
      return;
    }
    setCurrentDeleteAction(() => async () => {
      try {
        const response = await axios.delete(
          `${apiEndpoint}/delete-many`,
          { data: { ids: selectedRows } }
        );
        
        if (response.status === 200) {
          await fetchCategories();
          await fetchCategoryCounts();
          setSelectedRows([]);
          setBulkAction('');
          showAlert('success', `${selectedRows.length} items deleted successfully!`);
        }
      } catch (error) {
        console.error("Error in bulk delete:", error);
        showAlert('error', error.response?.data?.message || "Error deleting items. Please try again.");
      }
    });
    setShowConfirmDialog(true);
  };

  const handleSingleDelete = async (name) => {
    try {
      await deleteCategory(name);
      await fetchCategories();
      await fetchCategoryCounts();
      showAlert('success', 'Category deleted successfully!');
    } catch (error) {
      console.error("Error deleting category:", error);
      showAlert('error', error.response?.data?.message || "Error deleting category. Please try again.");
    }
  };

  const executeDelete = async () => {
    setShowConfirmDialog(false);
    if (currentDeleteAction) {
      await currentDeleteAction();
    }
  };

  return (
    <div className="space-y-6">
      {/* Custom Alert Component */}
      <CustomAlert
        show={alert.show}
        type={alert.type}
        message={alert.message}
        onClose={closeAlert}
      />

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-gray-400/50 backdrop-blur-[18px] bg-opacity-90 flex items-center justify-center z-99999 min-h-screen">
          <div className="bg-(--black) p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Confirm Bulk Deletion</h3>
            <p className="mb-6">Are you sure you want to delete {selectedRows.length} selected items? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={executeDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        <div className="">
          <SelectBulk
            options={bulkOptions}
            placeholder="Bulk Actions"
            onChange={handleBulkAction}
            className="w-full border rounded-lg"
            value={bulkOptions.find(option => option.value === bulkAction) || null}
          />
        </div>

        {bulkAction === 'delete' && (
          <button
            onClick={confirmBulkDelete}
            disabled={selectedRows.length === 0}
            className={`px-4 py-2 rounded ${
              selectedRows.length > 0
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
          <div className="xl:min-w-[1102px]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell isHeader className="px-6 py-4 font-medium text-gray-500 text-start text-theme-xl dark:text-gray-400">
                    <Checkbox
                      checked={selectedRows.length === categories.length && categories.length > 0}
                      onChange={handleSelectAll}
                      disabled={categories.length === 0}
                    />
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Name
                  </TableCell>
                  {showDescription && (
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                      Description
                    </TableCell>
                  )}
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Slug
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Count
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Action
                  </TableCell>
                </TableRow>
              </TableHeader>

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
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {category.Name}
                        </span>
                      </div>
                    </TableCell>
                    {showDescription && (
                      <TableCell className="px-6 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {category.Description}
                      </TableCell>
                    )}
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {category.Slug}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {categoryCounts[category.Name] || 0}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      <div className="flex gap-2">
                        <BiEdit
                          className="cursor-pointer text-gray-500 hover:text-gray-700 text-2xl"
                          onClick={() => onEditClick(category)}
                        />
                        <MdDelete
                          className="cursor-pointer text-gray-500 hover:text-red-500 text-2xl"
                          onClick={() => handleSingleDelete(category.Name)}
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
  );
}