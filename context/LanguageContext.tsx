"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "zh";

export interface ProjectMedia {
    type: 'image' | 'video';
    url: string;
    caption: string;
}

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
    media?: ProjectMedia[];
}

export interface InsightData {
    id: string;
    title: string;
    summary: string;
    date: string;
    readTime: string;
}

export interface AboutData {
    title: string;
    story: string;
    philosophy: string;
    resumeUrl: string;
}

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    getProjectData: (id: string) => ProjectData | null;
    insights: InsightData[];
    about: AboutData;
}

const translations = {
    en: {
        "nav.projects": "Projects",
        "nav.expertise": "Expertise",
        "nav.insights": "Insights",
        "nav.about": "About",
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
        "insights.title": "Technical Insights",
        "insights.subtitle": "Thoughts on architecture, performance, and engineering.",
        "about.cta": "View CV",
        "collaborators.title": "Collaborators",
    },
    zh: {
        "nav.projects": "项目案例",
        "nav.expertise": "专业技能",
        "nav.insights": "技术洞见",
        "nav.about": "关于我",
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
        "insights.title": "技术洞见",
        "insights.subtitle": "关于架构、性能与工程化的思考。",
        "about.cta": "查看简历",
        "collaborators.title": "合作伙伴",
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
                { category: "Backend", skills: ["NestJS", "Node.js", "Python (CTP Gateway)", "Prisma", "Socket.io", "RxJS"] },
                { category: "Data & Infra", skills: ["PostgreSQL", "Redis", "Docker", "TimescaleDB"] }
            ],
            architecture: "Microservices-inspired modular architecture. Market Data Gateway streams ticks via Redis Pub/Sub to the Matching Engine and Data Service. The Frontend connects via WebSocket for real-time updates of Order Book, Quotes, and Account State. The entire system is type-safe end-to-end using shared TypeScript DTOs.",
            media: [
                { type: 'image', url: 'https://placehold.co/800x450/1e1e1e/3b82f6?text=K-Line+Chart', caption: 'Real-time K-Line Charting with TradingView' },
                { type: 'image', url: 'https://placehold.co/800x450/1e1e1e/8b5cf6?text=Order+Entry', caption: 'High-Performance Order Entry Panel' }
            ]
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
                { category: "后端", skills: ["NestJS", "Node.js", "Python (CTP Gateway)", "Prisma", "Socket.io", "RxJS"] },
                { category: "数据与设施", skills: ["PostgreSQL", "Redis", "Docker", "TimescaleDB"] }
            ],
            architecture: "微服务灵感的模块化架构。行情网关通过 Redis Pub/Sub 将 Tick 数据流式传输到撮合引擎和数据服务。前端通过 WebSocket 连接以实时更新订单簿、行情和账户状态。整个系统使用共享的 TypeScript DTO 实现端到端的类型安全。",
            media: [
                { type: 'image', url: 'https://placehold.co/800x450/1e1e1e/3b82f6?text=Real-time+K-Line', caption: 'TradingView 实时 K 线图表' },
                { type: 'image', url: 'https://placehold.co/800x450/1e1e1e/8b5cf6?text=Order+Execution', caption: '高性能下单面板' }
            ]
        }
    }
};

const insightsData: Record<Language, InsightData[]> = {
    en: [
        { id: "1", title: "Building a Sub-millisecond Matching Engine with Node.js", summary: "Exploring the challenges of event loops, memory management, and data structures when every microsecond counts.", date: "Nov 2024", readTime: "8 min read" },
        { id: "2", title: "Optimizing React Performance for Real-time Market Data", summary: "Techniques for handling thousands of updates per second without freezing the UI: throttling, web workers, and canvas rendering.", date: "Oct 2024", readTime: "6 min read" },
        { id: "3", title: "Why I chose Postgres over MongoDB for Financial Data", summary: "ACID compliance, time-series capabilities with TimescaleDB, and why structured data matters in fintech.", date: "Sep 2024", readTime: "5 min read" }
    ],
    zh: [
        { id: "1", title: "使用 Node.js 构建亚毫秒级撮合引擎", summary: "探讨在分秒必争时，事件循环、内存管理和数据结构面临的挑战。", date: "2024年11月", readTime: "8 分钟阅读" },
        { id: "2", title: "实时行情下的 React 性能优化", summary: "如何在不卡顿 UI 的情况下每秒处理数千次即时更新：节流、Web Workers 和 Canvas 渲染。", date: "2024年10月", readTime: "6 分钟阅读" },
        { id: "3", title: "为何在金融数据上选择 PG 而非 MongoDB", summary: "ACID 合规性、TimescaleDB 的时序能力，以及为何结构化数据在金融科技中至关重要。", date: "2024年9月", readTime: "5 分钟阅读" }
    ]
};

const aboutData: Record<Language, AboutData> = {
    en: {
        title: "From Interface to Infrastructure.",
        story: "With years of experience as a Frontend Engineer, I often felt restricted by the boundaries of my role and the friction in backend integration. I sought a project where I could architect the entire stack to satisfy my curiosity for complete engineering structures. An invitation to develop a trading platform for a futures company became my catalyst—giving me the perfect stage to build a high-performance system from the ground up.",
        philosophy: "I believe true engineering freedom comes from understanding the full stack. My goal is to bridge the gap between design and logic, creating seamless, high-performance experiences born from a unified vision.",
        resumeUrl: "https://docs.google.com/document/d/1jnD8VthgmQIbBbXIDxERZEuXRBJrPFTE3k4wx1m5KMQ/edit?usp=sharing"
    },
    zh: {
        title: "从界面到架构的跨越",
        story: "作为拥有多年经验的前端工程师，我曾受困于仅负责前端开发时与后端交互的种种局限。我对探索完整工程结构的渴望愈发强烈，一直寻找能够从零搭建前后端通盘项目的机会。正逢一家期货交易公司的邀约，我以此为契机，将对全栈架构的热情转化为行动，致力于打造一个高性能、一体化的交易平台。",
        philosophy: "我相信真正的工程自由源于对全链路的掌控。我的目标是消除设计与数据之间的隔阂，用全局的视角构建流畅、高效且浑然一体的系统。",
        resumeUrl: "https://docs.google.com/document/d/1OqKzKPzlbXtf_Ps7kxJob_cMuS3kfFoyawXwvKR-cUc/edit?usp=sharing"
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

    const insights = insightsData[language];
    const about = aboutData[language];

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, getProjectData, insights, about }}>
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
