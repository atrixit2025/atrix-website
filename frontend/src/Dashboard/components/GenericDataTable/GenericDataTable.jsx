import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Checkbox from "../form/input/Checkbox";
import SelectBulk from "../form/SelectBulk";

const GenericDataTable = ({
  data,
  columns,
  onDelete,
  onEdit,
  onBulkDelete,
  addButtonLink,
  pageTitle,
  buttonText,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [bulkAction, setBulkAction] = useState('');

  const bulkOptions = [
    { value: 'BulkActions', label: 'Bulk Actions' },
    { value: 'delete', label: 'Delete' },
  ];

  const handleBulkAction = (selectedOption) => {
    if (!selectedOption || !selectedOption.value) return;
    const action = selectedOption.value;
    setBulkAction(action);
  };

  const handleRowSelect = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((item) => item.id));
    }
  };

  const handleBulkDeleteClick = async () => {
    if (selectedRows.length === 0) {
      alert('Please select at least one item');
      return;
    }

    if (!window.confirm(`Are you sure you want to delete ${selectedRows.length} items?`)) {
      return;
    }

    try {
      await onBulkDelete(selectedRows);
      // Clear selection after successful deletion
      setSelectedRows([]);
      setBulkAction('');
    } catch (error) {
      console.error("Error in bulk delete:", error);
    }
  };

  return (
    <div className="space-y-6">
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
            onClick={handleBulkDeleteClick}
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
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell isHeader className="px-6 py-4 font-medium text-gray-500 text-start text-theme-xl dark:text-gray-400">
                    <Checkbox
                      checked={selectedRows.length === data.length}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell
                      key={column.key}
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      {column.title}
                    </TableCell>
                  ))}
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Action
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <Checkbox
                        checked={selectedRows.includes(item.id)}
                        onChange={() => handleRowSelect(item.id)}
                      />
                    </TableCell>
                    {columns.map((column) => (
                      <TableCell key={column.key} className="px-6 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {column.render ? column.render(item) : item[column.key]}
                      </TableCell>
                    ))}
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      <div className="flex gap-2">
                        <BiEdit 
                          className="cursor-pointer text-gray-500 hover:text-gray-700 text-2xl" 
                          onClick={() => onEdit(item)} 
                        />
                        <MdDelete 
                          className="cursor-pointer text-gray-500 hover:text-red-500 text-2xl" 
                          onClick={() => onDelete(item.id, item.name, item.Category)} 
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
};

export default GenericDataTable;