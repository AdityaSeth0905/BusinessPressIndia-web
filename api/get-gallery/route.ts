import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const imageDir = path.join(process.cwd(), "public", "INDIA-AFRICA SCHOLARSHIP AWARDS 25-03-2025");

  try {
    const files = fs.readdirSync(imageDir);
    const imageUrls = files
      .filter((file) => /\.(jpg|jpeg|png|webp|gif)$/i.test(file)) // Only images
      .map((file, index) => ({
        id: index + 1,
        src: `/INDIA-AFRICA SCHOLARSHIP AWARDS 25-03-2025/${file}`,
        alt: `Scholarship Award Image ${index + 1}`,
      }));

    return NextResponse.json(imageUrls);
  } catch (error) {
    return NextResponse.json({ error: "Could not load images" }, { status: 500 });
  }
}
