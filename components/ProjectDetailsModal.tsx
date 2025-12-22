"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Server, Cpu, Layers } from "lucide-react";
import { useEffect } from "react";

export interface ProjectDetails {
    id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    tags: string[];
    features: string[];
    techStack: { category: string; skills: string[] }[];
    challenges?: string;
    architecture?: string;
    links?: { label: string; url: string }[];
    media?: { type: 'image' | 'video'; url: string; caption: string }[];
}

interface ProjectDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: ProjectDetails | null;
}

export default function ProjectDetailsModal({ isOpen, onClose, project }: ProjectDetailsModalProps) {
    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl bg-[#0A0A0A] border border-white/10 shadow-2xl shadow-blue-500/10 pointer-events-auto flex flex-col"
                        >
                            {/* Header */}
                            <div className="relative p-6 sm:p-8 border-b border-white/10 bg-gradient-to-r from-blue-900/10 to-purple-900/10">
                                <button
                                    onClick={onClose}
                                    className="absolute right-6 top-6 p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>

                                <div className="pr-12">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-4">
                                        <span>Featured Project</span>
                                    </div>
                                    <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-2">
                                        {project.title}
                                    </h2>
                                    <p className="text-gray-400 text-lg">{project.shortDescription}</p>
                                </div>
                            </div>

                            {/* Scrollable Content */}
                            <div className="overflow-y-auto p-6 sm:p-8 custom-scrollbar">

                                {/* Media Gallery */}
                                {project.media && project.media.length > 0 && (
                                    <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {project.media.map((item, idx) => (
                                            <div key={idx} className="relative aspect-video rounded-xl overflow-hidden group bg-white/5 border border-white/10">
                                                <img
                                                    src={item.url}
                                                    alt={item.caption}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                                    <p className="text-sm font-medium text-white">{item.caption}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Full Description */}
                                <div className="mb-10">
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        <Layers size={18} className="text-blue-400" />
                                        Overview
                                    </h3>
                                    <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                                        {project.fullDescription}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                    {/* Key Features */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                            <CheckCircle2 size={18} className="text-green-400" />
                                            Key Features
                                        </h3>
                                        <ul className="space-y-3">
                                            {project.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start gap-3 text-gray-300">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500/50 shrink-0" />
                                                    <span className="text-sm leading-relaxed">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Tech Stack */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                            <Cpu size={18} className="text-purple-400" />
                                            Tech Stack
                                        </h3>
                                        <div className="space-y-4">
                                            {project.techStack.map((group, idx) => (
                                                <div key={idx}>
                                                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">{group.category}</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {group.skills.map((skill) => (
                                                            <span
                                                                key={skill}
                                                                className="px-2.5 py-1 text-xs rounded-md bg-white/5 border border-white/10 text-gray-300"
                                                            >
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Architecture/Challenges (Optional) */}
                                {project.architecture && (
                                    <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 mb-8">
                                        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                            <Server size={18} className="text-orange-400" />
                                            System Architecture
                                        </h3>
                                        <p className="text-gray-300 text-sm leading-relaxed">
                                            {project.architecture}
                                        </p>
                                    </div>
                                )}

                            </div>

                            {/* Footer Actions */}
                            {(project.links && project.links.length > 0) && (
                                <div className="p-6 border-t border-white/10 bg-black/20 flex justify-end gap-3">
                                    {project.links.map(link => (
                                        <a
                                            key={link.url}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-colors"
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
