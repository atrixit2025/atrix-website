import React, { useState, useEffect } from "react";
import { FaTrash, FaUpload } from "react-icons/fa";
import axios from "axios";
import { ImCheckboxChecked } from "react-icons/im";
import { GrFormSubtract } from "react-icons/gr";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Label from "../form/Label";

const GalleryComp = ({ onImageUpload, imageId, imageType, existingImages = [], NameOffield, selected }) => {
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showUploadSection, setShowUploadSection] = useState(true);
    const [showAllImagesSection, setShowAllImagesSection] = useState(false);
    const [allImages, setAllImages] = useState([]);
    const [selectedImageUrls, setSelectedImageUrls] = useState([]);
    const [hoveredImage, setHoveredImage] = useState(null);
    const [hoverIcons, setHoverIcons] = useState(null);

    // Initialize with existing images
    useEffect(() => {
        if (existingImages && existingImages.length > 0) {
            setPreviewUrl(existingImages[0]?.url || null);
        }
    }, [existingImages]);

    // Fetch all images from the server
    const fetchAllImages = async () => {
        try {
            const response = await axios.get("http://localhost:5300/Image/get");
            if (response.status === 200) {
                setAllImages(response.data.Image.map(item => ({
                    imageId: item._id,
                    imageUrl: item.image,
                })));
            }
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };

    // Handle multiple image upload
    const handleUpload = async (event) => {
        const files = Array.from(event.target.files || []);
        if (files.length === 0) return;

        try {
            const uploadPromises = files.map(file => {
                const formData = new FormData();
                formData.append("file", file);
                return axios.post("http://localhost:5300/Image/add", formData);
            });

            const responses = await Promise.all(uploadPromises);
            const newImages = responses.map(res => res.data.Image.image);
            
            setSelectedImageUrls(prev => [...prev, ...newImages]);
            setShowUploadSection(false);
            setShowAllImagesSection(true);
            fetchAllImages();
        } catch (error) {
            console.error("Error uploading images:", error);
        }
    };

    // Handle image deletion from server
    const handleDeleteImage = async (imageUrl) => {
        try {
            await axios.delete("http://localhost:5300/Image/delete", {
                data: { ImageUrl: imageUrl },
            });
            setAllImages(prev => prev.filter(img => img.imageUrl !== imageUrl));
            setSelectedImageUrls(prev => prev.filter(url => url !== imageUrl));
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };

    // Handle confirming image selection
    const handleSetFeaturedImages = () => {
        if (selectedImageUrls.length === 0) return;
        
        const selectedImageData = selectedImageUrls.map(url => {
            const found = allImages.find(image => image.imageUrl === url);
            return found ? { 
                imageId: found.imageId, 
                url: found.imageUrl 
            } : null;
        }).filter(Boolean);
        
        console.log("Sending to parent:", selectedImageData);
        onImageUpload(selectedImageData);
        closeModal();
    };

    // Handle removing an image from selection
    const handleRemoveImage = (index) => {
        const updatedImages = [...existingImages];
        updatedImages.splice(index, 1);
        onImageUpload(updatedImages);
    };

    // Toggle image selection
    const toggleImageSelection = (imageUrl) => {
        setSelectedImageUrls(prev => 
            prev.includes(imageUrl)
                ? prev.filter(url => url !== imageUrl)
                : [...prev, imageUrl]
        );
    };

    const openModal = () => {
        setIsOpen(true);
        setSelectedImageUrls(existingImages.map(img => img.url) || []);
        fetchAllImages();
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <>
        <Label>Gallery</Label>
        <div className="border-2 px-4 py-2 rounded-xl border-gray-700">
            {/* Selected Images Preview */}
            <div className="  flex flex-wrap gap-4">
                {existingImages.map((image, index) => (
                    <div key={index} className="relative group">
                        <img
                            src={`http://localhost:5300${image.url}`}
                            alt={`Selected ${index + 1}`}
                            className="w-32 h-32 object-contain rounded-md border border-gray-300 mb-4"
                        />
                        <button
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>

            {/* Add Images Button */}
            {(existingImages.length > 0 || selectedImageUrls.length > 0) ? "" : selected} <button 
                onClick={openModal}
                className="border border-(--blue) px-4 py-2 text-(--blue) rounded-lg transition-colors"
            >
               
               {(existingImages.length > 0 || selectedImageUrls.length > 0) ? "Add More Images" : NameOffield}

            </button>

            {/* Modal for Image Selection */}
            <Modal
                isOpen={isOpen}
                onClose={closeModal}
                className={isFullscreen ? "w-[80%] h-full" : "container mx-auto max-w-[1850px] w-[80%] p-6 bg-black"}
                isFullscreen={isFullscreen}
            >
                <div className="row flex flex-col flex-wrap">
                    <div className="col-3 grow-0 shrink-0">
                        <h1 className="text-2xl font-bold mb-10">Select Images</h1>
                        <div className="border-b border-darkblack mb-5">
                            <div className="flex justify-between">
                                <div className="flex items-center gap-10 mb-3">
                                    <button
                                        onClick={() => {
                                            setShowUploadSection(true);
                                            setShowAllImagesSection(false);
                                        }}
                                        className={`text-lg cursor-pointer font-bold ${showUploadSection
                                            ? "text-white border-2 bg-(--blue) rounded-sm border-(--blue) px-2 py-2"
                                            : "text-gray-500"
                                        }`}
                                    >
                                        Upload Image
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowUploadSection(false);
                                            setShowAllImagesSection(true);
                                        }}
                                        className={`text-lg cursor-pointer font-bold ${showAllImagesSection
                                            ? "text-white border-2 bg-(--blue) rounded-sm border-(--blue) px-2 py-2"
                                            : "text-gray-500"
                                        }`}
                                    >
                                        All Images
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
                                            accept="image/*"
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

                        {showAllImagesSection && (
                            <div className="flex-1 flex-col px-2 h-[60vh] custom-scrollbar">
                                <div className="">
                                    <h5 className="mb-4 text-xl lg:text-2xl">All Images</h5>
                                    <div className="flex flex-wrap gap-5">
                                        {allImages.map((image, index) => (
                                            <div
                                                key={index}
                                                className={`relative cursor-pointer p-0.5 w-32 ${
                                                    selectedImageUrls.includes(image.imageUrl)
                                                        ? "border-(--blue) outline-4 outline-(--blue)"
                                                        : "border-gray-700 border"
                                                }`}
                                                onClick={() => toggleImageSelection(image.imageUrl)}
                                                onMouseEnter={() => setHoveredImage(image.imageUrl)}
                                                onMouseLeave={() => setHoveredImage(null)}
                                            >
                                                <img
                                                    src={`http://localhost:5300${image.imageUrl}`}
                                                    alt={`Image ${index + 1}`}
                                                    className="w-32 h-32 object-contain"
                                                />

                                                {selectedImageUrls.includes(image.imageUrl) && (
                                                    <div className="absolute -top-2.5 -right-3 bg-white rounded-sm text-(--blue)">
                                                        <ImCheckboxChecked size={24} />
                                                    </div>
                                                )}

                                                   {hoverIcons === image.imageUrl && (
                                                    <div
                                                        onMouseEnter={() => setHoverIcons(image.imageUrl)}
                                                        onMouseLeave={() => setHoverIcons(null)}
                                                        className="absolute -top-2.5 cursor-pointer -right-3 bg-(--blue) rounded-sm text-(--white)"
                                                    >
                                                        <GrFormSubtract
                                                            size={24}
                                                            
                                                        />
                                                    </div>
                                                )}
                                                {hoveredImage === image.imageUrl && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteImage(image.imageUrl);
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
                                onClick={handleSetFeaturedImages}
                                disabled={selectedImageUrls.length === 0}
                                className="btn btn-success cursor-pointer flex justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Add {selectedImageUrls.length} Images
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