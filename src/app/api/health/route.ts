import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    await client.db("admin").command({ ping: 1 });
    return NextResponse.json({
      status: "OK",
      message: "Successfully connected to MongoDB",
    });
  } catch (error: any) {
    console.error("Health check failed:", error);
    return NextResponse.json(
      {
        status: "Error",
        message: "Failed to connect to MongoDB",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
