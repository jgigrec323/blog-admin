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
export async function POST(request, { params }) {
  try {
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
    });
    const postU = await prisma.post.update({
      where: { id: post.id },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({ message: "View count incremented", postU });
  } catch (error) {
    console.log("[POST_INCREMENT_GET]:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
