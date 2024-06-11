"use client";
import Title from "@/components/Title";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const notify = (msg, isSuccess) =>
    isSuccess === true ? toast.success(msg) : toast.error(msg);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/category");
        console.log(response);
        if (response.statusText !== "OK") {
          notify(response.data.message, false);
        }
        setCategories(response.data.categories);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        notify("Failed to fetch categories", false);
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);
  return (
    <div>
      <Title>Categories</Title>
      <hr />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {categories.map((category) => (
            <li key={category.id}>{category.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Categories;
