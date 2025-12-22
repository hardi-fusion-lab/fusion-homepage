"use client";

import { motion } from "framer-motion";

export default function Logo({ className = "w-8 h-8" }: { className?: string }) {
    return (
        <div className={`${className} relative flex items-center justify-center`}>
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-lg"
            >
                <defs>
                    <linearGradient id="face-top" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#60A5FA" /> {/* blue-400 */}
                        <stop offset="100%" stopColor="#3B82F6" /> {/* blue-500 */}
                    </linearGradient>
                    <linearGradient id="face-left" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" /> {/* blue-500 */}
                        <stop offset="100%" stopColor="#2563EB" /> {/* blue-600 */}
                    </linearGradient>
                    <linearGradient id="face-right" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#8B5CF6" /> {/* violet-500 */}
                        <stop offset="100%" stopColor="#7C3AED" /> {/* violet-600 */}
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                <motion.g
                    initial={{ y: 0 }}
                    animate={{ y: [-2, 2, -2] }}
                    transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
                >
                    {/* Isometric Cube Faces */}

                    {/* Top Face */}
                    <motion.path
                        d="M50 20 L80 35 L50 50 L20 35 Z"
                        fill="url(#face-top)"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="1"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    />

                    {/* Left Face */}
                    <motion.path
                        d="M20 35 L50 50 V80 L20 65 Z"
                        fill="url(#face-left)"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="1"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    />

                    {/* Right Face */}
                    <motion.path
                        d="M80 35 L50 50 V80 L80 65 Z"
                        fill="url(#face-right)"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="1"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    />

                    {/* Inner Core/Glow */}
                    <motion.circle
                        cx="50"
                        cy="45"
                        r="6"
                        fill="white"
                        filter="url(#glow)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.4, 0.8, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </motion.g>
            </svg>
        </div>
    );
}
