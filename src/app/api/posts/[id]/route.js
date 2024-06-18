import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getAuth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { id } = params;

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
      include: {
        categories: true,
        tags: true,
        images: true,
      },
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Post fetched successfully!", post });
  } catch (error) {
    console.log("[POST_GET]:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const { title, content, categoryIds, tagIds, imageUrls, published } =
      await request.json();

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const existingPost = await prisma.post.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    // Delete existing images
    await prisma.image.deleteMany({
      where: { postId: parseInt(id) },
    });

    // Only create the last image URL
    const newImage =
      imageUrls.length > 0 ? imageUrls[imageUrls.length - 1] : null;

    // Update post with provided data
    const updatedPost = await prisma.post.update({
      where: { id: parseInt(id) },
      data: {
        title,
        content,
        published,
        categories: {
          set: categoryIds.map((categoryId) => ({ id: categoryId })),
        },
        tags: {
          set: tagIds.map((tagId) => ({ id: tagId })),
        },
        images: newImage ? { create: { url: newImage } } : undefined,
      },
      include: {
        categories: true,
        tags: true,
        images: true,
      },
    });

    return NextResponse.json({
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    console.log("[POST_UPDATE]:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await prisma.image.deleteMany({ where: { postId: parseInt(id) } });
    await prisma.post.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log("[POST_DELETE]:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
