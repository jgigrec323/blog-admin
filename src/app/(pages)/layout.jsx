"use client";
import React from "react";
import { IoIosAdd } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { CustomDialogCategories } from "@/components/CustomDialogCategories";
import { CustomDialogTags } from "@/components/CustomDialogTags";
import { usePathname, useRouter } from "next/navigation";
import { usePost } from "@/context/PostContext";

function MainPagesLayout({ children }) {
  const currentPath = usePathname();
  const router = useRouter();
  const { post, updatePost } = usePost();

  const handlePublish = async () => {
    try {
      const response = await axios.post("/api/posts", post);
      if (response.status === 200) {
        toast.success("Post published successfully");
      } else {
        toast.error(response.data.error || "Failed to publish post");
      }
    } catch (error) {
      toast.error("An error occurred while publishing the post");
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
          <Button
            onClick={() => {
              router.push("/write");
            }}
            variant="outline"
          >
            <IoIosAdd size={22} className="mr-1" />
            New Post
          </Button>
        );
      case "/write":
        return (
          <Button
            onClick={handlePublish}
            variant="outline"
            className="bg-green-700 text-white"
          >
            Publish
          </Button>
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
      <div className="flex justify-end">{renderButton()}</div>
      <div>{children}</div>
    </div>
  );
}

export default MainPagesLayout;
