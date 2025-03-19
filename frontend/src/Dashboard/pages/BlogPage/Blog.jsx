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
// import Checkbox from "../../form/input/Checkbox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Checkbox from "../../components/form/input/Checkbox";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";



export default function Blog() {
    const [selectedRows, setSelectedRows] = useState([]);
    const [tableData, setTableData] = useState([]); // State to store fetched data
    const navigate = useNavigate()
    // Fetch data from the API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5300/Blog/get");
                const blogs = response.data.Blog;

                // Map the fetched data to the tableData format
                const mappedData = blogs.map((tech, index) => ({
                    id: tech._id,
                    name: tech.title,
                    Category: tech.category,
                    description: tech.description,
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

    const handleDelete = async (id, title, category, description) => {
        try {
            // Send a DELETE request to the server
            const response = await axios.delete("http://localhost:5300/Blog/delete", {
                data: { title, category, description },
            });

            if (response.status === 200) {
                // Remove the deleted Blog from the tableData state
                setTableData((prevData) => prevData.filter((order) => order.id !== id));
                alert("Blog deleted successfully!");
            }
        } catch (error) {
            console.error("Error deleting Blog:", error);
            alert("Error deleting Blog. Please try again.");
        }
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
        if (selectedRows.length === tableData.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(tableData.map((order) => order.id));
        }
    };

    const handleEdit = (order) => {
        navigate("/AddNewBlog", {
            state: { blog: order },
        });
    };
    return (
        <>
            <PageBreadcrumb pageTitle="Blog"
                buttonText="New Add Blog"
                buttonLink="/AddNewBlog" />
            <div className="space-y-6">
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
                                            Description
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
                                            <TableCell className="px-6 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                {order.description}
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
                                                    <MdDelete className="cursor-pointer text-gray-500 hover:text-red-500 text-2xl" onClick={() => handleDelete(order.id, order.name, order.Category, order.description)} />
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