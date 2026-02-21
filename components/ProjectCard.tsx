"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Lock, Eye } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    link?: string;
    github?: string;
    featured?: boolean;
    onClick?: () => void;
}

export default function ProjectCard({
    title,
    description,
    tags,
    link,
    github,
    featured = false,
    onClick
}: ProjectCardProps) {
    const { t } = useLanguage();
    // If link is provided as "#", treat it as coming soon unless onClick is provided
    const isActuallyComingSoon = (!link || link === "#") && !onClick;

    return (
        <motion.div
            whileHover={isActuallyComingSoon ? {} : { y: -5 }}
            className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all ${isActuallyComingSoon ? "opacity-80" : "hover:border-blue-500/30 hover:bg-white/10 cursor-pointer"
                } ${featured ? "md:col-span-2" : ""}`}
            onClick={isActuallyComingSoon ? undefined : onClick}
        >
            {!isActuallyComingSoon && (
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            )}

            <div className="flex flex-col h-full justify-between gap-6">
                <div>
                    <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                            {title}
                        </h3>
                        <div className="flex gap-2">
                            {github && (
                                <a
                                    href={github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10 z-10"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Github size={20} />
                                </a>
                            )}
                            {isActuallyComingSoon ? (
                                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-400 cursor-not-allowed">
                                    <Lock size={12} />
                                    <span>{t("project.coming_soon")}</span>
                                </div>
                            ) : (
                                <button
                                    className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
                                >
                                    <ArrowUpRight size={20} />
                                </button>
                            )}
                        </div>
                    </div>

                    <p className="text-gray-400 leading-relaxed mb-6 line-clamp-3">
                        {description}
                    </p>
                </div>

                <div className="flex items-end justify-between">
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 text-xs font-medium text-blue-300 bg-blue-500/10 rounded-full border border-blue-500/20"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {!isActuallyComingSoon && (
                        <div className="flex items-center gap-1 text-xs font-medium text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Eye size={14} />
                            {t("btn.read_more")}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
