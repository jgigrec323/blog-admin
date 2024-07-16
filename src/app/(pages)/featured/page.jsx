"use client";
import CustomLoader from "@/components/CustomLoader";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const FeaturedPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { onAdd, setOnAdd } = useAppContext();
  const notify = (msg, isSuccess) =>
    isSuccess === true ? toast.success(msg) : toast.error(msg);

  const handleFeature = async (id) => {
    try {
      const response = await axios.put(`/api/featured-posts/${id}`);
      if (response.status === 200) {
        notify("Post updated successfully", true);
        setOnAdd(!onAdd);
      } else {
        notify("Failed to delete post", false);
      }
    } catch (error) {
      console.error("Error updating post:", error);
      notify("Failed to update post", false);
    }
  };

  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      try {
        const response = await axios.get("/api/featured-posts");
        console.log(response);
        if (response.statusText !== "OK") {
          notify(response.data.message, false);
        }
        setPosts(response.data.post);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        notify("Failed to fetch posts", false);
        setIsLoading(false);
      }
    };

    fetchFeaturedPosts();
  }, [onAdd]);

  return (
    <div>
      <Title>Featured Posts</Title>
      <div className="relative " style={{ height: `calc(100vh - 15rem)` }}>
        {isLoading ? (
          <CustomLoader></CustomLoader>
        ) : posts.length === 0 ? (
          "Nothing found ! Start by adding featured posts"
        ) : (
          <ul className="flex flex-wrap gap-4 mt-4 ">
            {posts.map((post) => (
              <div
                className="rounded-md border p-5 flex justify-between gap-5 "
                key={post.id}
              >
                {post.images.length > 0 ? (
                  <Image
                    src={post.images[0].url}
                    alt={post.title}
                    width={200}
                    height={200}
                  />
                ) : (
                  "No Image"
                )}

                <div>
                  <h3 className="mb-3">{post.title}</h3>
                  <Button onClick={() => handleFeature(post.id)}>
                    Unfeature
                  </Button>
                </div>
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FeaturedPosts;
