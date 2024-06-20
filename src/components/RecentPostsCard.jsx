import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

function RecentPostsCard({ title, posts }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          {posts.map((post) => (
            <li key={post.id} className="mb-2">
              <a
                href={`/posts/${post.id}`}
                className="text-blue-600 hover:underline"
              >
                {post.title}
              </a>
              <p className="text-sm text-gray-500">{post.date}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default RecentPostsCard;
