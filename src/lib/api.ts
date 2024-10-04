import { Blog } from "@/types/blog";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function getBlogsFromAPI(): Promise<Blog[]> {
  const res = await fetch(`${API_URL}/api/blogs`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }
  return res.json();
}

export async function postBlogToAPI(blog: {
  title: string;
  content: string;
}): Promise<void> {
  const res = await fetch(`${API_URL}/api/blogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date: new Date().toISOString(),
      title: blog.title,
      content: blog.content.replace(/\n/g, "<br>"),
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to post blog");
  }
}
