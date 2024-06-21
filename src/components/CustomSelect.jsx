import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { toast } from "sonner";
import { usePost } from "@/context/PostContext";
import { useTheme } from "next-themes";

function CustomSelect({ endpoint, placeholder }) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { post, addCategory, removeCategory, addTag, removeTag } = usePost();
  const { theme } = useTheme();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`/api/${endpoint}`);
        if (response.statusText !== "OK") {
          toast.error(response.data.message);
        }
        if (endpoint === "category") {
          setItems(
            response.data.categories.map((item) => ({
              value: item.id,
              label: item.name,
            }))
          );
        } else if (endpoint === "tag") {
          setItems(
            response.data.tags.map((item) => ({
              value: item.id,
              label: item.name,
            }))
          );
        }
        setIsLoading(false);
      } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        toast.error(`Failed to fetch ${endpoint}`);
        setIsLoading(false);
      }
    };

    fetchItems();
  }, [endpoint]);

  const handleSelectionChange = (selectedOptions) => {
    const selectedIds = selectedOptions.map((option) => option.value);
    if (endpoint === "category") {
      post.categoryIds.forEach((id) => {
        if (!selectedIds.includes(id)) {
          removeCategory(id);
        }
      });
      selectedIds.forEach((id) => {
        if (!post.categoryIds.includes(id)) {
          addCategory(id);
        }
      });
    } else if (endpoint === "tag") {
      post.tagIds.forEach((id) => {
        if (!selectedIds.includes(id)) {
          removeTag(id);
        }
      });
      selectedIds.forEach((id) => {
        if (!post.tagIds.includes(id)) {
          addTag(id);
        }
      });
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: theme === "dark" ? "#333" : "#fff",
      color: theme === "dark" ? "#fff" : "#000",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: theme === "dark" ? "#333" : "#fff",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? theme === "dark"
          ? "#444"
          : "#ddd"
        : state.isFocused
        ? theme === "dark"
          ? "#555"
          : "#eee"
        : theme === "dark"
        ? "#333"
        : "#fff",
      color: theme === "dark" ? "#fff" : "#000",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: theme === "dark" ? "#fff" : "#000",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: theme === "dark" ? "#bbb" : "#666",
    }),
  };

  return (
    <Select
      className="w-72"
      isMulti
      isLoading={isLoading}
      options={items}
      value={items.filter((item) =>
        (endpoint === "category" ? post.categoryIds : post.tagIds).includes(
          item.value
        )
      )}
      onChange={handleSelectionChange}
      placeholder={placeholder}
      styles={customStyles}
    />
  );
}

export default CustomSelect;
