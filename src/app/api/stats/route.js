import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const totalPosts = await prisma.post.count();
    const totalComments = await prisma.comment.count();
    const totalShares = await prisma.post.aggregate({
      _sum: {
        shares: true,
      },
    });
    const totalViews = await prisma.post.aggregate({
      _sum: {
        views: true,
      },
    });

    return NextResponse.json({
      totalComments,
      totalPosts,
      totalShares: totalShares._sum.shares,
      totalViews: totalViews._sum.views,
    });
  } catch (error) {
    console.log("[STATS_GET]:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
