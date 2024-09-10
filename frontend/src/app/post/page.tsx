import { BlogForm } from "@/components/blog-form";
import Link from "next/link";

export default function PostPage() {
  return (
    <div className="container mx-auto p-6">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-2">new event</h1>
        <Link href="/" className="text-lg text-blue-400">
          view events
        </Link>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">New Blog Entry</h2>
        <BlogForm />
      </section>
    </div>
  );
}
