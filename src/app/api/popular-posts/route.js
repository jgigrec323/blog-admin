import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const popularPosts = await prisma.post.findMany({
      orderBy: {
        views: "desc",
      },
      take: 3,
      include: {
        categories: true,
        tags: true,
        images: true,
        comments: true,
      },
    });

    return NextResponse.json(popularPosts);
  } catch (error) {
    console.log("[POPULAR_POSTS_GET]:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
