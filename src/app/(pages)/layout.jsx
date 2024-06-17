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

function MainPagesLayout({ children }) {
  const currentPath = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { post, clearPost } = usePost();

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
          <>
            <Button
              onClick={() => router.back()}
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
