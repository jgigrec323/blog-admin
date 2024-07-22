import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getAuth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const { postId } = params;

    if (!postId) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }

    const comments = await prisma.comment.findMany({
      where: { postId: Number(postId) },
      orderBy: { createdAt: "desc" },
    });

    if (comments.length === 0) {
      return NextResponse.json({ message: "No comments" }, { status: 200 });
    }

    return NextResponse.json({
      message: "Comments fetched successfully!",
      comments,
    });
  } catch (error) {
    console.log("[COMMENT_GET]:", error);
    return NextResponse.json("Internal error", { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { postId: commentId } = params;

    if (!commentId) {
      return NextResponse.json(
        { error: "Comment ID is required" },
        { status: 400 }
      );
    }

    const deletedComment = await prisma.comment.delete({
      where: { id: Number(commentId) },
    });

    return NextResponse.json({
      message: "Comment deleted successfully!",
      deletedComment,
    });
  } catch (error) {
    console.log("[COMMENT_DELETE]:", error);
    return NextResponse.json("Internal error", { status: 500 });
  }
}
