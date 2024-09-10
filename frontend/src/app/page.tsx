import { BlogList } from "@/components/blog-list";

export default function Home() {
  return (
    <div className="container mx-auto p-6">
      <header className="max-w-lg mx-auto text-4xl font-bold mb-10">
        timeline
      </header>
      <BlogList />
    </div>
  );
}
