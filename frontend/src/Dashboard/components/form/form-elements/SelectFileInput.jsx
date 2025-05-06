import React, { useState, useEffect } from "react";
import { Modal } from "../../ui/modal";
import Button from "../../ui/button/Button";
import { FaTrash, FaUpload } from "react-icons/fa";
import axios from "axios";
import { ImCheckboxChecked } from "react-icons/im";
import { GrFormSubtract } from "react-icons/gr";




const SelectFileInput = ({ onfilesUpload, filesUrl, filesType, existingfiles, NameOffield, selected }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showUploadSection, setShowUploadSection] = useState(true);
    const [showAllfilessSection, setShowAllfilessSection] = useState(false);
    const [selectedfiles, setSelectedfiles] = useState(
        existingfiles?.url || (filesUrl ? `${filesUrl}` : null)
    );
    const [allfiless, setAllfiless] = useState([]);
    const [selectedfilesUrl, setSelectedfilesUrl] = useState(null);
    const [hoveredfiles, setHoveredfiles] = useState(null);
    const [hoverIcons, setHoverIcons] = useState(null);

    // Fetch all filess from the server
    const fetchAllfiless = async () => {
        try {
            const response = await axios.get("http://localhost:5300/files/get");

            if (response.data?.files) {
                const files = response.data.files.map((item) => ({
                    filesId: item._id,
                    filesUrl: item.file
                }));

                setAllfiless(files);
            } else {
                console.error("Unexpected response format:", response.data);
                setAllfiless([]);
            }
        } catch (error) {
            console.error("Error fetching filess:", error);
            setAllfiless([]);
        }
    };


    useEffect(() => {
        const fetchfiles = async () => {
            if (filesUrl && !existingfiles?.url) {
                try {
                    const response = await axios.get(`http://localhost:5300${filesUrl}`);
                    if (response.data.files) {
                        setSelectedfiles(response.data.files.files);
                    }
                } catch (error) {
                    console.error("Error fetching files:", error);
                }
            }
        };

        fetchfiles();
    }, [filesUrl, existingfiles]);

    const handleUpload = async (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await axios.post("http://localhost:5300/files/add", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                const uploadedfiles = response.data?.file;
                if (uploadedfiles) {
                    setShowUploadSection(false);
                    setShowAllfilessSection(true);
                    fetchAllfiless();
                    setSelectedfilesUrl(uploadedfiles.files);
                }
            } catch (error) {
                console.error("Error uploading files:", error);
                alert("Error uploading files. Please try again.");
            }
        }
    };

    // Handle files deletion

    const handleDeletefiles = async (filesUrl) => {
        try {
            const response = await axios.delete("http://localhost:5300/files/delete", {
                data: { fileUrl: filesUrl }
            });

            if (response.status === 200) {
                setAllfiless(prev => prev.filter(f => f.filesUrl !== filesUrl));

                if (selectedfilesUrl === filesUrl) {
                    setSelectedfilesUrl(null);
                    setSelectedfiles(null);
                    onfilesUpload(null);
                }

            }
        } catch (error) {
            console.error("Error deleting file:", error);
            alert('Failed to delete file. Please try again.');
        }
    };

    // Handle setting a featured files
    const handleSetFeaturedfiles = (filesUrl) => {
        if (!filesUrl) return;

        // If we're using an existing files from the content sections
        if (existingfiles) {
            onfilesUpload(existingfiles.id, existingfiles.type);
            setSelectedfiles(filesUrl);
            closeModal();
            return;
        }

        // For newly selected filess from the modal
        const filesData = allfiless.find((files) => files.filesUrl === filesUrl);
        if (filesData) {
            setSelectedfiles(filesUrl);
            onfilesUpload(filesData.filesUrl, 'files'); // Default type if not specified
            closeModal();
        }
        //  console.log("Selected files data:", filesData)
    };

    // Handle removing the featured files
    const handleRemovefiles = () => {
        setSelectedfiles(null);
        onfilesUpload(null); // Notify the parent component that no files is selected
    };

    // Open the modal
    const openModal = () => {
        setIsOpen(true);
        setIsFullscreen(false);
        setShowUploadSection(true);
        setShowAllfilessSection(false);
        setSelectedfilesUrl(null);
        fetchAllfiless(); // Fetch filess when the modal opens
    };

    // Close the modal
    const closeModal = () => {
        setIsOpen(false);
        setIsFullscreen(false);
    };

    // Handle files selection in the modal
    const handlefilesClick = (filesUrl) => {
        if (selectedfilesUrl === filesUrl) {
            setSelectedfilesUrl(null);
        } else {
            setSelectedfilesUrl(filesUrl);
        }
    };

    return (

        <div>
            {selectedfiles ? (
                <div className="flex flex-col  relative">
                    <div className="relative">
                        {selectedfiles.endsWith('.mp4') ? (

                            <video
                                controls
                                className="w-52 h-52 object-contain border-gray-700 border p-1 relative "
                            >
                                <source src={`http://localhost:5300${selectedfiles}`} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <img
                                src={`http://localhost:5300${selectedfiles}`}
                                alt="Featured"
                                className="w-52 h-52 object-contain border-gray-700 border p-1 relative "
                            />
                            
                        )}
                        <button
                            onClick={handleRemovefiles}

                            className="absolute  cursor-pointer top-1.5  left-1.5 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                            <FaTrash size={14} />
                        </button>
                    </div>
                    {/* <div className="mt-5 ">{filesUrl}</div> */}

                    {/* <button
                        onClick={handleRemovefiles}
                        className="mt-2 text-red-600 hover:text-red-800"
                    >
                        Remove files
                    </button> */}
                </div>
            ) : (
                <p
                    className=" cursor-pointer"

                >
                    {selected} <button onClick={openModal} className=" border-(--blue) border px-4 py-2 text-(--blue) rounded-lg ml-2"> {NameOffield}</button>
                </p>

            )}


            {/* {previewUrl && (
                <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-2">
                        {filesType === 'full-files' ? 'Full Width files' :
                            filesType === 'big-files' ? 'Large files' : 'Regular files'}
                    </p>
                    <div className={`overflow-hidden rounded-lg border ${filesType === 'full-files' ? 'w-full' :
                            filesType === 'big-files' ? 'w-3/4' : 'w-1/2'
                        }`}>
                        <img
                            src={previewUrl.startsWith('data:') ? previewUrl : `http://localhost:5300${previewUrl}`}
                            alt="Preview"
                            className="w-full h-auto"
                        />
                    </div>
                </div>
            )} */}


            {/* Modal for Uploading and Selecting filess */}
            <Modal
                isOpen={isOpen}
                onClose={closeModal}
                className={isFullscreen ? "w-[80%] h-full" : "container mx-auto max-w-[1850px]  w-[80%] p-6 bg-black"}
                isFullscreen={isFullscreen}
            >
                <div className="row flex flex-col flex-wrap">
                    <div className="col-3 grow-0 shrink-0">
                        <h1 className="text-2xl font-bold mb-10">Select files</h1>

                        {/* Toggle between Upload and All filess sections */}
                        <div className="border-b border-darkblack mb-5">
                            <div className="flex justify-between">
                                <div className="flex items-center gap-10 mb-3">
                                    <button
                                        onClick={() => {
                                            setShowUploadSection(true);
                                            setShowAllfilessSection(false);
                                        }}
                                        className={`text-lg cursor-pointer font-bold ${showUploadSection
                                            ? "text-(--white) border-2 bg-(--blue) rounded-sm border-(--blue) px-2 py-2"
                                            : "text-gray-500 "
                                            }`}
                                    >
                                        Upload files
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowUploadSection(false);
                                            setShowAllfilessSection(true);
                                        }}
                                        className={`text-lg cursor-pointer font-bold ${showAllfilessSection
                                            ? "text-(--white) border-2 bg-(--blue) rounded-sm border-(--blue) px-2 py-2"
                                            : "text-gray-500"
                                            }`}
                                    >
                                        All filess
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-3   ">
                        {/* Upload Section */}
                        {showUploadSection && (
                            <div className="cursor-pointer text-center  h-[60vh] flex justify-center items-center  ">
                                <div className="border-2 border-dashed border-(--blue) p-6 rounded-lg  hover:bg-(--blue) transition ">
                                    <label className="cursor-pointer">
                                        <input
                                            type="file"
                                            onChange={handleUpload}
                                            accept="files/*"
                                            className="hidden"
                                        />
                                        <div className="flex flex-col items-center">
                                            <FaUpload className="text-(--lightwhite) text-3xl" />
                                            <p className="text-(--lightwhite) font-bold">Click to upload or drag & drop</p>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        )}


                        {/* All filess Section */}
                        {showAllfilessSection && (
                            <div className="flex-1 flex-col px-2  h-[60vh]  custom-scrollbar">

                                <div className="">
                                    <h5 className="mb-4 text-xl lg:text-2xl">All filess</h5>
                                    <div className="flex flex-wrap  gap-5">
                                        {allfiless.map((files, index) => (
                                            <div
                                                key={index}
                                                className={`relative cursor-pointer p-0.5 w-32 ${selectedfilesUrl === files.filesUrl
                                                    ? "border-(--blue) outline-4 outline-(--blue)"
                                                    : "border-gray-700 border"
                                                    }`}
                                                onClick={() => handlefilesClick(files.filesUrl)}
                                                onMouseEnter={() => setHoveredfiles(files.filesUrl)}
                                                onMouseLeave={() => setHoveredfiles(null)}
                                            >
                                                {files.filesUrl.endsWith('.mp4') ? (
                                                    <video className="w-32 h-32 object-cover">
                                                        <source src={`http://localhost:5300${files.filesUrl}`} type="video/mp4" />
                                                    </video>
                                                ) : (
                                                    <img
                                                        src={`http://localhost:5300${files.filesUrl}`}
                                                        alt={`File ${index + 1}`}
                                                        className="w-32 h-32 object-cover"
                                                        onError={(e) => {
                                                            (e.target).src = '/path/to/fallback/image.jpg';
                                                        }}
                                                    />
                                                )}

                                                {selectedfilesUrl === files.filesUrl && hoverIcons !== files.filesUrl && (
                                                    <div
                                                        onMouseEnter={() => setHoverIcons(files.filesUrl)}
                                                        onMouseLeave={() => setHoverIcons(null)}
                                                    >
                                                        <ImCheckboxChecked
                                                            size={24}
                                                            className="absolute -top-2.5 cursor-pointer -right-3 bg-(--white) rounded-sm text-(--blue)"
                                                        />
                                                    </div>
                                                )}

                                                {hoverIcons === files.filesUrl && (
                                                    <div
                                                        onMouseEnter={() => setHoverIcons(files.filesUrl)}
                                                        onMouseLeave={() => setHoverIcons(null)}
                                                    >
                                                        <GrFormSubtract
                                                            size={24}
                                                            className="absolute -top-2.5 cursor-pointer -right-3 bg-(--blue) rounded-sm text-(--white)"
                                                        />
                                                    </div>
                                                )}

                                                {hoveredfiles === files.filesUrl && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeletefiles(files.filesUrl);
                                                        }}
                                                        className="absolute bottom-2 cursor-pointer right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600"
                                                    >
                                                        <FaTrash size={14} />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        )}
                    </div>

                    <div className="col-3 mt-auto">
                        <div className="flex items-end text-end gap-3 mt-6 justify-end">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleSetFeaturedfiles(selectedfilesUrl)}
                                disabled={!selectedfilesUrl}
                                className="btn btn-success cursor-pointer flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Set Select files
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>

    );
};

export default SelectFileInput;