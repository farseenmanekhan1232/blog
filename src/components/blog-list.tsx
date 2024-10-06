import { BlogEntry } from "@/components/blog-entry";
import { getBlogsFromAPI } from "@/lib/api";

export async function BlogList() {
  try {
    const blogs = await getBlogsFromAPI();

    return (
      <div className="space-y-2  text-white">
        {blogs.map((blog) => (
          <BlogEntry key={blog.id} blog={blog} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error in BlogList:", error);
    throw new Error("Failed to load blogs");
  }
}
