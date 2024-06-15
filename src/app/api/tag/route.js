import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const tags = await prisma.tag.findMany(); // Adjust the Prisma query to fetch tags

    return NextResponse.json({
      message: "Tags fetched",
      tags,
    });
  } catch (error) {
    console.log("[TAGS_GET]:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { tags } = await request.json();

    // Split the string by commas to get individual tags
    const tagArray = tags.split(",").map((tag) => tag.trim());

    // Check if tags already exist in the database
    const existingTags = await prisma.tag.findMany({
      where: {
        name: { in: tagArray },
      },
    });

    // Filter out existing tags from the tagArray
    const newTags = tagArray.filter(
      (tag) => !existingTags.some((c) => c.name === tag)
    );

    // Create an array of tag objects for new tags
    const tagObjects = newTags.map((tag) => ({
      name: tag,
    }));

    // Insert new tags into the database using createMany
    const addedTags = await prisma.tag.createMany({
      data: tagObjects,
    });

    // Generate response message
    let message = "";
    if (newTags.length > 0) {
      message += `Added Tags: ${newTags.join(", ")}. `;
    }
    if (existingTags.length > 0) {
      message += `Tags already exist: ${existingTags
        .map((c) => c.name)
        .join("  ,   ")}.`;
    }

    return NextResponse.json({
      message: message || "No new categories added.",
      addedTags,
    });
  } catch (error) {
    console.log("[tag_POST]:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    const deletedTag = await prisma.tag.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({
      message: "tag deleted successfully",
      deletedTag,
    });
  } catch (error) {
    console.log("[TAG_DELETE]:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
