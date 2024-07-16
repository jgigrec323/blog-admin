import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getAuth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function PUT(request, { params }) {
  const { id } = params;
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const post = await prisma.post.findFirst({
      where: { id: parseInt(id) },
      select: { isFeatured: true },
    });

    const updatedPost = await prisma.post.update({
      where: { id: parseInt(id) },
      data: { isFeatured: !post.isFeatured },
    });

    return NextResponse.json({
      message: "Post updated successfully",
      updatedPost,
    });
  } catch (error) {
    console.log("[POST_UPDATE]:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
