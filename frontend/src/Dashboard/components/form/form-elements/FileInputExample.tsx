import React, { useState, useEffect } from "react";
import ComponentCard from "../../common/ComponentCard";
import { Modal } from "../../ui/modal";
import Button from "../../ui/button/Button";
import { FaTrash, FaUpload } from "react-icons/fa";
import axios from "axios";
import { ImCheckboxChecked } from "react-icons/im";
import { GrFormSubtract } from "react-icons/gr";

// Define the type for the image object
type Image = {
  imageId: string; // MongoDB ObjectId
  imageUrl: string; // Image URL
};

// Define the props for the FileInputExample component
interface FileInputExampleProps {
  onImageUpload: (imageId: string | null) => void; // Callback to pass the imageId to the parent
  imageId: string | null; // The selected imageId (MongoDB ObjectId)
}

const FileInputExample: React.FC<FileInputExampleProps> = ({ onImageUpload, imageId }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showUploadSection, setShowUploadSection] = useState<boolean>(true);
  const [showAllImagesSection, setShowAllImagesSection] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [allImages, setAllImages] = useState<Image[]>([]);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [hoverIcons, setHoverIcons] = useState<string | null>(null);

  // Fetch all images from the server
  const fetchAllImages = async () => {
    try { 
      const response = await axios.get("http://localhost:5300/Image/get");
      if (response.status === 200) {
        const images: Image[] = response.data.Image.map((item: any) => ({
          imageId: item._id, // MongoDB ObjectId
          imageUrl: item.image, // Image URL
        }));
        setAllImages(images); // Update state with both imageId and imageUrl
      } else {
        console.error("Error fetching images:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  // Set the selected image when the component mounts or imageId changes
  useEffect(() => {
    if (imageId) {
      const storedImageData: Image[] = JSON.parse(localStorage.getItem("imageData") || "[]");
      console.log("storedImageData:", storedImageData); // Log the stored data
      const imageData = storedImageData.find((image) => image.imageId === imageId); // Compare with imageId
      console.log("imageData:", imageData); // Log the found imageData

      if (imageData) {
        setSelectedImageUrl(imageData.imageUrl); // Use imageUrl for display
        setSelectedImage(imageData.imageUrl);
      } else {
        console.error("No imageData found for imageId:", imageId);
      }
    }
  }, [imageId]);

  // Handle image upload
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post("http://localhost:5300/Image/add", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const uploadedImage = response.data.Image;
        const imageId = uploadedImage._id; // MongoDB ObjectId
        const imageUrl = uploadedImage.image; // Image URL

        // Store the image data in localStorage
        const storedImageData: Image[] = JSON.parse(localStorage.getItem("imageData") || "[]");
        storedImageData.push({ imageId: imageId, imageUrl: imageUrl }); // Use consistent field names
        localStorage.setItem("imageData", JSON.stringify(storedImageData));

        console.log("imageId:", imageId); // Log the imageId
        console.log("imageUrl:", imageUrl); // Log the imageUrl

        setShowUploadSection(false);
        setShowAllImagesSection(true);
        fetchAllImages();
        setSelectedImageUrl(imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image. Please try again.");
      }
    }
  };

  // Handle image deletion
  const handleDeleteImage = async (imageUrl: string) => {
    try {
      const response = await axios.delete("http://localhost:5300/Image/delete", {
        data: { ImageUrl: imageUrl },
      });

      if (response.status === 200) {
        setAllImages((prev) => prev.filter((img) => img.imageUrl !== imageUrl)); // Remove from state
        if (selectedImageUrl === imageUrl) {
          setSelectedImageUrl(null); // Clear selected image if deleted
        }

        const storedImageData: Image[] = JSON.parse(localStorage.getItem("imageData") || "[]");
        const updatedImageData = storedImageData.filter((image) => image.imageUrl !== imageUrl);
        localStorage.setItem("imageData", JSON.stringify(updatedImageData));

        console.log("Image deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  // Handle setting a featured image
  const handleSetFeaturedImage = (imageUrl: string) => {
    const imageData = allImages.find((image) => image.imageUrl === imageUrl); // Find the image data
    console.log("imageData:", imageData); // Debugging
    if (imageData) {
      setSelectedImage(imageUrl); // Set the selected image URL for display
      onImageUpload(imageData.imageId); // Pass the MongoDB ObjectId to the parent component
      closeModal(); // Close the modal
    }
  };

  // Handle removing the featured image
  const handleRemoveImage = () => {
    setSelectedImage(null);
    onImageUpload(null); // Notify the parent component that no image is selected
  };

  // Open the modal
  const openModal = () => {
    setIsOpen(true);
    setIsFullscreen(false);
    setShowUploadSection(true);
    setShowAllImagesSection(false);
    setSelectedImageUrl(null);
    fetchAllImages(); // Fetch images when the modal opens
  };

  // Close the modal
  const closeModal = () => {
    setIsOpen(false);
    setIsFullscreen(false);
  };

  // Handle image selection in the modal
  const handleImageClick = (imageUrl: string) => {
    if (selectedImageUrl === imageUrl) {
      setSelectedImageUrl(null); // Unselect if already selected
    } else {
      setSelectedImageUrl(imageUrl); // Select if not selected
    }
    console.log("selectedImageUrl:", selectedImageUrl); // Debugging
  };

  return (
    <ComponentCard title="Featured Image">
      <div>
        {selectedImage ? (
          <div className="flex flex-col items-center">
            <img
              src={`http://localhost:5300${selectedImage}`}
              alt="Featured"
              className="w-32 h-32 object-contain"
            />
            <div className="mt-5 ">{imageId}</div>
            <button
              onClick={handleRemoveImage}
              className="mt-2 text-red-600 hover:text-red-800"
            >
              Remove Image
            </button>
          </div>
        ) : (
          <p
            className="text-(--blue) cursor-pointer underline"
            onClick={openModal}
          >
            Set Featured Image
          </p>
        )}

        {/* Modal for Uploading and Selecting Images */}
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          className={isFullscreen ? "w-[80%] h-full" : "container mx-auto max-w-[1850px] w-[80%] p-6 bg-black"}
          isFullscreen={isFullscreen}
        >
          <div className="row flex flex-col flex-wrap">
            <div className="col-3 grow-0 shrink-0">
              <h1 className="text-2xl font-bold mb-10">Featured Image</h1>

              {/* Toggle between Upload and All Images sections */}
              <div className="border-b border-darkblack mb-5">
                <div className="flex justify-between">
                  <div className="flex items-center gap-10 mb-3">
                    <button
                      onClick={() => {
                        setShowUploadSection(true);
                        setShowAllImagesSection(false);
                      }}
                      className={`text-lg cursor-pointer font-bold ${showUploadSection
                        ? "text-(--white) border-2 bg-(--blue) rounded-sm border-(--blue) px-2 py-2"
                        : "text-gray-500 "
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
                        ? "text-(--white) border-2 bg-(--blue) rounded-sm border-(--blue) px-2 py-2"
                        : "text-gray-500"
                        }`}
                    >
                      All Images
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-3 grow-1  h-[60vh] flex  items-center">
              {/* Upload Section */}
              <div className="flex justify-center ">
                <div className="self-end">
                  {showUploadSection && (
                    <div className="cursor-pointer text-center ">
                      <div className="border-2 border-dashed border-(--blue) p-6 rounded-lg  hover:bg-(--blue) transition ">
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            onChange={handleUpload}
                            accept="image/*"
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
                </div>
              </div>

              {/* All Images Section */}
              <div className="flex flex-col px-2 h-[60vh]  custom-scrollbar">
                {showAllImagesSection && (
                  <div className="">
                    <h5 className="mb-4 text-xl lg:text-2xl">All Images</h5>
                    <div className="flex flex-wrap  gap-5">
                      {allImages.map((image, index) => (
                        <div
                          key={index}
                          className={`relative cursor-pointer p-0.5 w-32 ${
                            selectedImageUrl === image.imageUrl
                              ? "border-(--blue) border-4"
                              : "border-gray-700 border"
                          }`}
                          onClick={() => handleImageClick(image.imageUrl)}
                          onMouseEnter={() => setHoveredImage(image.imageUrl)}
                          onMouseLeave={() => setHoveredImage(null)}
                        >
                          <img
                            src={`http://localhost:5300${image.imageUrl}`}
                            alt={`Image ${index + 1}`}
                            className="w-32 h-32 object-contain"
                          />

                          {selectedImageUrl === image.imageUrl && hoverIcons !== image.imageUrl && (
                            <div
                              onMouseEnter={() => setHoverIcons(image.imageUrl)}
                              onMouseLeave={() => setHoverIcons(null)}
                            >
                              <ImCheckboxChecked
                                size={24}
                                className="absolute -top-2.5 cursor-pointer -right-3 bg-(--white) rounded-sm text-(--blue)"
                              />
                            </div>
                          )}

                          {hoverIcons === image.imageUrl && (
                            <div
                              onMouseEnter={() => setHoverIcons(image.imageUrl)}
                              onMouseLeave={() => setHoverIcons(null)}
                            >
                              <GrFormSubtract
                                size={24}
                                className="absolute -top-2.5 cursor-pointer -right-3 bg-(--blue) rounded-sm text-(--white)"
                              />
                            </div>
                          )}

                          {hoveredImage === image.imageUrl && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteImage(image.imageUrl);
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
                )}
              </div>
            </div>

            <div className="col-3 mt-auto">
              <div className="flex items-end text-end gap-3 mt-6 justify-end">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleSetFeaturedImage(selectedImageUrl!)}
                  disabled={!selectedImageUrl}
                  className="btn btn-success cursor-pointer flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Set Featured Image
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </ComponentCard>
  );
};

export default FileInputExample;