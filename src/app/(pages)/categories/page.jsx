"use client";
import CustomElement from "@/components/CustomElement";
import CustomLoader from "@/components/CustomLoader";
import Title from "@/components/Title";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { onAdd, setOnAdd } = useAppContext();
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
  }, [onAdd]);
  return (
    <div>
      <Title>Categories</Title>
      <div className="relative " style={{ height: `calc(100vh - 15rem)` }}>
        {isLoading ? (
          <CustomLoader></CustomLoader>
        ) : categories.length === 0 ? (
          "Nothing found ! Start by adding a new category"
        ) : (
          <ul className="flex flex-wrap gap-4 mt-4 ">
            {categories.map((tag) => (
              <>
                <CustomElement
                  key={tag.id}
                  element={tag}
                  table={"category"}
                ></CustomElement>
              </>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Categories;
