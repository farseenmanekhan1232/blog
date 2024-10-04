"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { Blog } from "@/types/blog";

export function BlogEntry({ blog }: { blog: Blog }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
      <div className="flex items-center justify-between">
        <span>{blog.title}</span>
        {isExpanded ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </div>
      <div className="text-sm text-muted-foreground" suppressHydrationWarning>
        {new Date(blog.date).toLocaleString()}
      </div>

      {isExpanded && <div dangerouslySetInnerHTML={{ __html: blog.content }} />}
    </div>
  );
}
