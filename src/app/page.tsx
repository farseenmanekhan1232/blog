import { BlogList } from "@/components/blog-list";

export default function Home() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 px-4">Timeline</h1>
      <BlogList />
    </div>
  );
}
