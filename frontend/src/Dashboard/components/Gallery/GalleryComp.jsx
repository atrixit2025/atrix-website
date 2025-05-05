import React, { useState, useEffect } from "react";
import { FaTrash, FaUpload } from "react-icons/fa";
import axios from "axios";
import { ImCheckboxChecked } from "react-icons/im";
import { GrFormSubtract } from "react-icons/gr";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";

const GalleryComp = ({ onfilesUpload, filesUrl, existingfiles = [], NameOffield, selected }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showUploadSection, setShowUploadSection] = useState(true);
    const [showAllfilessSection, setShowAllfilessSection] = useState(false);
    const [allfiless, setAllfiless] = useState([]);
    const [selectedfilesUrl, setSelectedfilesUrl] = useState([]);
    const [hoveredfiles, setHoveredfiles] = useState(null);
    const [hoverIcons, setHoverIcons] = useState(null);

    const getImageUrl = (file) => {
        return file?.imageUrl || file?.url || null;
    };

    useEffect(() => {
        if (Array.isArray(existingfiles)) {
            // Map through existing files and ensure they have imageUrl
            const validFiles = existingfiles.map(file => ({
                ...file,
                imageUrl: getImageUrl(file)
            })).filter(file => file.imageUrl);

            // Update parent if any files were invalid
            if (validFiles.length !== existingfiles.length) {
                onfilesUpload(validFiles);
            }

            // Set selected files URLs
            setSelectedfilesUrl(validFiles.map(file => file.imageUrl));
        }
    }, [existingfiles]);

    const fetchAllfiless = async () => {
        try {
            const response = await axios.get("http://localhost:5300/files/get");

            if (response.data?.files) {
                // Filter to only include files where type is 'image'
                const files = response.data.files
                    .filter(item => item.type === 'image') // This line filters only images
                    .map((item) => ({
                        filesId: item._id,
                        filesUrl: item.file,
                        type: item.type // Include the type in the object
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
                        setSelectedfilesUrl(response.data.files.files);
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
                // Update all states
                setAllfiless(prev => prev.filter(f => f.filesUrl !== filesUrl));
                setSelectedfilesUrl(prev => prev.filter(url => url !== filesUrl));

                // Update existing files
                const updated = existingfiles
                    .filter(file => getImageUrl(file) !== filesUrl)
                    .map(file => ({ imageUrl: getImageUrl(file) }));

                onfilesUpload(updated);
            }
        } catch (error) {
            console.error("Error deleting file:", error);
            alert('Failed to delete file. Please try again.');
        }
    };


    // Handle confirming files selection
    const handleSetFeaturedfiless = () => {
        if (selectedfilesUrl.length === 0) return;

        const selectedfilesData = selectedfilesUrl.map(url => {
            const found = allfiless.find(files => files.filesUrl === url);
            return found ? {
                // filesId: found.filesId,
                url: found.filesUrl
            } : null;

        }).filter(Boolean);

        onfilesUpload(selectedfilesData);
        closeModal();
    };



    // Handle removing an files from selection
    const handleRemovefiles = (index) => {
        const updatedfiless = [...existingfiles];
        updatedfiless.splice(index, 1);
        onfilesUpload(updatedfiless);
    };

    // Toggle files selection
    const togglefilesSelection = (filesUrl) => {
        setSelectedfilesUrl(prev =>
            prev.includes(filesUrl)
                ? prev.filter(url => url !== filesUrl)
                : [...prev, filesUrl]
        );
    };

    const openModal = () => {
        setIsOpen(true);
        setSelectedfilesUrl(existingfiles.map(img => img.imageUrl).filter(Boolean) || []);


        fetchAllfiless();
    };

    const closeModal = () => {
        setIsOpen(false);
    };
    // useEffect(() => {
    //     console.log("Existing files updated:", existingfiles);
    // }, [existingfiles]);


    return (
        <>

            <div className="border-2 px-4 py-4 rounded-xl border-gray-700">
                {/* Selected filess Preview */}
                <div className="  flex flex-wrap gap-4">
                    {existingfiles.map((files, index) => (
                        <div key={index} className="relative group mb-4">
                            {files?.imageUrl ? (
                                <img
                                    src={`http://localhost:5300${files.imageUrl}`}
                                    alt="Selected"
                                    className="w-32 h-32 object-contain border-gray-700 border p-1 relative"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "/fallback.jpg";
                                    }}
                                />
                            ) : (
                                <div className="w-32 h-32 flex items-center justify-center border border-red-500 text-red-500">
                                    Invalid file
                                </div>
                            )}
                            {/* <button
                                onClick={() => handleRemovefiles(index)}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            >
                                ×
                            </button> */}
                        </div>
                    ))}

                </div>

                {/* Add filess Button */}
                {(existingfiles.length > 0 || selectedfilesUrl.length > 0) ? "" : selected} <button
                    onClick={openModal}
                    className="border border-(--blue) px-4 py-2 text-(--blue) rounded-lg transition-colors "
                >

                    {(existingfiles.length > 0 || selectedfilesUrl.length > 0) ? "Add More files" : NameOffield}

                </button>

                {/* Modal for files Selection */}
                <Modal
                    isOpen={isOpen}
                    onClose={closeModal}
                    className={isFullscreen ? "w-[80%] h-full" : "container mx-auto max-w-[1850px] w-[80%] p-6 bg-black"}
                    isFullscreen={isFullscreen}
                >
                    <div className="row flex flex-col flex-wrap">
                        <div className="col-3 grow-0 shrink-0">
                            <h1 className="text-2xl font-bold mb-10">Select files</h1>
                            <div className="border-b border-darkblack mb-5">
                                <div className="flex justify-between">
                                    <div className="flex items-center gap-10 mb-3">
                                        <button
                                            onClick={() => {
                                                setShowUploadSection(true);
                                                setShowAllfilessSection(false);
                                            }}
                                            className={`text-lg cursor-pointer font-bold ${showUploadSection
                                                ? "text-white border-2 bg-(--blue) rounded-sm border-(--blue) px-2 py-2"
                                                : "text-gray-500"
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
                                                ? "text-white border-2 bg-(--blue) rounded-sm border-(--blue) px-2 py-2"
                                                : "text-gray-500"
                                                }`}
                                        >
                                            All files
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-3">
                            {showUploadSection && (
                                <div className="cursor-pointer text-center h-[60vh] flex justify-center items-center">
                                    <div className="border-2 border-dashed border-(--blue) p-6 rounded-lg hover:bg-(--blue) transition">
                                        <label className="cursor-pointer">
                                            <input
                                                type="file"
                                                onChange={handleUpload}
                                                accept="files/*"
                                                multiple
                                                className="hidden"
                                            />
                                            <div className="flex flex-col items-center">
                                                <FaUpload className="text-white text-3xl" />
                                                <p className="text-white font-bold">Click to upload or drag & drop</p>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            )}

                            {showAllfilessSection && (
                                <div className="flex-1 flex-col px-2 h-[60vh] custom-scrollbar">
                                    <div className="">
                                        <h5 className="mb-4 text-xl lg:text-2xl">All files</h5>
                                        <div className="flex flex-wrap gap-5">
                                            {allfiless.map((files, index) => (
                                                <div
                                                    key={index}
                                                    className={`relative cursor-pointer p-0.5 w-32 ${selectedfilesUrl.includes(files.filesUrl)
                                                        ? "border-(--blue) outline-4 outline-(--blue)"
                                                        : "border-gray-700 border"
                                                        }`}
                                                    onClick={() => togglefilesSelection(files.filesUrl)}
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

                                                    {selectedfilesUrl.includes(files.filesUrl) && (
                                                        <div className="absolute -top-2.5 -right-3 bg-white rounded-sm text-(--blue)">
                                                            <ImCheckboxChecked size={24} />
                                                        </div>
                                                    )}

                                                    {hoverIcons === files.filesUrl && (
                                                        <div
                                                            onMouseEnter={() => setHoverIcons(files.filesUrl)}
                                                            onMouseLeave={() => setHoverIcons(null)}
                                                            className="absolute -top-2.5 cursor-pointer -right-3 bg-(--blue) rounded-sm text-(--white)"
                                                        >
                                                            <GrFormSubtract
                                                                size={24}

                                                            />
                                                        </div>
                                                    )}
                                                    {hoveredfiles === files.filesUrl && (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDeletefiles(files.filesUrl);
                                                            }}
                                                            className="absolute bottom-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600"
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
                            <div className="flex items-end gap-3 mt-6 justify-end">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={handleSetFeaturedfiless}
                                    disabled={selectedfilesUrl.length === 0}
                                    className="btn btn-success cursor-pointer flex justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Add {selectedfilesUrl.length} files
                                </Button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    );
};

export default GalleryComp;