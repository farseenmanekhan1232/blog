import { Blog } from "@/types/blog";

function getBaseUrl() {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
}

export async function getBlogsFromAPI(): Promise<Blog[]> {
  const res = await fetch(`${getBaseUrl()}/api/blogs`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
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
    throw new Error("Failed to post blog");
  }
}
