"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import DOMPurify from "dompurify";
import { CustomAlertDialog } from "@/components/CustomAlertDialog";
import { MdDelete } from "react-icons/md";

const Comments = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sanitizedContent = (content) =>
    DOMPurify.sanitize(content, {
      ALLOWED_ATTR: ["href", "title", "target", "src", "alt"],
      ALLOWED_TAGS: [
        "a",
        "b",
        "i",
        "em",

        "u",
        "p",
        "br",
        "ul",
        "ol",
        "li",
        "img",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
      ],
    });

  const notify = (msg, isSuccess) =>
    isSuccess ? toast.success(msg) : toast.error(msg);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/posts");
        if (response.statusText !== "OK") {
          notify(response.data.message, false);
          return;
        }
        setPosts(response.data.posts);
        notify(response.data.message, true);
      } catch (error) {
        console.error("Error fetching posts:", error);
        notify("Failed to fetch posts", false);
      }
    };
    fetchPosts();
  }, []);

  const onPostSelect = async (postId) => {
    setSelectedPostId(postId);
    setComments([]);
    setIsLoading(true);

    try {
      const response = await axios.get(`/api/comments/${postId}`);
      if (response.statusText !== "OK") {
        notify(response.data.message, false);
        return;
      }
      setComments(response.data.comments || []);
      notify(response.data.message, true);
    } catch (error) {
      console.error("Error fetching comments:", error);
      notify("Failed to fetch comments", false);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const response = await axios.delete(`/api/comments/${commentId}`);
      if (response.statusText !== "OK") {
        notify(response.data.message, false);
        return;
      }
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
      notify("Comment deleted successfully", true);
    } catch (error) {
      console.error("Error deleting comment:", error);
      notify("Failed to delete comment", false);
    }
  };

  return (
    <div className="flex gap-5 mt-10">
      <div className="border rounded-md p-5 h-full w-1/3">
        <h5 className="text-lg font-bold mb-4">Posts</h5>
        <div className="mt-5">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post.id}
                className={`p-2 rounded-sm cursor-pointer border-b border-gray-300 pb-4 mb-4 transition duration-300 ease-in-out ${
                  selectedPostId === post.id
                    ? "bg-gray-200 dark:bg-gray-700 opacity-100"
                    : "opacity-75 hover:opacity-100"
                }`}
                onClick={() => onPostSelect(post.id)}
              >
                <h3 className="font-bold text-lg text-dgreen">{post.title}</h3>
                <p
                  className="text-gray-600 dark:text-gray-400"
                  dangerouslySetInnerHTML={{
                    __html: sanitizedContent(post?.content.substring(0, 200)),
                  }}
                ></p>
              </div>
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      </div>
      <div className="border rounded-md p-5 flex-grow">
        <h5 className="text-lg font-bold mb-4">Comments</h5>
        <div className="relative mt-5">
          {isLoading ? (
            <p>Loading comments...</p>
          ) : comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="border-b border-gray-300 pb-4 mb-4 relative"
              >
                <h4 className="font-bold text-dgreen">{comment.author}</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {comment.content}
                </p>
                <p className="text-gray-500 dark:text-gray-300 text-sm">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
                <CustomAlertDialog
                  msg={"comment "}
                  id={comment.id}
                  handleDelete={deleteComment}
                >
                  <MdDelete
                    size={22}
                    className="absolute cursor-pointer top-2 right-2 text-red-500 hover:text-red-700 transition duration-300"
                  />
                </CustomAlertDialog>
              </div>
            ))
          ) : (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              No comments or choose a post
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
