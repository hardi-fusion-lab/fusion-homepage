"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "zh";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations = {
    en: {
        "nav.projects": "Projects",
        "nav.expertise": "Expertise",
        "hero.badge": "Available for new opportunities",
        "hero.title.prefix": "Fusing",
        "hero.title.highlight": "Intelligence",
        "hero.title.suffix": "with Performance.",
        "hero.description": "Full-stack development studio specializing in high-performance trading platforms, cloud-native architecture, and quantitative analysis systems.",
        "hero.cta.projects": "View Selected Work",
        "hero.cta.contact": "Contact Me",
        "skills.title": "Technical Expertise",
        "skills.subtitle": "Comprehensive full-stack capabilities from silicon to screen.",
        "skills.frontend": "Frontend Engineering",
        "skills.backend": "Backend & Data",
        "skills.cloud": "Cloud & Architecture",
        "projects.title": "Featured Projects",
        "projects.subtitle": "Real-world applications driving business value.",
        "project.futures.title": "Futures Trading Simulation Platform",
        "project.futures.desc": "A high-performance, real-time futures trading simulator designed for professional trader training. Features sub-millisecond order matching simulation, real-time market data streaming via WebSockets, and complex risk management algorithms.",
        "project.quant.title": "Quantitative Order Execution System",
        "project.quant.desc": "Algorithmic trading execution engine capable of handling complex order strategies. (Currently in development)",
        "project.portfolio.title": "Hardi Fusion Lab Portfolio",
        "project.portfolio.desc": "The platform you are currently viewing. Built with Next.js 14, Server Components, and Tailwind CSS to demonstrate modern full-stack capabilities.",
        "project.coming_soon": "Coming Soon",
        "footer.rights": "All rights reserved.",
    },
    zh: {
        "nav.projects": "项目案例",
        "nav.expertise": "专业技能",
        "hero.badge": "接受新项目合作",
        "hero.title.prefix": "融合",
        "hero.title.highlight": "智慧",
        "hero.title.suffix": "与极致性能。",
        "hero.description": "专注于高性能交易平台、云原生架构和量化分析系统的全栈开发工作室。",
        "hero.cta.projects": "查看精选作品",
        "hero.cta.contact": "联系我",
        "skills.title": "技术专长",
        "skills.subtitle": "从底层架构到前端交互的全栈开发能力。",
        "skills.frontend": "前端工程",
        "skills.backend": "后端与数据",
        "skills.cloud": "云原生架构",
        "projects.title": "精选项目",
        "projects.subtitle": "创造商业价值的实战应用。",
        "project.futures.title": "期货模拟交易平台",
        "project.futures.desc": "专为专业交易员培训设计的高性能实时期货交易模拟器。具备亚毫秒级撮合模拟、WebSocket 实时行情推送以及复杂的风控算法。",
        "project.quant.title": "量化下单执行系统",
        "project.quant.desc": "能够处理复杂订单策略的算法交易执行引擎。（目前正在开发中）",
        "project.portfolio.title": "Hardi Fusion Lab 官网",
        "project.portfolio.desc": "您当前访问的平台。使用 Next.js 14、Server Components 和 Tailwind CSS 构建，展示现代全栈开发能力。",
        "project.coming_soon": "暂未开放",
        "footer.rights": "保留所有权利。",
    },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>("en");

    const t = (key: string) => {
        return translations[language][key as keyof typeof translations["en"]] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
