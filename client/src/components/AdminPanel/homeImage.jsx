import React, { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const HomeImage = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [uploadedImage, setUploadedImage] = useState(null);
const entityCode = localStorage.getItem("entityCode");

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please upload an image file");
    }
  };

  

 const handleUpload = async () => {
   if (!image) {
     toast.warning("Please select an image first");
     return;
   }

   const formData = new FormData();
   formData.append("image", image);
   formData.append("ENTITY_CODE", entityCode);

   //    try {
   //      const response = await axios.post(
   //        "http://localhost:2002/api/upload-home-image",
   //        formData,
   //        {
   //          headers: {
   //            "Content-Type": "multipart/form-data",
   //            "entity-code": entityCode,
   //            "user-id": localStorage.getItem("userId")
   //          }
   //        }
   //      );

   //      if (response.data.success) {
   //        toast.success("Image uploaded successfully");
   //        setImage(null);
   //        setPreview(null);
   //      }
   //    } catch (error) {
   //      toast.error(error.response?.data?.message || "Failed to upload image");
   //      console.error("Upload error:", error);
   //    }
   //  };
   try {
     const response = await axios.post(
       "http://localhost:2002/upload-home-image",
       formData,
       {
         headers: {
           "Content-Type": "multipart/form-data",
           "entity-code": entityCode,
           "user-id": localStorage.getItem("userId")
         }
       }
     );

     if (response.data.success) {
       toast.success("Image uploaded successfully");
       setUploadedImage(response.data.data);
       setImage(null);
       setPreview(null);
     }
   } catch (error) {
     toast.error(error.response?.data?.message || "Failed to upload image");
     console.error("Upload error:", error);
   }
 };


   
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Home Page Image Upload
      </h2>

      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"}
          ${preview ? "h-auto" : "h-64"}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileInput}
        />

        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="max-h-64 mx-auto rounded-lg"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setImage(null);
                setPreview(null);
              }}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
            >
              ✕
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <svg
              className="w-12 h-12 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-gray-600 mb-2">
              Drag and drop your image here or click to select
            </p>
            <p className="text-sm text-gray-500">
              Supports: JPG, PNG, GIF (Max 5MB)
            </p>
          </div>
        )}
      </div>

      {image && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleUpload}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Upload Image
          </button>
        </div>
      )}
      {uploadedImage && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800">
            Upload Successful
          </h3>
          <div className="mt-2 text-sm text-green-700">
            <p>Location: {uploadedImage.Location}</p>
            <p>Key: {uploadedImage.Key}</p>
            <p>Bucket: {uploadedImage.Bucket}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeImage;
