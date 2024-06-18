"use client";
import { Badge } from "@/components/ui/badge";
import { usePost } from "@/context/PostContext";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function View({ params }) {
  const { id } = params;
  const { post, setPost } = usePost();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get(`/api/posts/${id}`);
          if (response.status === 200) {
            const fetchedPost = response.data.post;
            setPost({
              title: fetchedPost.title,
              content: fetchedPost.content,
              categoryIds: fetchedPost.categories.map((cat) => cat.id),
              tagIds: fetchedPost.tags.map((tag) => tag.id),
              imageUrls: fetchedPost.images.map((img) => img.url),
              published: fetchedPost.published,
            });
            console.log(fetchedPost);
            setCategories(fetchedPost.categories);
            setTags(fetchedPost.tags);
          }
        } catch (error) {
          console.error("Error fetching post:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchPost();
    }
  }, [id, setPost]);
  return (
    <div className="mt-10">
      <div>
        {!isLoading && post.imageUrls && post.imageUrls.length > 0 ? (
          <Image
            src={post.imageUrls[0]}
            alt={post.title}
            width={800}
            height={600}
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        ) : (
          "No Image"
        )}
      </div>
      <div className="my-4">
        <h1 className="text-4xl font-bold">{post.title}</h1>
      </div>
      <div className="flex items-center gap-10">
        <div className="">
          {categories.map((category, index) => (
            <Badge key={index} variant="outline">
              {category.name}
            </Badge>
          ))}
        </div>
        <div>
          {tags.length > 0 ? (
            tags.map((tag, index) => (
              <Badge key={index} variant="outline">
                {tag.name}
              </Badge>
            ))
          ) : (
            <span>No Tags</span>
          )}
        </div>
      </div>
      <div className="mt-10">
        <div
          dangerouslySetInnerHTML={{ __html: post.content }}
          className="prose lg:prose-xl"
        />
      </div>
    </div>
  );
}

export default View;
