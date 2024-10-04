import { Blog } from "@/types/blog";

function getBaseUrl() {
  if (typeof window !== "undefined") {
    // Browser should use relative path
    return "";
  }
  if (process.env.VERCEL_URL) {
    // Reference for vercel.com
    return `https://${process.env.VERCEL_URL}`;
  }
  if (process.env.RENDER_INTERNAL_HOSTNAME) {
    // Reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  }
  // Assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export async function getBlogsFromAPI(): Promise<Blog[]> {
  const res = await fetch(`${getBaseUrl()}/api/blogs`, { cache: "no-store" });
  if (!res.ok) {
    const errorText = await res.text();
    console.error(
      "Failed to fetch blogs. Status:",
      res.status,
      "Response:",
      errorText
    );
    throw new Error(`Failed to fetch blogs: ${res.status} ${errorText}`);
  }
  return res.json();
}

export async function postBlogToAPI(blog: {
  title: string;
  content: string;
}): Promise<void> {
  const res = await fetch(`${getBaseUrl()}/api/blogs`, {
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
    const errorText = await res.text();
    console.error(
      "Failed to post blog. Status:",
      res.status,
      "Response:",
      errorText
    );
    throw new Error(`Failed to post blog: ${res.status} ${errorText}`);
  }
}
