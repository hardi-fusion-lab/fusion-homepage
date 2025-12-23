---
title: "Scaling Content: Migrating to File-Based MDX"
summary: "Moving from hardcoded JSON to a scalable, Git-based CMS workflow using Gray-Matter and Next.js."
date: "Dec 23, 2024"
readTime: "6 min read"
tags: ["Next.js", "Engineering", "CMS", "SSG"]
image: "https://placehold.co/1200x600/22c55e/1e293b?text=MDX+Migration"
author:
  name: "Hardi Hsu"
  avatar: "https://github.com/hardihsu.png"
  role: "Lead Engineer"
claps: 42
---

As \`Hardi Fusion Lab\` grew, maintaining technical articles inside a massive JSON object in \`LanguageContext.tsx\` became a bottleneck. It resulted in a bloated bundle size and a poor writing experience (no syntax highlighting, painful string escaping).

We decided to migrate to a **File-Based CMS** approach using **Markdown (MDX)**.

### The Problem: "Stringify" Hell

Writing a blog post inside a JSON string is painful:

```javascript
// Before
{
  content: "### Header\n\nThis is a newline.\n\nWait, I need to escape quotes: \"Hello\"."
}
```

This is unmaintainable. We wanted to write standard Markdown files in VS Code.

### The Architecture: Static Generation

We leveraged Next.js's ability to read the file system at build time (or request time).

**Directory Structure**:
```
/content
  /insights
    /en
      article-1.md
    /zh
      article-1.md
```

### The Code: Parse Frontmatter

We used the library `gray-matter` to parse YAML frontmatter (metadata) separate from the content body.

```typescript
// lib/mdx.ts
import fs from 'fs';
import matter from 'gray-matter';

export function getAllInsights(lang) {
  const dir = path.join(process.cwd(), 'content/insights', lang);
  const files = fs.readdirSync(dir);
  
  return files.map(filename => {
    const fileContent = fs.readFileSync(path.join(dir, filename), 'utf8');
    const { data, content } = matter(fileContent);
    return { ...data, content };
  });
}
```

### Benefits

1.  **Git Ops**: Every article change is a commit. We can review diffs easily on GitHub.
2.  **DX**: We can use copilot, formatters (Prettier), and spellcheckers on our articles.
3.  **Performance**: We no longer ship the text of *every* article in the initial JS bundle. We only load what we need (or pre-render HTML).

This migration allows us to scale from 4 articles to 400 without degrading the application's performance.
