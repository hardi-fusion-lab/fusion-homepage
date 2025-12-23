---
title: "内容扩展：迁移至基于文件的 MDX 架构"
summary: "从硬编码的 JSON 字符串迁移到基于 Git 的可扩展 CMS 工作流，利用 Gray-Matter 和 Next.js。"
date: "2024年12月23日"
readTime: "6 分钟阅读"
tags: ["Next.js", "工程化", "CMS", "SSG"]
image: "https://placehold.co/1200x600/22c55e/1e293b?text=MDX+Migration"
author:
  name: "Hardi Hsu"
  avatar: "https://github.com/hardihsu.png"
  role: "Lead Engineer"
claps: 42
---

随着 `Hardi Fusion Lab` 的发展，在 `LanguageContext.tsx` 的巨大 JSON 对象中维护技术文章成为了瓶颈。这导致了包体积膨胀，且写作体验极差（没有语法高亮，字符串转义痛苦）。

我们决定迁移到使用 **Markdown (MDX)** 的 **基于文件的 CMS** 方案。

### 问题：“字符串化”地狱

在 JSON字符串里写博客是痛苦的：

```javascript
// 之前
{
  content: "### 标题\n\n这是换行。\n\n等等，我需要转义引号：\"你好\"。"
}
```

这是不可维护的。我们希望在 VS Code 中编写标准的 Markdown 文件。

### 架构：静态生成

我们利用了 Next.js 在构建时（或请求时）读取文件系统的能力。

**目录结构**:
```
/content
  /insights
    /en
      article-1.md
    /zh
      article-1.md
```

### 代码：解析 Frontmatter

我们使用 `gray-matter` 库来将 YAML frontmatter（元数据）与内容正文分开解析。

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

### 收益

1.  **Git Ops**: 每一次文章修改都是一次提交。我们可以在 GitHub 上轻松审查 Diff。
2.  **DX**: 我们可以在文章上使用 Copilot、格式化工具 (Prettier) 和拼写检查器。
3.  **性能**: 我们不再在初始 JS 包中发送 *每一篇* 文章的文本。我们只加载我们需要的内容。

这次迁移使我们能够从 4 篇文章扩展到 400 篇，而不会降低应用程序的性能。
