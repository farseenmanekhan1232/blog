import { BlogEntry } from "./blog-entry";

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
    <section className="relative timeline max-w-lg mx-auto">
      {blogs.map((blog: any) => (
        <BlogEntry key={blog.id} blog={blog} />
      ))}
    </section>
  );
}
