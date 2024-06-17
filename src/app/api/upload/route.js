import { NextResponse } from "next/server";
import path from "path";
import { promises as fsPromises } from "fs";

// Define the POST handler for the file upload
export const POST = async (req, res) => {
  // Parse the incoming form data
  const formData = await req.formData();

  // Get the file from the form data (assuming a single image)
  const file = formData.get("image"); // Adjust "image" to match your form field name

  // Check if a file is received
  if (!file) {
    // If no file is received, return an error response
    return NextResponse.json({ error: "No image file uploaded.", status: 400 });
  }

  // Extract necessary information from the file object
  const buffer = Buffer.from(await file.arrayBuffer());
  const timestamp = Date.now().toString(); // Convert to Buffer
  const filename = file.name.replaceAll(" ", "_"); // Sanitize filename (replace spaces with underscores)

  // Construct the file path relative to the project's root directory
  const filePath = path.join(
    process.cwd(),
    "public/uploads",
    `${timestamp}-${filename}`
  );

  try {
    // Ensure the uploads directory exists (optional)
    await fsPromises.mkdir(path.dirname(filePath), { recursive: true }); // Create directory if it doesn't exist

    // Write the image file to the specified directory
    await fsPromises.writeFile(filePath, buffer);

    // Return a success response with the image URL
    const imageUrl = `/uploads/${timestamp}-${filename}`; // Construct the image URL relative to the root directory
    return NextResponse.json({
      message: "Image uploaded successfully!",
      imageUrl,
      status: 201,
    });
  } catch (error) {
    // Handle file writing errors
    console.error("Error writing image file:", error);

    if (error.code === "ENOENT") {
      // Specific handling for ENOENT error (directory might not exist)
      console.error(
        "Uploads directory might not exist. Consider creating it manually."
      );
    }

    return NextResponse.json({
      message: "Failed to upload image.",
      status: 500,
    });
  }
};
