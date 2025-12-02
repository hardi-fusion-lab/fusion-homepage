"use client";

import { useState } from "react";
import { Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const toggleLang = (newLang: "en" | "zh") => {
    setLanguage(newLang);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white bg-white/5 rounded-full backdrop-blur-sm border border-white/10 cursor-pointer cursor-pointer"
      >
        <Globe size={16} />
        <span className="uppercase">{language}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-24 bg-black/90 border border-white/10 rounded-lg shadow-xl backdrop-blur-md overflow-hidden z-50"
          >
            <button
              onClick={() => toggleLang("en")}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-white/10 transition-colors ${language === "en" ? "text-blue-400" : "text-gray-400"
                }`}
            >
              English
            </button>
            <button
              onClick={() => toggleLang("zh")}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-white/10 transition-colors ${language === "zh" ? "text-blue-400" : "text-gray-400"
                }`}
            >
              中文
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
