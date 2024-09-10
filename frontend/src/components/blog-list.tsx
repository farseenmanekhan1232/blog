import { BlogEntry } from "@/components/blog-entry";

async function getBlogs() {
  const res = await fetch("https://blog-h96d.onrender.com/blogs", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }
  return res.json();
}

export async function BlogList() {
  const blogs = await getBlogs();

  return (
    <div className="space-y-10 text-white">
      {blogs.map((blog: any, key: number) => (
        <BlogEntry key={key} blog={blog} />
      ))}
    </div>
  );
}
