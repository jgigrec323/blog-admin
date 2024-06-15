"use client";
import CustomElement from "@/components/CustomElement";
import CustomLoader from "@/components/CustomLoader";
import Title from "@/components/Title";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function Tags() {
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { onAdd, setOnAdd } = useAppContext();
  const notify = (msg, isSuccess) =>
    isSuccess === true ? toast.success(msg) : toast.error(msg);
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get("/api/tag");
        console.log(response);
        if (response.statusText !== "OK") {
          notify(response.data.message, false);
        }
        setTags(response.data.tags);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching tags:", error);
        notify("Failed to fetch tags", false);
        setIsLoading(false);
      }
    };

    fetchTags();
  }, [onAdd]);
  return (
    <div>
      <Title>Tags</Title>
      <div className="relative " style={{ height: `calc(100vh - 15rem)` }}>
        {isLoading ? (
          <CustomLoader></CustomLoader>
        ) : tags.length === 0 ? (
          "Nothing found ! Start by adding a new tag"
        ) : (
          <ul className="flex flex-wrap gap-4 mt-4 ">
            {tags.map((tag) => (
              <>
                <CustomElement
                  key={tag.id}
                  element={tag}
                  table={"tag"}
                ></CustomElement>
              </>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Tags;
