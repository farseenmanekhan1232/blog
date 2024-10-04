import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    console.log("API route: Attempting to connect to MongoDB");
    const client = await clientPromise;
    const db = client.db("blog");
    const blogs = await db
      .collection("blogs")
      .find()
      .sort({ date: -1 })
      .toArray();
    console.log("API route: Successfully fetched blogs");
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { date, title, content } = await request.json();
    const client = await clientPromise;
    const db = client.db("blog");
    await db.collection("blogs").insertOne({ date, title, content });
    return NextResponse.json(
      { message: "Blog posted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json({ error: "Failed to post blog" }, { status: 500 });
  }
}
