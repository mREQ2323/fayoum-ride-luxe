import { Link } from "@tanstack/react-router";
import React from "react";

// Parses inline markdown links [text](url) into anchors.
// External URLs (http/https) open in new tab with rel=noopener.
// Internal URLs (starting with /) use TanStack Link for client navigation.
export function renderInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const label = match[1];
    const href = match[2];
    if (/^https?:\/\//i.test(href)) {
      parts.push(
        <a
          key={`l${key++}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold"
        >
          {label}
        </a>,
      );
    } else {
      parts.push(
        <Link
          key={`l${key++}`}
          to={href}
          className="text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold"
        >
          {label}
        </Link>,
      );
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}
