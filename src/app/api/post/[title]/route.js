import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getAuth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

function transformTitleBack(title) {
  return title
    .split("-")
    .map((word) => word.charAt(0) + word.slice(1))
    .join(" ");
}
export async function GET(request, { params }) {
  try {
    /*   const { userId } = getAuth(request);

                  if (!userId) {
                    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
                  } */
    const { title } = params;

    const transformedTitle = transformTitleBack(title);

    if (!title) {
      return NextResponse.json(
        { message: "title is required" },
        { status: 400 }
      );
    }

    const post = await prisma.post.findFirst({
      where: { title: transformedTitle },
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
