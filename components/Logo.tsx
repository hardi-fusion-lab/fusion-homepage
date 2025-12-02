"use client";

import { motion } from "framer-motion";

export default function Logo({ className = "w-8 h-8" }: { className?: string }) {
    return (
        <div className={`${className} relative flex items-center justify-center`}>
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
            >
                <defs>
                    <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                </defs>

                {/* Outer Ring */}
                <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="url(#logo-gradient)"
                    strokeWidth="2"
                    strokeOpacity="0.5"
                    initial={{ pathLength: 0, rotate: 0 }}
                    animate={{ pathLength: 1, rotate: 360 }}
                    transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
                />

                {/* Inner Hexagon/Core */}
                <motion.path
                    d="M50 20 L80 35 V65 L50 80 L20 65 V35 Z"
                    stroke="url(#logo-gradient)"
                    strokeWidth="4"
                    fill="none"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />

                {/* Central Pulse */}
                <motion.circle
                    cx="50"
                    cy="50"
                    r="10"
                    fill="url(#logo-gradient)"
                    initial={{ scale: 0.5, opacity: 0.5 }}
                    animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </svg>
        </div>
    );
}
