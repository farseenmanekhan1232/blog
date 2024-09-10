import { BlogForm } from "@/components/blog-form";
import Link from "next/link";

export default function PostPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">New Event</h1>
      <Link
        href="/"
        className="text-blue-500 hover:underline mb-6 inline-block"
      >
        View Events
      </Link>
      <BlogForm />
    </div>
  );
}
