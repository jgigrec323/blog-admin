"use client";
import Title from "@/components/Title";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegImage } from "react-icons/fa6";
import { BiSolidVideos } from "react-icons/bi";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../write.css";
import CustomSelect from "@/components/CustomSelect";
import { usePost } from "@/context/PostContext";
import ImageUpload from "@/components/ImageUpload";
import axios from "axios";

function Edit({ params }) {
  const { id } = params;
  const [open, setOpen] = useState(false);
  const [imgOpen, setImgOpen] = useState(false);
  const [value, setValue] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const { post, setPost, updatePost } = usePost();

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
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
          }
        } catch (error) {
          console.error("Error fetching post:", error);
        }
      };
      fetchPost();
    }
  }, [id, setPost]);

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
        <div className="my-5 flex items-center gap-10">
          <IoIosAddCircleOutline
            size={30}
            onClick={() => {
              setOpen(!open);
            }}
          />
          {open && (
            <div className="flex gap-5 items-center">
              <FaRegImage
                onClick={() => {
                  setImgOpen(!imgOpen);
                }}
              />
              {imgOpen && <ImageUpload />}
              <BiSolidVideos size={25} />
            </div>
          )}
          <div className="flex gap-5">
            <CustomSelect
              endpoint="category"
              placeholder="Select categories..."
              value={post.categories}
              onChange={(value) => updatePost({ categories: value })}
            />
            <CustomSelect
              endpoint="tag"
              placeholder="Select tags..."
              value={post.tags}
              onChange={(value) => updatePost({ tags: value })}
            />
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

export default Edit;
