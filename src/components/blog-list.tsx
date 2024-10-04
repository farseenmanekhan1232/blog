import { BlogEntry } from "@/components/blog-entry";
import { getBlogsFromAPI } from "@/lib/api";

export async function BlogList() {
  try {
    const blogs = await getBlogsFromAPI();
    return (
      <div className="space-y-10 text-white">
        {blogs.map((blog) => (
          <BlogEntry key={blog.id} blog={blog} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error in BlogList:", error);
    return <div>Error loading blogs. Please try again later.</div>;
  }
}
