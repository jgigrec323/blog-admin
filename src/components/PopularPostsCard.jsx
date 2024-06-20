import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FaEye } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { IoIosShareAlt } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
function PopularPostsCard({ title, posts }) {
  const truncateTitle = (title) => {
    if (title.length > 35) {
      return `${title.substring(0, 35)}...`;
    } else {
      return title;
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-2">
          {posts.map((post) => (
            <li key={post.id} className="flex gap-2 items-center">
              {post.images.length > 0 && (
                <Image
                  src={post.images[0].url}
                  alt={post.title}
                  width={50}
                  height={50}
                  className="rounded"
                />
              )}
              <div>
                <Link href={`/write/${post.id}/view`}>
                  {truncateTitle(post.title)}
                </Link>
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-2">
                    <FaEye size={16} />
                    <span className="text-[12px]">{post.views} Views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaRegComment size={16} />
                    <span className="text-[12px]">
                      {post.comments.length} Comments
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IoIosShareAlt size={16} />
                    <span className="text-[12px]">{post.shares} Shares</span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default PopularPostsCard;
