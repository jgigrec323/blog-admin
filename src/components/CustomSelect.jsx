import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { toast } from "sonner";

function CustomSelect({
  endpoint,
  selectedItems,
  setSelectedItems,
  placeholder,
}) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <Select
      className="w-72"
      isMulti
      isLoading={isLoading}
      options={items}
      value={selectedItems}
      onChange={setSelectedItems}
      placeholder={placeholder}
    />
  );
}

export default CustomSelect;
