import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch categories with the count of posts
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { posts: true },
        },
      },
      orderBy: {
        posts: { _count: 'desc' }, // Order by the number of posts in descending order
      },
      take: 4, // Take the top 4 categories
    });

  
    return NextResponse.json({
      message: "Popular categories fetched",
      categories,
    });
  } catch (error) {
    console.log("Error fetching popular categories:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
