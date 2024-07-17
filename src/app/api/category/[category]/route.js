import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function GET(request, { params }) {
  const { category } = params;

  try {
    const posts = await prisma.post.findMany({
      where: {
        categories: {
          some: {
            name: category.toLowerCase(),
          },
        },
      },
      include: {
        categories: true,
        tags: true,
        images: true,
      },
    });

    console.log(posts);
    return NextResponse.json({
      message: "Posts fetched",
      posts,
    });
  } catch (error) {
    console.log("[POSTS_BY_CATEGORY_GET]:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
