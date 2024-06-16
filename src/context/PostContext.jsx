// context/PostContext.js
"use client";
import { createContext, useContext, useState } from "react";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [post, setPost] = useState({
    title: "",
    content: "",
    categoryIds: [],
    tagIds: [],
    imageUrls: [],
    published: false,
  });

  const updatePost = (updates) => {
    setPost((prevPost) => ({ ...prevPost, ...updates }));
  };

  const addCategory = (categoryId) => {
    setPost((prevPost) => ({
      ...prevPost,
      categoryIds: [...prevPost.categoryIds, categoryId],
    }));
  };

  const removeCategory = (categoryId) => {
    setPost((prevPost) => ({
      ...prevPost,
      categoryIds: prevPost.categoryIds.filter((id) => id !== categoryId),
    }));
  };

  const addTag = (tagId) => {
    setPost((prevPost) => ({
      ...prevPost,
      tagIds: [...prevPost.tagIds, tagId],
    }));
  };

  const removeTag = (tagId) => {
    setPost((prevPost) => ({
      ...prevPost,
      tagIds: prevPost.tagIds.filter((id) => id !== tagId),
    }));
  };

  return (
    <PostContext.Provider
      value={{
        post,
        updatePost,
        addCategory,
        removeCategory,
        addTag,
        removeTag,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => useContext(PostContext);
