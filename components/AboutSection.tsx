"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Download } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutSection() {
    const { t, about } = useLanguage();

    return (
        <section className="py-20 px-6 bg-white/[0.02]">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            {about.title}
                        </h2>
                        <div className="space-y-6 text-gray-300 leading-relaxed">
                            <p>{about.story}</p>
                            <p className="font-medium text-white border-l-2 border-blue-500 pl-4">
                                {about.philosophy}
                            </p>
                        </div>

                        {/* Resume Download - Disabled for now
                        <div className="mt-8">
                            <button className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors">
                                <Download size={18} />
                                {t("about.cta")}
                            </button>
                        </div>
                        */}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Image Representation */}
                        <div className="aspect-square rounded-2xl border border-white/10 p-2 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-blue-500/10 blur-3xl group-hover:bg-blue-500/20 transition-colors duration-500" />
                            <img
                                src="/about-visual.png"
                                alt="Fusion of Design and Logic"
                                className="w-full h-full object-cover rounded-xl"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 text-center">
                                <div className="text-6xl font-bold text-white mb-2 shadow-sm drop-shadow-lg">7+</div>
                                <div className="text-sm text-gray-300 uppercase tracking-widest font-medium text-shadow">Years of Experience</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
