"use client";
import Title from "@/components/Title";
import React, { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegImage } from "react-icons/fa6";
import { BiSolidVideos } from "react-icons/bi";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import "@/styles/write.css";
import CustomSelect from "@/components/CustomSelect";
import { usePost } from "@/context/PostContext";
import ImageUpload from "@/components/ImageUpload";

// Dynamically import ReactQuill to ensure it only loads on the client
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

function Write() {
  const [open, setOpen] = useState(false);
  const [imgOpen, setImgOpen] = useState(false);
  const [value, setValue] = useState("");
  const { post, updatePost, setPost } = usePost();

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ["clean"],
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  useEffect(() => {
    setPost({
      title: "",
      content: "",
      categoryIds: [],
      tagIds: [],
      imageUrls: [],
      published: false,
    });
  }, [setPost]);

  return (
    <div>
      <div className="mt-10 relative">
        <input
          type="text"
          className="border-0 outline-none bg-transparent text-5xl w-full"
          placeholder="Title"
          value={post.title}
          onChange={(e) => updatePost({ title: e.target.value })}
        />
        <div className="my-5 flex items-center gap-10">
          <IoIosAddCircleOutline size={30} onClick={() => setOpen(!open)} />
          {open && (
            <div className="flex gap-5 items-center">
              <FaRegImage onClick={() => setImgOpen(!imgOpen)} />
              {imgOpen && <ImageUpload />}
              <BiSolidVideos size={25} />
            </div>
          )}
          <div className="flex gap-5">
            <CustomSelect
              endpoint="category"
              placeholder="Select categories..."
            />
            <CustomSelect endpoint="tag" placeholder="Select tags..." />
          </div>
        </div>
        <div className="w-full">
          <ReactQuill
            theme="snow"
            value={post.content}
            onChange={(value) => updatePost({ content: value })}
            placeholder="Write something..."
            modules={modules}
          />
        </div>
      </div>
    </div>
  );
}

export default Write;
