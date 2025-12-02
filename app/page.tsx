"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Cloud,
  Terminal,
  ArrowRight
} from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ProjectCard from "@/components/ProjectCard";
import SkillBadge from "@/components/SkillBadge";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";

function HomeContent() {
  const { t } = useLanguage();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="font-bold text-white">H</span>
            </div>
            <span className="font-bold text-lg tracking-tight">Hardi Infusion Lab</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#projects" className="text-sm text-gray-400 hover:text-white transition-colors hidden sm:block">{t("nav.projects")}</a>
            <a href="#skills" className="text-sm text-gray-400 hover:text-white transition-colors hidden sm:block">{t("nav.expertise")}</a>
            <LanguageSwitcher />
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
              {t("hero.badge")}
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {t("hero.title.prefix")} <span className="text-gradient">{t("hero.title.highlight")}</span> {t("hero.title.suffix")}
            </h1>

            <p className="text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
              {t("hero.description")}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                {t("hero.cta.projects")} <ArrowRight size={18} />
              </a>
              <a
                href="mailto:hardihsu@gmail.com"
                className="px-8 py-4 bg-white/5 text-white font-semibold rounded-full border border-white/10 hover:bg-white/10 transition-colors"
              >
                {t("hero.cta.contact")}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">{t("skills.title")}</h2>
            <p className="text-gray-400">{t("skills.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Frontend */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-6 text-blue-400">
                <Code2 size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">{t("skills.frontend")}</h3>
              <div className="flex flex-wrap gap-2">
                <SkillBadge name="React" />
                <SkillBadge name="Next.js" />
                <SkillBadge name="TypeScript" />
                <SkillBadge name="Tailwind" />
                <SkillBadge name="Framer Motion" />
              </div>
            </div>

            {/* Backend */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-6 text-purple-400">
                <Terminal size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">{t("skills.backend")}</h3>
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
              <h3 className="text-xl font-bold mb-4">{t("skills.cloud")}</h3>
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
              <h2 className="text-3xl font-bold mb-4">{t("projects.title")}</h2>
              <p className="text-gray-400">{t("projects.subtitle")}</p>
            </div>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <ProjectCard
              title={t("project.futures.title")}
              description={t("project.futures.desc")}
              tags={["React", "NestJS", "WebSocket", "PostgreSQL", "High Performance"]}
              featured={true}
              link="#"
            />

            <ProjectCard
              title={t("project.quant.title")}
              description={t("project.quant.desc")}
              tags={["Python", "Rust", "AWS", "Low Latency"]}
              featured={false}
            />

            <ProjectCard
              title={t("project.portfolio.title")}
              description={t("project.portfolio.desc")}
              tags={["Next.js", "React", "Tailwind", "Framer Motion"]}
              featured={false}
              github="https://github.com/hardi/portfolio"
            />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Hardi Infusion Lab. {t("footer.rights")}
          </div>
          <div className="flex gap-6">
            <a href="https://github.com/hardihsu" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">GitHub</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">LinkedIn</a>
            <a href="https://x.com/hardihsu" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">X</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <HomeContent />
    </LanguageProvider>
  );
}
