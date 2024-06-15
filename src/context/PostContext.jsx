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

  return (
    <PostContext.Provider value={{ post, updatePost }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => useContext(PostContext);
