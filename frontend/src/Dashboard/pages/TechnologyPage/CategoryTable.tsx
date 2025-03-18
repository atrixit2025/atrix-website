import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

import Checkbox from "../../components/form/input/Checkbox";

interface Order {
  id: number;
  name: string;
  Category: string;
  projectName: string;
  team: {
    images: string[];
  };
  status: string;
  count: number;
}


const tableData: Order[] = [
  {
    id: 1,

    name: "React Js",
    Category: "Frontend",
    projectName: "06/03/2025",
    team: {
      images: ["/images/user/user-22.jpg"],
    },
    count:"0"

  },
  {
    id: 2,
    name: "Node Js",
    Category: "Backend",
    projectName: "07/03/2025",
    team: {
      images: ["/images/user/user-22.jpg"],
    },
    count:"0"

  },
];

export default function CategoryTable() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

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
                  <Checkbox checked={selectedRows.length === tableData.length}
                    onChange={handleSelectAll} />


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

               
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {tableData.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <Checkbox checked={selectedRows.includes(order.id)}
                      onChange={() => handleRowSelect(order.id)} />

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
                    {order.projectName}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {order.count}
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