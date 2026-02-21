"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { Github } from "lucide-react";

export default function CollaboratorsSection() {
    const { t } = useLanguage();

    const collaborators = [
        {
            name: "limuran",
            github: "https://github.com/limuran",
            image: "https://github.com/limuran.png"
        },
        {
            name: "sugar",
            github: "https://github.com/luolina111",
            image: "https://github.com/luolina111.png"
        }
    ];

    return (
        <section className="py-20 px-6 border-t border-white/5">
            <div className="max-w-7xl mx-auto text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl font-semibold mb-12 text-gray-200"
                >
                    {t("collaborators.title")}
                </motion.h2>

                <div className="flex flex-wrap justify-center gap-12">
                    {collaborators.map((collab, index) => (
                        <motion.a
                            key={collab.name}
                            href={collab.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group flex flex-col items-center gap-4"
                        >
                            <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-blue-500/50 transition-colors duration-300">
                                <img
                                    src={collab.image}
                                    alt={collab.name}
                                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
                                />
                                <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Github className="text-white drop-shadow-md" size={24} />
                                </div>
                            </div>
                            <span className="text-gray-400 font-medium group-hover:text-blue-400 transition-colors">
                                @{collab.name}
                            </span>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
