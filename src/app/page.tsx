import { BlogList } from "@/components/blog-list";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Timeline</h1>
      <Suspense fallback={<div>Loading blogs...</div>}>
        <BlogList />
      </Suspense>
    </div>
  );
}
