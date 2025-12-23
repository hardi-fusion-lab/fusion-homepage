"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";

interface InsightCardProps {
    title: string;
    summary: string;
    date: string;
    readTime: string;
    onClick?: () => void;
}

export default function InsightCard({ title, summary, date, readTime, onClick }: InsightCardProps) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            onClick={onClick}
            className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
        >
            <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                <span>{date}</span>
                <span className="w-1 h-1 rounded-full bg-gray-500" />
                <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{readTime}</span>
                </div>
            </div>

            <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                {title}
            </h3>

            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {summary}
            </p>

            <div className="flex items-center gap-2 text-sm font-medium text-blue-400 opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                Read Article <ArrowRight size={16} />
            </div>
        </motion.div>
    );
}
