"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import Title from "@/components/Title";
import DataTable from "@/components/DataTable";
import { useAppContext } from "@/context/AppContext";
import { MdModeEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Select } from "@/components/ui/select";
import CustomSelectSingle from "@/components/CustomSelectSingle";
import { Input } from "@/components/ui/input";
import CustomLoader from "@/components/CustomLoader";
function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filterType, setFilterType] = useState("title");
  const [filterValue, setFilterValue] = useState("");
  const { onAdd, setOnAdd } = useAppContext();

  const notify = (msg, isSuccess) =>
    isSuccess === true ? toast.success(msg) : toast.error(msg);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/posts");
        if (response.statusText !== "OK") {
          notify(response.data.message, false);
          return;
        }
        setPosts(response.data.posts);
        setIsLoading(false);
        notify(response.data.message, true);
      } catch (error) {
        console.error("Error fetching posts:", error);
        notify("Failed to fetch posts", false);
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [onAdd]);

  const handleFilterTypeChange = (option) => {
    setFilterType(option);
    setFilterValue(""); // Reset filter value when filter type changes
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleFilterValueChange = (e) => {
    setFilterValue(e.target.value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredPosts = posts.filter((post) => {
    if (filterType === "title") {
      return post.title.toLowerCase().includes(filterValue.toLowerCase());
    } else if (filterType === "content") {
      return post.content.toLowerCase().includes(filterValue.toLowerCase());
    } else if (filterType === "categories") {
      return post.categories.some((category) =>
        category.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    } else if (filterType === "tags") {
      return post.tags.some((tag) =>
        tag.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return true;
  });

  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    { title: "ID", key: "id" },
    { title: "Title", key: "title" },
    { title: "Content", key: "content", width: 400 },
    {
      title: "Created At",
      key: "createdAt",
      custom: (post) => new Date(post.createdAt).toLocaleString(),
    },
    {
      title: "Categories",
      key: "categories",
      custom: (post) =>
        post.categories.map((category) => category.name).join(", "),
    },
    {
      title: "Tags",
      key: "tags",
      custom: (post) => post.tags.map((tag) => tag.name).join(", "),
    },
    {
      title: "Image",
      key: "images",
      custom: (post) =>
        post.images.length > 0 ? (
          <img src={post.images[0].url} alt={post.title} width="100" />
        ) : (
          "No Image"
        ),
    },
    {
      title: "Actions",
      key: "actions",
      custom: (post) => (
        <div className="flex items-center gap-2">
          <FaEye size={22} />
          <MdModeEdit size={22} />
          <MdDelete size={22} className="text-red-500" />
        </div>
      ),
    },
  ];

  return (
    <div>
      <Title>Posts</Title>
      <div className="flex items-center gap-2 mt-5 mb-2">
        <CustomSelectSingle
          value={filterType}
          placeholder={"Select a filter"}
          options={["title", "content", "categories", "tags"]}
          onChange={handleFilterTypeChange}
        ></CustomSelectSingle>
        <Input
          value={filterValue}
          type="text"
          onChange={handleFilterValueChange}
          placeholder={`Filter by ${filterType}`}
        ></Input>
      </div>
      <div className="relative">
        {isLoading && <CustomLoader></CustomLoader>}
        <DataTable
          data={paginatedPosts}
          columns={columns}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredPosts.length}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Posts;
