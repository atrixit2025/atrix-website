import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../components/ui/table";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Checkbox from "../../components/form/input/Checkbox";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Select from "../../components/form/Select";
import SelectBUlk from "../../components/form/SelectBulk";
import SelectBulk from "../../components/form/SelectBulk";

export default function Brand() {
    const [selectedRows, setSelectedRows] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [bulkAction, setBulkAction] = useState('');
    const navigate = useNavigate();

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5300/Brand/get");
                const brands = response.data.Brand;
                const mappedData = brands.map((tech) => ({
                    id: tech._id,
                    name: tech.title,
                    Category: tech.category,
                    Date: new Date(tech.updatedAt).toLocaleDateString(),
                    team: {
                        images: [tech.image?.image || "/images/user/user-22.jpg"],
                    },
                    imageId: tech.image?._id,
                }));
                setTableData(mappedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    // Single delete
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete("http://localhost:5300/Brand/delete", {
                data: { id }
            });

            if (response.status === 200) {
                setTableData(prev => prev.filter(order => order.id !== id));
                alert("Brand deleted successfully!");
            }
        } catch (error) {
            console.error("Error deleting Brand:", error);
            alert(error.response?.data?.message || "Error deleting Brand. Please try again.");
        }
    };

    const handleBulkDelete = async () => {
        if (selectedRows.length === 0) {
            alert('Please select at least one item');
            return;
        }

        if (!window.confirm(`Are you sure you want to delete ${selectedRows.length} items?`)) {
            return;
        }

        try {
            const response = await axios.delete("http://localhost:5300/Brand/delete", {
                data: { id: selectedRows }
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

    const handleRowSelect = (id) => {
        setSelectedRows(prev =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        setSelectedRows(prev =>
            prev.length === tableData.length ? [] : tableData.map(order => order.id)
        );
    };

    const handleEdit = (order) => {
        navigate("/Dashboard/AddNewBrand", {
            state: { brand: order },
        });
    };

    const bulkOptions = [
        { value: 'BulkActions', label: 'Bulk Actions' },
        { value: 'delete', label: 'Delete' },
    ];

    const handleBulkAction = (selectedOption) => {
        if (!selectedOption || !selectedOption.value) return;
        const action = selectedOption.value;
        setBulkAction(action);
    };


    return (
        <>
            <PageBreadcrumb
                pageTitle="Brand"
                buttonText=" Add New Brand"
                buttonLink="/Dashboard/AddNewBrand"
            />

            <div className="space-y-6">
                {/* Bulk Actions Section */}
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

                {/* Table */}
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
                                                                src={`http://localhost:5300${teamImage}`}
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
                                                    <MdDelete className="cursor-pointer text-gray-500 hover:text-red-500 text-2xl" onClick={() => handleDelete(order.id)} />
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