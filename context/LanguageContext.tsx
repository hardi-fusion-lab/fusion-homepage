"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "zh";

export interface ProjectData {
    id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    tags: string[];
    features: string[];
    techStack: { category: string; skills: string[] }[];
    architecture?: string;
    links?: { label: string; url: string }[];
}

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    getProjectData: (id: string) => ProjectData | null;
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
        "project.futures.desc": "A high-performance, real-time futures trading simulator designed for professional trader training.",
        "project.quant.title": "Quantitative Order Execution System",
        "project.quant.desc": "Algorithmic trading execution engine capable of handling complex order strategies. (Currently in development)",
        "project.portfolio.title": "Hardi Fusion Lab Portfolio",
        "project.portfolio.desc": "The platform you are currently viewing. Built with Next.js 14, Server Components, and Tailwind CSS.",
        "project.coming_soon": "Coming Soon",
        "footer.rights": "All rights reserved.",
        "btn.read_more": "Read More",
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
        "project.futures.desc": "专为专业交易员培训设计的高性能实时期货交易模拟器。",
        "project.quant.title": "量化下单执行系统",
        "project.quant.desc": "能够处理复杂订单策略的算法交易执行引擎。（目前正在开发中）",
        "project.portfolio.title": "Hardi Fusion Lab 官网",
        "project.portfolio.desc": "您当前访问的平台。使用 Next.js 14、Server Components 和 Tailwind CSS 构建。",
        "project.coming_soon": "暂未开放",
        "footer.rights": "保留所有权利。",
        "btn.read_more": "了解更多",
    },
};

const projectData: Record<Language, Record<string, ProjectData>> = {
    en: {
        "futures_platform": {
            id: "futures_platform",
            title: "Futures Trading Simulation Platform",
            shortDescription: "A high-performance, real-time futures trading simulator designed for professional trader training.",
            fullDescription: "A comprehensive futures trading simulation environment built to mimic real-world exchange behavior. It provides a risk-free environment for traders to test strategies, featuring real-time market data, sub-millisecond order matching, and strict risk management controls.\n\nThe platform combines a C-Client for trader interaction, an Admin Dashboard for system management, and a robust backend engine handling market data ingestion and trade execution.",
            tags: ["React", "NestJS", "WebSocket", "PostgreSQL", "High Performance"],
            features: [
                "Real-time K-Line charting with TradingView Lightweight Charts integration.",
                "Tick-to-Bar data aggregation engine for historical data analysis.",
                "Sub-millisecond order matching simulation engine.",
                "Real-time P&L calculation and comprehensive position management.",
                "Admin Dashboard for instrument management, user controls, and fee templates.",
                "CTP Gateway integration for live market data ingestion from futures exchanges.",
                "Strict risk management implementation including margin calculation and liquidation logic."
            ],
            techStack: [
                { category: "Frontend", skills: ["React", "TypeScript", "Tailwind CSS", "Zustand", "TradingView Lib"] },
                { category: "Backend", skills: ["NestJS", "Node.js", "Prisma", "Socket.io", "RxJS"] },
                { category: "Data & Infra", skills: ["PostgreSQL", "Redis", "Docker", "TimescaleDB"] }
            ],
            architecture: "Microservices-inspired modular architecture. Market Data Gateway streams ticks via Redis Pub/Sub to the Matching Engine and Data Service. The Frontend connects via WebSocket for real-time updates of Order Book, Quotes, and Account State. The entire system is type-safe end-to-end using shared TypeScript DTOs."
        }
    },
    zh: {
        "futures_platform": {
            id: "futures_platform",
            title: "期货模拟交易平台",
            shortDescription: "专为专业交易员培训设计的高性能实时期货交易模拟器。",
            fullDescription: "一个旨在模拟真实交易所行为的综合期货交易模拟环境。它为交易员提供了一个无风险的策略测试环境，具有实时市场数据、亚毫秒级撮合模拟和严格的风控管理。\n\n该平台结合了供交易员使用的 C 端客户端、用于系统管理的管理端后台，以及处理行情接入和交易执行的强大后端引擎。",
            tags: ["React", "NestJS", "WebSocket", "PostgreSQL", "High Performance"],
            features: [
                "集成 TradingView Lightweight Charts 的实时 K 线图表。",
                "用于历史数据分析的 Tick-to-Bar 合成引擎。",
                "亚毫秒级订单撮合模拟引擎。",
                "实时盈亏计算和全面的持仓管理。",
                "用于合约管理、用户控制和费率模板的后台管理系统。",
                "用于接入期货交易所实时行情的 CTP 网关集成。",
                "严格的风险管理实施，包括保证金计算和强平逻辑。"
            ],
            techStack: [
                { category: "前端", skills: ["React", "TypeScript", "Tailwind CSS", "Zustand", "TradingView Lib"] },
                { category: "后端", skills: ["NestJS", "Node.js", "Prisma", "Socket.io", "RxJS"] },
                { category: "数据与设施", skills: ["PostgreSQL", "Redis", "Docker", "TimescaleDB"] }
            ],
            architecture: "微服务灵感的模块化架构。行情网关通过 Redis Pub/Sub 将 Tick 数据流式传输到撮合引擎和数据服务。前端通过 WebSocket 连接以实时更新订单簿、行情和账户状态。整个系统使用共享的 TypeScript DTO 实现端到端的类型安全。"
        }
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>("en");

    const t = (key: string) => {
        return translations[language][key as keyof typeof translations["en"]] || key;
    };

    const getProjectData = (id: string): ProjectData | null => {
        return projectData[language][id] || null;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, getProjectData }}>
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
