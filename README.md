# Fusion Lab - Engineering Atelier

一个基于 **Astro + MDX** 构建的静态前端面试题库，支持 AI 智能解答。

![Design](https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6)

## ✨ 特性

- 📝 **MDX 内容管理** - 每个问题都是独立的 MDX 文件，易于编辑和维护
- 🚀 **完全静态生成** - 使用 Astro SSG，首屏加载极快
- 🤖 **AI 智能解答** - 集成 Google Gemini API，提供深度技术解析
- 🎨 **现代化设计** - 深色主题，Material Icons，Tailwind CSS
- ⚡ **性能优化** - 按需加载 React 组件，最小化 JavaScript
- 🔍 **分类检索** - 支持按技术栈分类浏览和搜索

## 🛠️ 技术栈

- **框架**: Astro 5.0
- **UI**: React 18 (仅用于交互组件)
- **样式**: Tailwind CSS + Typography
- **内容**: MDX (Markdown + JSX)
- **AI**: Google Gemini API
- **类型安全**: TypeScript

## 📦 安装

```bash
# 安装依赖
pnpm install

# 配置 API Key
cp .env .env.local
# 编辑 .env.local，设置你的 GEMINI_API_KEY
```

## 🚀 开发

```bash
# 启动开发服务器
pnpm run dev

# 访问 http://localhost:4321
```

## 🏗️ 构建

```bash
# 构建静态站点
pnpm run build

# 预览构建结果
pnpm run preview
```

构建产物位于 `dist/` 目录，可直接部署到任何静态托管服务。

## 📝 添加新问题

在 `src/content/questions/` 目录下创建新的 `.mdx` 文件：

```mdx
---
title: "你的问题标题"
category: "react"
subCategory: "Hooks"
difficulty: "Medium"
readingTime: 5
summary: "问题摘要..."
tags: ["react", "hooks"]
---

## 你的内容

使用 Markdown 编写内容...

\`\`\`jsx
// 代码示例
const example = () => {};
\`\`\`
```

## 📂 项目结构

```
src/
├── components/          # 组件
│   ├── Sidebar.astro   # 侧边栏
│   ├── QuestionCard.astro
│   └── AIExplainer.tsx # React 交互组件
├── content/
│   ├── config.ts       # Content Collections 配置
│   └── questions/      # MDX 问题文件
│       ├── react-updates.mdx
│       ├── virtual-dom.mdx
│       └── ...
├── layouts/            # 布局
│   ├── BaseLayout.astro
│   └── QuestionLayout.astro
├── pages/              # 路由
│   ├── index.astro
│   ├── [category]/index.astro
│   └── questions/[slug].astro
└── styles/
    └── global.css
```

## 🎯 路由说明

- `/` - 首页，显示所有问题
- `/react` - React 分类页面
- `/questions/react-updates` - 具体问题页面

## 🌐 部署

支持部署到：

- **Vercel**: `vercel deploy`
- **Netlify**: `netlify deploy`
- **GitHub Pages**: 配置 GitHub Actions
- **Cloudflare Pages**: 连接 Git 仓库

## 📄 License

MIT

## 🤝 贡献

欢迎提交 PR 添加新的面试题！
```

