"use client";
import Title from "@/components/Title";
import React, { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegImage } from "react-icons/fa6";
import { BiSolidVideos } from "react-icons/bi";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./write.css";
import CustomSelect from "@/components/CustomSelect";
import { usePost } from "@/context/PostContext";

function Write() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const { post, updatePost } = usePost();

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],
    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],
    ["clean"], // remove formatting button
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

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
        <div className="my-5 flex gap-10">
          <IoIosAddCircleOutline
            size={30}
            onClick={() => {
              setOpen(!open);
            }}
          />
          {open && (
            <div className="flex gap-5">
              <FaRegImage size={25} />
              <BiSolidVideos size={25} />
            </div>
          )}
          <div className="flex gap-5">
            <CustomSelect
              endpoint="category"
              selectedItems={selectedCategories}
              setSelectedItems={setSelectedCategories}
              placeholder="Select categories..."
            />
            <CustomSelect
              endpoint="tag"
              selectedItems={selectedTags}
              setSelectedItems={setSelectedTags}
              placeholder="Select tags..."
            />
          </div>
        </div>
        <div className="w-full ">
          <ReactQuill
            theme="snow"
            value={post.content}
            onChange={(value) => updatePost({ content: value })}
            placeholder="Write something..."
            modules={modules}
          ></ReactQuill>
        </div>
      </div>
    </div>
  );
}

export default Write;
