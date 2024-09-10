"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export function BlogForm() {
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
    <div className="text-white">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Input
              id="blogTitle"
              className="border border-white border-opacity-10"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the title"
            />
          </div>
          <div className="space-y-2">
            <Textarea
              id="blogContent"
              className="border border-white border-opacity-10"
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter the content"
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
