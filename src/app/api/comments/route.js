import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getAuth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { content, postId, author } = await request.json();

    if (!content || !postId || !author) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        author,
      },
    });

    return NextResponse.json({
      message: "comment created successfully",
      comment,
    });
  } catch (error) {
    console.error("[COMMENT_CREATE]:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
