"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { Blog } from "@/types/blog";
import { Button } from "@/components/ui/button";
import DOMPurify from "dompurify";

export function BlogEntry({ blog }: { blog: Blog }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls={`blog-content-${blog.id}`}
        className="bg-transparent space-x-2  justify-between py-0 my-0"
      >
        {isExpanded ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
        <span>{blog.title}</span>
        <span className="px-2 text-xs font-light text-muted-foreground">
          {new Date(blog.date).toLocaleString()}
        </span>
      </Button>

      {isExpanded && (
        <div
          className="p-4 text-sm "
          id={`blog-content-${blog.id}`}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }}
        />
      )}
    </div>
  );
}
