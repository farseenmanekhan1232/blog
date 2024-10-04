import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Blog } from "@/types/blog";
import { WithId, Document } from "mongodb";

export async function GET() {
  try {
    console.log("API route: Attempting to connect to MongoDB");
    const client = await clientPromise;
    const db = client.db("blog");
    const blogsFromDb: WithId<Document>[] = await db
      .collection("blogs")
      .find()
      .sort({ date: -1 })
      .toArray();

    const blogs: Blog[] = blogsFromDb.map((doc) => ({
      id: doc._id.toString(),
      date: doc.date as string,
      title: doc.title as string,
      content: doc.content as string,
    }));

    console.log("API route: Successfully fetched blogs");

    return NextResponse.json(blogs, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=59",
      },
    });
  } catch (error: any) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { date, title, content } = await request.json();
    if (!date || !title || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("API route: Attempting to connect to MongoDB for POST");
    const client = await clientPromise;
    const db = client.db("blog");
    const result = await db
      .collection("blogs")
      .insertOne({ date, title, content });

    if (!result.insertedId) {
      throw new Error("Failed to insert blog post");
    }

    const newBlog: Blog = {
      id: result.insertedId.toString(),
      date,
      title,
      content,
    };

    console.log("API route: Successfully posted new blog");

    return NextResponse.json(
      { message: "Blog posted successfully", blog: newBlog },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Failed to post blog", details: error.message },
      { status: 500 }
    );
  }
}
