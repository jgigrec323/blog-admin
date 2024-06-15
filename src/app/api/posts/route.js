import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getAuth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    // Verify the user's authentication
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, content, categoryIds, tagIds, imageUrls, published } =
      await request.json();

    // Create the post with related categories, tags, and images
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        published,
        categories: {
          connect: categoryIds.map((id) => ({ id })),
        },
        tags: {
          connect: tagIds.map((id) => ({ id })),
        },
        images: {
          create: imageUrls.map((url) => ({ url })),
        },
      },
    });

    return NextResponse.json({ message: "Post created successfully", newPost });
  } catch (error) {
    console.error("[POST_CREATE]:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
