import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Create unique filename mapping for mock
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const originalName = file.name || "uploaded-image.png";
    const extension = originalName.split(".").pop();
    const filename = `${uniqueSuffix}.${extension}`;

    // Return the relative public path URL.
    // In local development, the admin panel can reference mock files, 
    // and this will be connected to live Cloudflare R2 bucket storage in the next phase.
    const relativeUrl = `/uploads/${filename}`;
    
    console.log(`[EDGE MOCK UPLOAD] Simulating upload of file: ${originalName} -> ${relativeUrl}`);
    
    return NextResponse.json({ success: true, url: relativeUrl });
  } catch (error: any) {
    console.error("Upload API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload file" },
      { status: 500 }
    );
  }
}
