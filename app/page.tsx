"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Cloud,
  ArrowRight,
  Terminal,
} from "lucide-react";
import { useMemo, useState } from "react";
import LanguageSwitcher, { Language } from "@/components/LanguageSwitcher";
import ProjectCard from "@/components/ProjectCard";
import SkillBadge from "@/components/SkillBadge";

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const [lang, setLang] = useState<Language>("en");

  const translations = useMemo(
    () => ({
      en: {
        nav: { projects: "Projects", skills: "Expertise" },
        hero: {
          badge: "Available for new opportunities",
          description:
            "Full-stack development studio specializing in high-performance trading platforms, cloud-native architecture, and quantitative analysis systems.",
          ctaPrimary: "View Selected Work",
          ctaSecondary: "Contact Me",
        },
        skills: {
          title: "Technical Expertise",
          subtitle: "Comprehensive full-stack capabilities from silicon to screen.",
          cards: {
            frontend: "Frontend Engineering",
            backend: "Backend & Data",
            cloud: "Cloud & Architecture",
          },
        },
        projects: {
          title: "Featured Projects",
          subtitle: "Real-world applications driving business value.",
        },
        footer: {
          rights: "All rights reserved.",
        },
      },
      zh: {
        nav: { projects: "项目案例", skills: "技术特长" },
        hero: {
          badge: "接受新机会",
          description:
            "全栈开发工作室，专注于高性能交易平台、云原生架构与量化分析系统。",
          ctaPrimary: "查看精选项目",
          ctaSecondary: "联系我",
        },
        skills: {
          title: "技术专长",
          subtitle: "从芯片到屏幕的全栈能力覆盖。",
          cards: {
            frontend: "前端工程",
            backend: "后台与数据",
            cloud: "云与架构",
          },
        },
        projects: {
          title: "精选项目",
          subtitle: "真实落地的应用，驱动业务价值。",
        },
        footer: {
          rights: "保留所有权利。",
        },
      },
    }),
    []
  );

  const content = translations[lang];
  const year = new Date().getFullYear();

  const projectList = [
    {
      title: {
        en: "Futures Trading Simulation Platform",
        zh: "期货交易仿真平台",
      },
      description: {
        en: "A high-performance, real-time futures trading simulator designed for professional trader training. Features sub-millisecond order matching simulation, real-time market data streaming via WebSockets, and complex risk management algorithms.",
        zh: "面向专业交易员训练的高性能实时期货仿真平台，具备亚毫秒级撮合模拟、通过 WebSocket 的实时行情推送，以及复杂风控算法。",
      },
      tags: ["React", "NestJS", "WebSocket", "PostgreSQL", "High Performance"],
      featured: true,
      link: "#",
    },
    {
      title: {
        en: "Quantitative Order Execution System",
        zh: "量化订单执行系统",
      },
      description: {
        en: "Algorithmic trading execution engine capable of handling complex order strategies. (Currently in development)",
        zh: "支持复杂策略的算法交易执行引擎（开发中）。",
      },
      tags: ["Python", "Rust", "AWS", "Low Latency"],
      featured: false,
    },
    {
      title: {
        en: "Hardi Infusion Lab Portfolio",
        zh: "Hardi Infusion Lab 作品集",
      },
      description: {
        en: "The platform you are currently viewing. Built with Next.js 14, Server Components, and Tailwind CSS to demonstrate modern full-stack capabilities.",
        zh: "你正在浏览的平台。基于 Next.js 14、Server Components 与 Tailwind CSS 构建，展示现代全栈能力。",
      },
      tags: ["Next.js", "React", "TailwindCSS", "Framer Motion"],
      featured: false,
      github: "https://github.com/hardi/portfolio",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="font-bold text-white">H</span>
            </div>
            <span className="font-bold text-lg tracking-tight">
              Hardi Infusion Lab
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#projects"
              className="text-sm text-gray-400 hover:text-white transition-colors hidden sm:block"
            >
              {content.nav.projects}
            </a>
            <a
              href="#skills"
              className="text-sm text-gray-400 hover:text-white transition-colors hidden sm:block"
            >
              {content.nav.skills}
            </a>
            <LanguageSwitcher lang={lang} onChange={setLang} />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              {content.hero.badge}
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {lang === "en" ? (
                <>
                  Injecting{" "}
                  <span className="text-gradient">Intelligence</span> into <br />
                  Digital Ecosystems.
                </>
              ) : (
                <>
                  为数字生态<span className="text-gradient">注入智能</span>
                </>
              )}
            </h1>

            <p className="text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
              {content.hero.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                {content.hero.ctaPrimary} <ArrowRight size={18} />
              </a>
              <a
                href="mailto:hardihsu@gmail.com"
                className="px-8 py-4 bg-white/5 text-white font-semibold rounded-full border border-white/10 hover:bg-white/10 transition-colors"
              >
                {content.hero.ctaSecondary}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="py-20 px-6 border-t border-white/5 bg-white/[0.02]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">{content.skills.title}</h2>
            <p className="text-gray-400">{content.skills.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Frontend */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-6 text-blue-400">
                <Code2 size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">
                {content.skills.cards.frontend}
              </h3>
              <div className="flex flex-wrap gap-2">
                <SkillBadge name="React" />
                <SkillBadge name="Next.js" />
                <SkillBadge name="TypeScript" />
                <SkillBadge name="TailwindCSS" />
                <SkillBadge name="Framer Motion" />
              </div>
            </div>

            {/* Backend */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-6 text-purple-400">
                <Terminal size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">
                {content.skills.cards.backend}
              </h3>
              <div className="flex flex-wrap gap-2">
                <SkillBadge name="NestJS" />
                <SkillBadge name="Node.js" />
                <SkillBadge name="PostgreSQL" />
                <SkillBadge name="Redis" />
                <SkillBadge name="Prisma" />
              </div>
            </div>

            {/* Cloud/DevOps */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mb-6 text-green-400">
                <Cloud size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">
                {content.skills.cards.cloud}
              </h3>
              <div className="flex flex-wrap gap-2">
                <SkillBadge name="AWS" />
                <SkillBadge name="Cloudflare" />
                <SkillBadge name="Docker" />
                <SkillBadge name="CI/CD" />
                <SkillBadge name="System Design" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">{content.projects.title}</h2>
              <p className="text-gray-400">{content.projects.subtitle}</p>
            </div>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {projectList.map((project) => (
              <ProjectCard
                key={project.title.en}
                title={project.title[lang]}
                description={project.description[lang]}
                tags={project.tags}
                featured={project.featured}
                link={project.link}
                github={project.github}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-gray-500 text-sm">
            © {year} Hardi Infusion Lab. {content.footer.rights}
          </div>
          <div className="flex gap-6">
            <a
              href="https://github.com/hardihsu"
              className="text-gray-500 hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://x.com/hardihsuu"
              className="text-gray-500 hover:text-white transition-colors"
            >
              X
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
