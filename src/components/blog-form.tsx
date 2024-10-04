"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { postBlogToAPI } from "@/lib/api";

export function BlogForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await postBlogToAPI({ title, content });
      setTitle("");
      setContent("");
      toast({
        title: "Success",
        description: "Blog posted successfully!",
      });
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to post blog. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="text-white">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Input
              id="blogTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the title"
              className="border border-white border-opacity-10"
            />
          </div>
          <div className="space-y-2">
            <Textarea
              id="blogContent"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter the content"
              className="border border-white border-opacity-10"
              rows={4}
            />
          </div>
        </div>
        <div className="py-4">
          <Button type="submit">Post Blog</Button>
        </div>
      </form>
    </div>
  );
}
