"use client";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import React from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "sonner";

function CustomElement({ element, table }) {
  const { onAdd, setOnAdd } = useAppContext();
  const notify = (msg, isSuccess) =>
    isSuccess === true ? toast.success(msg) : toast.error(msg);

  const onDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/${table}`, { data: { id } });
      if (response.status === 200) {
        notify(response.data.message, true);
        setOnAdd(!onAdd);
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      notify("Error deleting category", false);
    }
  };
  return (
    <div className="border rounded py-2 px-4 min-w-48 flex justify-between items-center">
      {element.name}
      <FaTrash
        onClick={() => {
          onDelete(element.id);
        }}
        className="cursor-pointer"
      />
    </div>
  );
}

export default CustomElement;
