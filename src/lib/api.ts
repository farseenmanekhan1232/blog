import { Blog } from "@/types/blog";

function getBaseUrl() {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  if (process.env.NEXT_PUBLIC_VERCEL_URL)
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`; // Check for NEXT_PUBLIC_VERCEL_URL
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
}

export async function getBlogsFromAPI(): Promise<Blog[]> {
  const baseUrl = getBaseUrl();
  const url = baseUrl ? `${baseUrl}/api/blogs` : "/api/blogs";

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
  const baseUrl = getBaseUrl();
  const url = baseUrl ? `${baseUrl}/api/blogs` : "/api/blogs";

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
