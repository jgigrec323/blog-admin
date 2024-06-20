"use client";
import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { CustomDialogCategories } from "@/components/CustomDialogCategories";
import { CustomDialogTags } from "@/components/CustomDialogTags";
import { usePathname, useRouter } from "next/navigation";
import { usePost } from "@/context/PostContext";
import { toast } from "sonner";
import axios from "axios";
import CustomLoader from "@/components/CustomLoader";
import { CustomAlertDialog } from "@/components/CustomAlertDialog";
import { MdDelete } from "react-icons/md";
import { useAppContext } from "@/context/AppContext";

function MainPagesLayout({ children }) {
  const currentPath = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { post, clearPost } = usePost();
  const { onAdd, setOnAdd } = useAppContext();
  const [posts, setPosts] = useState([]);

  const handlePublish = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/posts", post);
      if (response.status === 200) {
        toast.success("Post published successfully");
        clearPost();
      } else {
        toast.error(response.data.error || "Failed to publish post");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while publishing the post");
    } finally {
      setIsLoading(false);
    }
  };
  const handleEdit = async (id) => {
    try {
      setIsLoading(true);
      const response = await axios.put(`/api/posts/${id}`, post);
      if (response.status === 200) {
        toast.success("Post updated successfully");
        clearPost();
        router.back();
      } else {
        toast.error(response.data.error || "Failed to update post");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while updating the post");
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/posts/${id}`);
      if (response.status === 200) {
        toast.success("Post deleted successfully");
        router.push("/posts");
      } else {
        toast.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post");
    }
  };
  const handleDeleteAll = async (id) => {
    try {
      const response = await axios.delete(`/api/posts`);
      if (response.status === 200) {
        toast.success("Post deleted successfully");
        setOnAdd(!onAdd);
      } else {
        toast.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post");
    }
  };
  const renderButton = () => {
    switch (currentPath) {
      case "/categories":
        return (
          <CustomDialogCategories>
            <Button variant="outline">
              <IoIosAdd size={22} className="mr-1" />
              New Category
            </Button>
          </CustomDialogCategories>
        );
      case "/tags":
        return (
          <CustomDialogTags>
            <Button variant="outline">
              <IoIosAdd size={22} className="mr-1" />
              New Tag
            </Button>
          </CustomDialogTags>
        );
      case "/posts":
        return (
          <>
            <CustomAlertDialog id={0} handleDelete={handleDeleteAll}>
              <Button variant="destructive">Delete all</Button>
            </CustomAlertDialog>
            <Button
              className=" ml-2 bg-black text-white"
              onClick={() => {
                router.push("/write");
              }}
            >
              <IoIosAdd size={22} className="mr-1" />
              New Post
            </Button>
          </>
        );
      case "/write":
        return (
          <>
            <Button
              onClick={() => {
                clearPost();
                router.back();
              }}
              className="mr-2 bg-black text-white"
            >
              Back
            </Button>
            <Button onClick={handlePublish} className="bg-green-700 text-white">
              Publish
            </Button>
          </>
        );

      case "/":
        return (
          <Button
            onClick={() => {
              router.push("/dashboard/new"); // Adjust the route for creating new dashboard items if needed
            }}
            variant="outline"
          >
            <IoIosAdd size={22} className="mr-1" />
            New Dashboard Item
          </Button>
        );
      default:
        if (currentPath.match(/^\/write\/\d+\/edit$/)) {
          const id = parseInt(currentPath.split("/")[2]);

          return (
            <>
              <Button
                onClick={() => {
                  clearPost();
                  router.back();
                }}
                className="mr-2 bg-black text-white"
              >
                Back
              </Button>
              <Button
                onClick={() => {
                  handleEdit(id);
                }}
                className="bg-green-700 text-white"
              >
                Save
              </Button>
            </>
          );
        } else if (currentPath.match(/^\/write\/\d+\/view$/)) {
          const id = parseInt(currentPath.split("/")[2]);
          return (
            <>
              <Button
                onClick={() => router.back()}
                className="mr-2 bg-black text-white"
              >
                Back
              </Button>
              <Button
                onClick={() => {
                  router.push(`/write/${id}/edit`);
                }}
                className="mr-2 bg-green-700 text-white"
              >
                Edit
              </Button>
              <CustomAlertDialog id={id} handleDelete={handleDelete}>
                <Button variant="destructive">Delete</Button>
              </CustomAlertDialog>
            </>
          );
        }
        return (
          <Button
            onClick={() => {
              router.push("/write");
            }}
            variant="outline"
          >
            <IoIosAdd size={22} className="mr-1" />
            New
          </Button>
        );
    }
  };

  return (
    <div className="">
      {isLoading && <CustomLoader></CustomLoader>}
      <div className="flex justify-end">{renderButton()}</div>
      <div>{children}</div>
    </div>
  );
}

export default MainPagesLayout;
