"use client";
import React, { useState } from "react";
import axios from "axios";
import { usePost } from "@/context/PostContext";
import { toast } from "sonner";
import { Button } from "./ui/button";

const ImageUpload = () => {
  const { addImage } = usePost();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return; // Check if a file is selected before upload

    const formData = new FormData();
    formData.append("image", selectedFile); // Use a single key for one image

    for (var key of formData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }
    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.success("Image uploaded successfully");
        addImage(response.data.imageUrl);
      } else {
        toast.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <Button variant="secondary" onClick={handleUpload}>
        Upload Image
      </Button>
    </div>
  );
};

export default ImageUpload;
