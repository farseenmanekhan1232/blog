"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function BlogForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const date = new Date().toISOString();
    const formattedContent = content.replace(/\n/g, "<br>");

    if (title && content) {
      try {
        const response = await fetch("https://blog-h96d.onrender.com/blogs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ date, title, content: formattedContent }),
        });

        if (response.ok) {
          setTitle("");
          setContent("");
          toast({
            title: "Success",
            description: "Blog posted successfully!",
          });
        } else {
          throw new Error("Failed to post blog");
        }
      } catch (error) {
        console.error("Error:", error);
        toast({
          title: "Error",
          description: "Failed to post blog. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="blogTitle" className="block text-lg font-medium">
          Title
        </label>
        <Input
          id="blogTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the title"
        />
      </div>
      <div>
        <label htmlFor="blogContent" className="block text-lg font-medium">
          Content
        </label>
        <Textarea
          id="blogContent"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter the content"
        />
      </div>
      <Button type="submit">Post Blog</Button>
    </form>
  );
}
