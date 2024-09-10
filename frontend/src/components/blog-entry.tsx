"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BlogEntry({ blog }: any) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="timeline-entry relative mb-8 pl-6 before:content-[''] before:absolute before:top-3 before:left-0 before:w-3 before:h-3 before:bg-primary before:rounded-full">
      <p className="italic text-xs mb-1 text-muted-foreground">
        {new Date(blog.date).toLocaleString()}
      </p>
      <Button
        variant="ghost"
        className="p-0 h-auto font-semibold hover:bg-transparent"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-xl font-semibold flex items-center">
          {blog.title}
          {isExpanded ? (
            <ChevronDown className="ml-2 h-4 w-4" />
          ) : (
            <ChevronRight className="ml-2 h-4 w-4" />
          )}
        </h3>
      </Button>
      {isExpanded && (
        <div
          className="content mt-2"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      )}
    </div>
  );
}
