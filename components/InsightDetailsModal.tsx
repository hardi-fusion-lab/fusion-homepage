"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Calendar, Hand, MessageSquare, Share2 } from "lucide-react";
import { InsightData } from "@/context/LanguageContext";
import { useEffect, useRef, useState } from "react";
import { CopyBlock, atomOneDark } from "react-code-blocks";

interface InsightDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    insight: InsightData | null;
}

export default function InsightDetailsModal({ isOpen, onClose, insight }: InsightDetailsModalProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);

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

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
            const p = (scrollTop / (scrollHeight - clientHeight)) * 100;
            setProgress(p);
        }
    };

    if (!isOpen || !insight) return null;

    // Enhanced Markdown Render Helper
    const renderContent = (content: string) => {
        const blocks = content.split('\n\n');
        return blocks.map((block, index) => {
            // Headers
            if (block.startsWith('### ')) {
                return (
                    <h3 key={index} className="text-2xl font-bold text-white mt-10 mb-6 font-display border-l-4 border-blue-500 pl-4">
                        {block.replace('### ', '')}
                    </h3>
                );
            }
            // Code Blocks (simple detection for now)
            if (block.startsWith('```')) {
                const lines = block.split('\n');
                const lang = lines[0].replace('```', '') || 'text';
                const code = lines.slice(1, -1).join('\n');
                return (
                    <div key={index} className="my-8 rounded-lg overflow-hidden border border-white/10 shadow-lg">
                        <CopyBlock
                            text={code}
                            language={lang}
                            showLineNumbers={false}
                            theme={atomOneDark}
                            codeBlock
                        />
                    </div>
                );
            }
            // Bullet Points
            if (block.startsWith('* ') || block.startsWith('- ')) {
                const items = block.split('\n');
                return (
                    <ul key={index} className="list-disc list-inside space-y-2 mb-6 text-gray-300 ml-4">
                        {items.map((item, i) => (
                            <li key={i} className="leading-relaxed">
                                {item.replace(/^[\*\-]\s/, '')}
                            </li>
                        ))}
                    </ul>
                );
            }
            // Bold Lists / Key-Values
            if (block.includes('**:')) {
                const parts = block.split('**:');
                if (parts.length >= 2) {
                    return (
                        <p key={index} className="text-gray-300 leading-relaxed mb-6 text-lg">
                            <strong className="text-blue-400 font-semibold">{parts[0].replace('**', '')}</strong>
                            {parts[1]}
                        </p>
                    );
                }
            }

            // Standard Paragraph
            return (
                <p key={index} className="text-gray-300 leading-relaxed mb-6 text-lg font-serif tracking-wide">
                    {block.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>').split('<strong').map((part, i) => {
                        if (i === 0) return part;
                        const [bold, rest] = part.split('</strong>');
                        // This is a super naive parser for inline bold, ideally utilize a real markdown lib
                        // For this limitation I will just return plain text if complex, but the block detection above handles major cases.
                        // Let's stick to simple text for safety in this paragraph block unless using dangerouslySetInnerHTML which is risky.
                        // Changing strategy: Just render text.
                        return null;
                    })}
                    {/* Fallback to simple text for now to avoid complexity without a library */}
                    {block.split('**').map((part, i) =>
                        i % 2 === 1 ? <strong key={i} className="text-gray-100 font-medium">{part}</strong> : part
                    )}
                </p>
            );
        });
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center sm:p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/90 backdrop-blur-md"
                />

                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 100 }}
                    className="relative w-full max-w-4xl h-full sm:h-[90vh] bg-[#0A0A0A] sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-white/10"
                >
                    {/* Reading Progress Bar */}
                    <div className="absolute top-0 left-0 w-full h-1 z-50 bg-white/5">
                        <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-100"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    {/* Fixed Header */}
                    <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex justify-between items-center z-40 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                        <div /> {/* Spacer */}
                        <button
                            onClick={onClose}
                            className="pointer-events-auto p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all transform hover:rotate-90"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Content Scrollable Area */}
                    <div
                        ref={scrollRef}
                        onScroll={handleScroll}
                        className="flex-1 overflow-y-auto custom-scrollbar"
                    >
                        {/* Hero Image */}
                        <div className="relative h-[40vh] sm:h-[50vh] w-full">
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent z-10" />
                            <img
                                src={insight.image}
                                alt={insight.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Article Container */}
                        <div className="relative z-20 px-6 sm:px-12 pb-20 -mt-20 max-w-3xl mx-auto">

                            {/* Meta Header */}
                            <div className="mb-10">
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {insight.tags?.map(tag => (
                                        <span key={tag} className="text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-blue-500 text-white shadow-lg shadow-blue-500/20">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <h1 className="text-3xl sm:text-5xl font-bold text-white mb-8 leading-tight">
                                    {insight.title}
                                </h1>

                                <div className="flex items-center justify-between border-y border-white/10 py-6">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={insight.author.avatar}
                                            alt={insight.author.name}
                                            className="w-12 h-12 rounded-full border-2 border-white/10"
                                        />
                                        <div>
                                            <div className="text-white font-medium">{insight.author.name}</div>
                                            <div className="text-sm text-gray-400 flex items-center gap-2">
                                                <span>{insight.date}</span>
                                                <span>·</span>
                                                <span className="flex items-center gap-1">
                                                    <Clock size={12} /> {insight.readTime}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 text-gray-400">
                                        <button className="flex items-center gap-2 hover:text-white transition-colors">
                                            <Hand size={20} />
                                            <span className="text-sm">{insight.claps}</span>
                                        </button>
                                        <button className="hover:text-white transition-colors">
                                            <Share2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="prose prose-invert prose-lg max-w-none">
                                <p className="text-xl text-gray-300 leading-relaxed mb-10 font-light border-l-4 border-gray-700 pl-6 italic">
                                    {insight.summary}
                                </p>
                                {renderContent(insight.content)}
                            </div>

                            {/* Footer Interaction */}
                            <div className="mt-20 pt-10 border-t border-white/10 flex flex-col items-center">
                                <div className="text-2xl mb-6">👏</div>
                                <h3 className="text-xl font-bold text-white mb-2">Did you enjoy this article?</h3>
                                <p className="text-gray-400 text-center max-w-md">
                                    Feel free to reach out if you want to discuss these engineering challenges further.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
