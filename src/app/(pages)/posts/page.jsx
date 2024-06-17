"use client";
import DataTable from "@/components/DataTable";
import Title from "@/components/Title";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { MdModeEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
        console.log(response.data.posts);
        notify(response.data.message, true);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        notify("Failed to fetch posts", false);
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [onAdd]);

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
      title: "Actions",
      key: "actions",
      custom: () => {
        return (
          <div className="flex items-center gap-2">
            <FaEye size={22} />
            <MdModeEdit size={22} />
            <MdDelete size={22} className="text-red-500" />
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Title>Posts</Title>
      <div className="relative" style={{ height: `calc(100vh - 15rem)` }}>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <DataTable data={posts} columns={columns} />
        )}
      </div>
    </div>
  );
}

export default Posts;
