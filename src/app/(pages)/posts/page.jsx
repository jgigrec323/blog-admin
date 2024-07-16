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
import CustomSelectSingle from "@/components/CustomSelectSingle";
import { Input } from "@/components/ui/input";
import CustomLoader from "@/components/CustomLoader";
import Image from "next/image";
import { CustomAlertDialog } from "@/components/CustomAlertDialog";
import { useRouter } from "next/navigation";
import { BsBookmarkStarFill } from "react-icons/bs";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filterType, setFilterType] = useState("title");
  const [filterValue, setFilterValue] = useState("");
  const { onAdd, setOnAdd } = useAppContext();
  const router = useRouter();

  const notify = (msg, isSuccess) =>
    isSuccess === true ? toast.success(msg) : toast.error(msg);
  //TODO:AFFICHER BTNS PAGINATION SI ON A 10 & LIMITER LE NOMBRE DE TRUC DANS CONTENT
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

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/posts/${id}`);
      if (response.status === 200) {
        notify("Post deleted successfully", true);
        setPosts(posts.filter((post) => post.id !== id));
      } else {
        notify("Failed to delete post", false);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      notify("Failed to delete post", false);
    }
  };

  const handleEdit = (id) => {
    router.push(`/write/${id}/edit`);
  };

  const handleView = (id) => {
    router.push(`/write/${id}/view`);
  };
  const handleFeature = async (id) => {
    try {
      const response = await axios.put(`/api/featured-posts/${id}`);
      if (response.status === 200) {
        notify("Post updated successfully", true);
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === id ? { ...post, isFeatured: !post.isFeatured } : post
          )
        );
      } else {
        notify("Failed to delete post", false);
      }
    } catch (error) {
      console.error("Error updating post:", error);
      notify("Failed to update post", false);
    }
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
    {
      title: "Content",
      key: "content",
      width: 400,
      custom: (post) => {
        const content = post.content;
        const maxCharLength = 300; // Adjust the maximum character length as needed

        if (content.length <= maxCharLength) {
          return content;
        }

        // Truncate content with an ellipsis for longer content
        const truncatedContent = `${content.substring(0, maxCharLength)}...`;

        // Optionally, display a tooltip with the full content on hover
        return (
          <div title={content} className="cursor-pointer">
            {truncatedContent}
          </div>
        );
      },
    },
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
          <Image
            src={post.images[0].url}
            alt={post.title}
            width={100}
            height={100}
          />
        ) : (
          "No Image"
        ),
    },
    {
      title: "Actions",
      key: "actions",
      custom: (post) => (
        <div className="flex items-center gap-2">
          <FaEye
            size={22}
            className="cursor-pointer"
            onClick={() => handleView(post.id)}
          />
          <MdModeEdit
            size={22}
            className="cursor-pointer"
            onClick={() => handleEdit(post.id)}
          />
          <CustomAlertDialog id={post.id} handleDelete={handleDelete}>
            <MdDelete size={22} className="text-red-500 cursor-pointer" />
          </CustomAlertDialog>
          <BsBookmarkStarFill
            size={22}
            className={`cursor-pointer ${post.isFeatured && "text-yellow-600"}`}
            onClick={() => handleFeature(post.id)}
          />
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
