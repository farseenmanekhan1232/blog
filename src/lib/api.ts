import { Blog } from "@/types/blog";
import { headers } from "next/headers";
export async function getBlogsFromAPI(): Promise<Blog[]> {
  const currentHeaders = headers();
  const host = currentHeaders.get("host");

  if (!host) {
    throw new Error("Cannot determine the host from headers.");
  }

  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = `${protocol}://${host}`;
  const url = `${baseUrl}/api/blogs`;

  console.log(`Fetching blogs from: ${url}`);

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch blogs: ${res.status} ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
}

export async function postBlogToAPI(blog: {
  title: string;
  content: string;
}): Promise<void> {
  const currentHeaders = headers();
  const host = currentHeaders.get("host");

  if (!host) {
    throw new Error("Cannot determine the host from headers.");
  }

  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = `${protocol}://${host}`;
  const url = `${baseUrl}/api/blogs`;

  console.log(`Posting blog to: ${url}`);

  try {
    const res = await fetch(url, {
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
      throw new Error(`Failed to post blog: ${res.status} ${res.statusText}`);
    }
  } catch (error) {
    console.error("Error posting blog:", error);
    throw error;
  }
}
