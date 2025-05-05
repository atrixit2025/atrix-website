import React, { useState, useEffect } from "react";
import { Modal } from "../../ui/modal";
import Button from "../../ui/button/Button";
import { FaTrash, FaUpload } from "react-icons/fa";
import { ImCheckboxChecked } from "react-icons/im";
import { GrFormSubtract } from "react-icons/gr";
import axios from "axios";
import ComponentCard from "../../common/ComponentCard";

// Type definitions
type FileItem = {
  id: string;
  url: string;
  type: 'image' | 'video';
  name: string;
};

type FileManagerProps = {
  onFileUpload: (fileUrl: string | null, fileType?: string) => void;
  fileId?: string | null;
  fileUrl?: string | null;
  // Layout options
  variant?: 'card' | 'compact';
  // Labels
  title?: string;
  uploadButtonText?: string;
  modalTitle?: string;
  setButtonText?: string;
  // Restrictions
  allowedTypes?: ('image' | 'video')[];
  maxSize?: number; // in MB
};

const FileManagerComponent: React.FC<FileManagerProps> = ({
  onFileUpload,
  fileId,
  fileUrl,
  variant = 'card',
  title = 'Featured Media',
  uploadButtonText = 'Set Featured Media',
  modalTitle = 'Select Media',
  setButtonText = 'Set Selected Media',
  allowedTypes = ['image', 'video'],
  maxSize = 10,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showUploadSection, setShowUploadSection] = useState(true);
  const [allFiles, setAllFiles] = useState<FileItem[]>([]);
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);
  const [hoveredFile, setHoveredFile] = useState<string | null>(null);
  const [hoverIcons, setHoverIcons] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Supported file extensions
  const supportedExtensions = {
    image: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
    video: ['.mp4', '.webm', '.ogg'],
  };

  // Fetch all files from server
  const fetchAllFiles = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:5300/files/get");
      
      if (response.data?.files) {
        const files = response.data.files.map((item: any) => ({
          id: item._id,
          url: item.file,
          type: getFileType(item.file),
          name: item.name || "Untitled",
        }));

        // Filter by allowed types if specified
        const filteredFiles = allowedTypes 
          ? files.filter(file => allowedTypes.includes(file.type))
          : files;
        
        setAllFiles(filteredFiles);
      }
    } catch (error) {
      console.error("Error fetching files:", error);
      setError("Failed to load files. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Determine file type from URL
  const getFileType = (url: string): 'image' | 'video' => {
    const extension = url.substring(url.lastIndexOf('.')).toLowerCase();
    return supportedExtensions.video.includes(extension) ? 'video' : 'image';
  };

  // Initialize with existing file
  useEffect(() => {
    if (fileUrl) {
      setSelectedFileUrl(fileUrl);
    } else if (fileId) {
      const fetchFileData = async () => {
        try {
          const response = await axios.get(`http://localhost:5300/files/get/${fileId}`);
          const fileData = response.data?.file;
          if (fileData) {
            setSelectedFileUrl(fileData.url);
          }
        } catch (error) {
          console.error("Error fetching file data:", error);
        }
      };
      fetchFileData();
    }
  }, [fileId, fileUrl]);

  // Handle file upload
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    // Reset previous errors
    setError(null);
    setIsLoading(true);
  
    // Validate file type
    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    const isValidType = 
      (allowedTypes.includes('image') && supportedExtensions.image.includes(fileExtension)) ||
      (allowedTypes.includes('video') && supportedExtensions.video.includes(fileExtension));
  
    if (!isValidType) {
      setError(`Unsupported file type. Allowed: ${allowedTypes.join(', ')}`);
      setIsLoading(false);
      return;
    }
  
    // Validate file size
    if (maxSize && file.size > maxSize * 1024 * 1024) {
      setError(`File too large. Max size: ${maxSize}MB`);
      setIsLoading(false);
      return;
    }
  
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await axios.post("http://localhost:5300/files/add", formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
        },
        // Add timeout if needed
        timeout: 30000, // 30 seconds
      });
  
      if (response.data?.file) {
        setShowUploadSection(false);
        await fetchAllFiles(); // Refresh the file list
        setSelectedFileUrl(response.data.file.url);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      
      // More detailed error handling
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Server responded with error status
          setError(error.response.data.message || "Server error during upload");
        } else if (error.request) {
          // Request was made but no response received
          setError("No response from server. Check your connection.");
        } else {
          // Something happened in setting up the request
          setError("Error setting up upload request");
        }
      } else {
        // Non-Axios error
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle file deletion
  const handleDeleteFile = async (fileUrl: string) => {
    try {
      await axios.delete("http://localhost:5300/files/delete", {
        data: { fileUrl }
      });

      setAllFiles(prev => prev.filter(f => f.url !== fileUrl));

      if (selectedFileUrl === fileUrl) {
        setSelectedFileUrl(null);
        onFileUpload(null);
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      setError("Failed to delete file. Please try again.");
    }
  };

  // Set selected file
  const handleSetFeaturedFile = (fileUrl: string | null) => {
    if (!fileUrl) {
      onFileUpload(null);
      closeModal();
      return;
    }

    const fileData = allFiles.find(file => file.url === fileUrl);
    if (fileData) {
      onFileUpload(fileData.url, fileData.type);
      closeModal();
    }
  };

  // Remove current file
  const handleRemoveFile = () => {
    setSelectedFileUrl(null);
    onFileUpload(null);
  };

  // Modal controls
  const openModal = () => {
    setIsOpen(true);
    setIsFullscreen(false);
    setShowUploadSection(true);
    setSelectedFileUrl(null);
    fetchAllFiles();
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsFullscreen(false);
    setError(null);
  };

  // Render file preview
  const renderFilePreview = (url: string) => {
    const type = getFileType(url);
    
    return type === 'video' ? (
      <video controls className="w-full h-full object-contain">
        <source src={`http://localhost:5300${url}`} type={`video/${url.split('.').pop()}`} />
        Your browser does not support the video tag.
      </video>
    ) : (
      <img
        src={`http://localhost:5300${url}`}
        alt="Preview"
        className="w-full h-full object-contain"
        onError={(e) => {
          e.currentTarget.src = '/images/default-media.jpg';
        }}
      />
    );
  };

  // Main render
  if (variant === 'card') {
    return (
      <ComponentCard title={title}>
        <div>
          {selectedFileUrl ? (
            <div className="flex flex-col items-center">
              {renderFilePreview(selectedFileUrl)}
              <button
                onClick={handleRemoveFile}
                className="mt-2 text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ) : (
            <p className="text-blue-500 cursor-pointer underline" onClick={openModal}>
              {uploadButtonText}
            </p>
          )}

          <Modal
            isOpen={isOpen}
            onClose={closeModal}
            className={isFullscreen ? "w-[80%] h-full" : "container mx-auto max-w-[1850px] p-6 bg-black"}
            isFullscreen={isFullscreen}
          >
            {/* Modal content - same as below */}
            {renderModalContent()}
          </Modal>
        </div>
      </ComponentCard>
    );
  }

  // Compact variant
  return (
    <div>
      {selectedFileUrl ? (
        <div className="flex flex-col relative">
          <div className="relative">
            {renderFilePreview(selectedFileUrl)}
            <button
              onClick={handleRemoveFile}
              className="absolute cursor-pointer top-1.5 left-1.5 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600"
            >
              <FaTrash size={14} />
            </button>
          </div>
        </div>
      ) : (
        <button onClick={openModal} className="border-blue-500 border px-4 py-2 text-blue-500 rounded-lg">
          {uploadButtonText}
        </button>
      )}

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className={isFullscreen ? "w-[80%] h-full" : "container mx-auto max-w-[1850px] w-[80%] p-6 bg-black"}
        isFullscreen={isFullscreen}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );

  // Shared modal content
  function renderModalContent() {
    return (
      <div className="row flex flex-col flex-wrap">
        <div className="col-3 grow-0 shrink-0">
          <h1 className="text-2xl font-bold mb-10">{modalTitle}</h1>

          <div className="border-b border-darkblack mb-5">
            <div className="flex justify-between">
              <div className="flex items-center gap-10 mb-3">
                <button
                  onClick={() => {
                    setShowUploadSection(true);
                    setError(null);
                  }}
                  className={`text-lg cursor-pointer font-bold ${
                    showUploadSection
                      ? "text-white border-2 bg-blue-500 rounded-sm border-blue-500 px-2 py-2"
                      : "text-gray-500"
                  }`}
                >
                  Upload Media
                </button>
                <button
                  onClick={() => {
                    setShowUploadSection(false);
                    setError(null);
                  }}
                  className={`text-lg cursor-pointer font-bold ${
                    !showUploadSection
                      ? "text-white border-2 bg-blue-500 rounded-sm border-blue-500 px-2 py-2"
                      : "text-gray-500"
                  }`}
                >
                  All Media
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-3">
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          {showUploadSection ? (
            <div className="cursor-pointer text-center h-[60vh] flex justify-center items-center">
              <div className="border-2 border-dashed border-blue-500 p-6 rounded-lg hover:bg-blue-50 transition">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    onChange={handleUpload}
                    accept={allowedTypes.map(type => 
                      supportedExtensions[type].map(ext => `*${ext}`).join(',')
                    ).join(',')}
                    className="hidden"
                    disabled={isLoading}
                  />
                  <div className="flex flex-col items-center">
                    <FaUpload className="text-blue-500 text-3xl" />
                    <p className="text-blue-500 font-bold">
                      {isLoading ? 'Uploading...' : 'Click to upload or drag & drop'}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Allowed: {allowedTypes.join(', ')} | Max: {maxSize}MB
                    </p>
                  </div>
                </label>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex-col px-2 h-[60vh] overflow-y-auto">
              <h5 className="mb-4 text-xl lg:text-2xl">All Media</h5>
              {isLoading ? (
                <div className="flex justify-center items-center h-full">
                  <p>Loading media...</p>
                </div>
              ) : allFiles.length === 0 ? (
                <div className="flex justify-center items-center h-full">
                  <p>No media files found</p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-5">
                  {allFiles.map((file) => (
                    <div
                      key={file.id}
                      className={`relative cursor-pointer p-0.5 w-32 ${
                        selectedFileUrl === file.url
                          ? "border-blue-500 outline-4 outline-blue-500"
                          : "border-gray-700 border"
                      }`}
                      onClick={() => setSelectedFileUrl(file.url)}
                      onMouseEnter={() => setHoveredFile(file.url)}
                      onMouseLeave={() => setHoveredFile(null)}
                    >
                      <div className="w-32 h-32 flex items-center justify-center bg-gray-100">
                        {renderFilePreview(file.url)}
                      </div>

                      {selectedFileUrl === file.url && hoverIcons !== file.url && (
                        <div
                          onMouseEnter={() => setHoverIcons(file.url)}
                          onMouseLeave={() => setHoverIcons(null)}
                        >
                          <ImCheckboxChecked
                            size={24}
                            className="absolute -top-2.5 cursor-pointer -right-3 bg-white rounded-sm text-blue-500"
                          />
                        </div>
                      )}

                      {hoverIcons === file.url && (
                        <div
                          onMouseEnter={() => setHoverIcons(file.url)}
                          onMouseLeave={() => setHoverIcons(null)}
                        >
                          <GrFormSubtract
                            size={24}
                            className="absolute -top-2.5 cursor-pointer -right-3 bg-blue-500 rounded-sm text-white"
                          />
                        </div>
                      )}

                      {hoveredFile === file.url && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteFile(file.url);
                          }}
                          className="absolute bottom-2 cursor-pointer right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <FaTrash size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="col-3 mt-auto">
          <div className="flex items-end text-end gap-3 mt-6 justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleSetFeaturedFile(selectedFileUrl)}
              disabled={!selectedFileUrl || isLoading}
              className="btn btn-success cursor-pointer flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {setButtonText}
            </Button>
          </div>
        </div>
      </div>
    );
  }
};

export default FileManagerComponent;