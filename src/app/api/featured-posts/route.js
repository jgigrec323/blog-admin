import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const post = await prisma.post.findMany({
      where: { isFeatured: true },
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
    console.log("[FEATURED_POST_GET]:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
