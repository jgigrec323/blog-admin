import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const categories = await prisma.category.findMany(); // Adjust the Prisma query to fetch categories

    return NextResponse.json({
      message: "Categories fetched",
      categories,
    });
  } catch (error) {
    console.log("[CATEGORIES_GET]:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { categories } = await request.json();

    // Split the string by commas to get individual categories
    const categoryArray = categories
      .split(",")
      .map((category) => category.trim());

    // Check if categories already exist in the database
    const existingCategories = await prisma.category.findMany({
      where: {
        name: { in: categoryArray },
      },
    });

    // Filter out existing categories from the categoryArray
    const newCategories = categoryArray.filter(
      (category) => !existingCategories.some((c) => c.name === category)
    );

    // Create an array of category objects for new categories
    const categoryObjects = newCategories.map((category) => ({
      name: category,
    }));

    // Insert new categories into the database using createMany
    const addedCategories = await prisma.category.createMany({
      data: categoryObjects,
    });

    // Generate response message
    let message = "";
    if (newCategories.length > 0) {
      message += `Added categories: ${newCategories.join(", ")}. `;
    }
    if (existingCategories.length > 0) {
      message += `Categories already exist: ${existingCategories
        .map((c) => c.name)
        .join("  ,   ")}.`;
    }

    return NextResponse.json({
      message: message || "No new categories added.",
      addedCategories,
    });
  } catch (error) {
    console.log("[CATEGORY_POST]:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    const deletedCategory = await prisma.category.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({
      message: "Category deleted successfully",
      deletedCategory,
    });
  } catch (error) {
    console.log("[CATEGORY_DELETE]:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
