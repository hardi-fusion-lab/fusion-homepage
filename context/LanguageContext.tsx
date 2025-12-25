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
    tags: string[];
    image: string; // Hero image for the article
    author: {
        name: string;
        avatar: string;
        role: string;
    };
    claps: number;
    content: string; // Markdown-like content
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
        "insights.subtitle": "Deep dives into architecture, performance, and engineering challenges.",
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
        "insights.subtitle": "关于架构、性能与工程化的深度思考。",
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
                { category: "Backend", skills: ["NestJS", "Node.js", "Python (CTP Gateway)", "Redis Pub/Sub", "Socket.io", "RxJS"] },
                { category: "Data & Infra", skills: ["PostgreSQL", "Redis", "Docker", "TimescaleDB"] }
            ],
            architecture: "Microservices-inspired modular architecture. Market Data Gateway streams ticks via Redis Pub/Sub to the Matching Engine and Data Service. The Frontend connects via WebSocket for real-time updates of Order Book, Quotes, and Account State. The entire system is type-safe end-to-end using shared TypeScript DTOs.",
            media: [
                { type: 'image', url: '/kline-chart.png', caption: 'Real-time K-Line Charting with TradingView' },
                { type: 'image', url: '/futures-platform-dashboard.png', caption: 'Positions & Orders Management' }
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
                { category: "后端", skills: ["NestJS", "Node.js", "Python (CTP Gateway)", "Redis Pub/Sub", "Socket.io", "RxJS"] },
                { category: "数据与设施", skills: ["PostgreSQL", "Redis", "Docker", "TimescaleDB"] }
            ],
            architecture: "微服务灵感的模块化架构。行情网关通过 Redis Pub/Sub 将 Tick 数据流式传输到撮合引擎和数据服务。前端通过 WebSocket 连接以实时更新订单簿、行情和账户状态。整个系统使用共享的 TypeScript DTO 实现端到端的类型安全。",
            media: [
                { type: 'image', url: '/kline-chart.png', caption: 'Real-time K-Line Charting with TradingView' },
                { type: 'image', url: '/futures-platform-dashboard.png', caption: 'Positions & Orders Management' }
            ]
        }
    }
};

const insightsData: Record<Language, InsightData[]> = {
    en: [
        {
            id: "1",
            title: "Visualizing the Pulse: Frontend Performance in HFT",
            summary: "Implementing a 60FPS Order Book with React, Canvas, and Web Workers under heavy load.",
            date: "Nov 28, 2024",
            readTime: "8 min read",
            tags: ["Frontend", "Performance", "React", "Canvas"],
            image: "https://placehold.co/1200x600/0f172a/38bdf8?text=High-Frequency+Rendering",
            author: { name: "Hardi Hsu", role: "Lead Engineer", avatar: "https://github.com/hardihsu.png" },
            claps: 342,
            content: `In high-frequency trading (HFT) applications, the frontend is not just a UI; it's a real-time data visualization engine. When handling 500+ tick updates per second, React's standard reconciliation process becomes a significant bottleneck.

### The Challenge: React vs. Reality

React is fast, but re-rendering a deep DOM tree 500 times a second creates massive garbage collection (GC) overhead. We encountered significant "stuttering" (jank) in our Order Book component when market volatility spiked. The browser's main thread was choked by layout calculations.

### Solution 1: Throttling & Batching

The first line of defense is decoupling network frequency from render frequency.

\`\`\`javascript
// Instead of updating state on every socket message:
const updateQueue = useRef([]);

useEffect(() => {
  const processQueue = () => {
    if (updateQueue.current.length > 0) {
      // Batch updates
      const batch = updateQueue.current.splice(0);
      updateOrderBookState(batch);
    }
    requestAnimationFrame(processQueue);
  };
  requestAnimationFrame(processQueue);
}, []);
\`\`\`

By using \`requestAnimationFrame\`, we ensure we only attempt to render once per screen refresh (typically 16ms for 60Hz), discarding intermediate states that the human eye can't physically perceive.

### Solution 2: Off-Main-Thread Processing

Data aggregation—such as grouping thousands of Tick data points into OHLC (Open, High, Low, Close) bars—is CPU intensive. We offloaded this entire computation to **Web Workers**.

The Main Thread now effectively becomes a "dumb renderer," while the Worker Thread handles the heavy lifting of data normalization and structure. This keeps the UI responsive even during "market crashes" when data volume explodes.

### Solution 3: Canvas for Level 2 Data

For the Depth of Market (DOM) visualization, DOM elements are too heavy. We switched to the HTML5 \`<canvas>\` API. By drawing the depth chart as simple rectangles on a canvas layer, we bypass the browser's Layout and Paint composite stages entirely for those elements.

**Result**: We achieved consistent <16ms frame times (60FPS) even when processing 2,000+ messages per second.`
        },
        {
            id: "2",
            title: "Microservices: Python for CTP, Node.js for Web",
            summary: "Decoupling legacy financial interfaces from modern web architecture using Redis Pub/Sub.",
            date: "Oct 15, 2024",
            readTime: "12 min read",
            tags: ["Backend", "Python", "Microservices", "Redis"],
            image: "https://placehold.co/1200x600/1e293b/4ade80?text=Polyglot+Architecture",
            author: { name: "Hardi Hsu", role: "Lead Engineer", avatar: "https://github.com/hardihsu.png" },
            claps: 215,
            content: `China's CTP (Comprehensive Transaction Platform) is the industry standard for futures trading, but primarily offers C++ and Python SDKs. Our core application stack, however, is built on Node.js/NestJS for its superior WebSocket handling and developer experience.

### The Polyglot Challenge

We needed a way to bridge the gap between the Python-based CTP interface and our Node.js web services. Directly embedding Python in Node (or vice-versa) often leads to brittle, hard-to-debug "Frankenstein" processes.

### Solution: The Redis Gateway Pattern

We decoupled the system into two distinct services communicating purely via **Redis Pub/Sub**:

1.  **The Connectivity Layer (Python)**:
    *   Uses \`openctp-ctp\` or \`swig\` bindings to talk to the exchange.
    *   It is a "dumb pipe". It receives \`OnRtnDepthMarketData\`, serializes the struct to JSON/MsgPack, and PUBLISHes it to Redis channels (e.g., \`market.data.au2401\`).
    *   **Advantage**: If the Python process crashes (due to a CTP segmentation fault), the main Web Server remains unaffected. We simply leverage Docker swarm/Kubernetes to auto-restart the Python container.

2.  **The Application Layer (Node.js)**:
    *   Subscribes to Redis channels.
    *   Forwards updates to frontend clients via Socket.io.
    *   Handles authentication, permissioning, and business logic.

\`\`\`python
# Python CTP Callback
def OnRtnDepthMarketData(self, pDepthMarketData):
    tick = {
        "instrument": pDepthMarketData.InstrumentID,
        "price": pDepthMarketData.LastPrice,
        "volume": pDepthMarketData.Volume
    }
    # Fire and forget - ultra low latency
    redis_client.publish(f"market.{tick['instrument']}", json.dumps(tick))
\`\`\`

### Why not use ZeroMQ or gRPC?

While ZeroMQ is faster, Redis provided us with an invaluable feature for free: **Persistence and Inspection**. During development, we could simply allow the Python gateway to run and inspect the Redis keys to verify data integrity without needing the Node.js backend to be online.`
        },
        {
            id: "3",
            title: "Hybrid Protocols: HTTP, WebSocket & TCP",
            summary: "Designing a robust communication layer for trading systems by combining the best of all worlds.",
            date: "Sep 10, 2024",
            readTime: "9 min read",
            tags: ["Network", "System Design", "WebSockets"],
            image: "https://placehold.co/1200x600/0f172a/a78bfa?text=Hybrid+Architecture",
            author: { name: "Hardi Hsu", role: "Lead Engineer", avatar: "https://github.com/hardihsu.png" },
            claps: 189,
            content: `A trading system isn't just one pipe; it's a complex network topology. We adopted a hybrid protocol architecture to balance reliability, speed, and standard compliance.

### The Core Triad

1.  **HTTP (REST)**: Management Layer.
    *   *Usage*: User Login, History Reports, Settings, Static Data.
    *   *Why*: Reliability and Caching are more important here than raw speed. It's stateless and cache-friendly.

2.  **WebSocket**: The Live Pulse.
    *   *Usage*: Real-time Market Data, Order Status Updates.
    *   *Why*: Persistent connection eliminates the HTTP handshake overhead. Essential for "Push" notifications.

3.  **TCP / IPC**: The Gateway Backbone.
    *   *Usage*: Internal communication between the Matching Engine and the Gateway.
    *   *Why*: Maximum throughput, minimal overhead.

### Managing State Across Protocols

One of the biggest challenges in a hybrid system is keeping the "Snapshot" (HTTP) consistent with the "Stream" (WebSocket).

**The Sequence ID Strategy**:
Every event in the system (e.g., An order fill) is assigned a strictly increasing Sequence ID (101, 102, 103...).

1.  User loads page (HTTP): Fetches Order History. Latest SeqID = **100**.
2.  WebSocket connects: Subscribes to updates.
3.  WebSocket receives usage: "Order Filled. SeqID = **102**".
4.  **Gap Detection**: Frontend notices it missed SeqID **101**. It (or the socket lib) immediately requests a "Gap Fill" for 101.

This ensures that even if the network fluctuates when switching from REST to Socket, the user's view of their account remains mathematically consistent.

### The "Heartbeat" Strategy

Mobile networks are unreliable. We implemented an application-level Heartbeat (Ping/Pong) every 3 seconds.

*   If the frontend misses 2 Pongs, it enters "Reconnecting" mode.
*   Outgoing orders are queued locally in Redux/Zustand.
*   Upon reconnection, the queue is flushed (with a validity check) to ensure no user intent is lost during a brief tunnel outage.`
        },
        {
            id: "4",
            title: "The Event Loop: Single-Threaded Matching",
            summary: "Why we built our Matching Engine in Node.js, and how we optimized it.",
            date: "Aug 22, 2024",
            readTime: "10 min read",
            tags: ["Backend", "Performance", "Algorithms"],
            image: "https://placehold.co/1200x600/172554/60a5fa?text=Event+Loop+Architecture",
            author: { name: "Hardi Hsu", role: "Lead Engineer", avatar: "https://github.com/hardihsu.png" },
            claps: 276,
            content: `Conventional wisdom says "Don't use Node.js for CPU-intensive tasks." Yet, we built our core Matching Engine in Node. Why?

### The Reality of Matching

Matching an order is actually O(1) or O(log N). It's simple arithmetic: \`if (buyPrice >= sellPrice) execute()\`.
The real bottlenecks in trading systems are **IO** (Database writes) and **Lock Contention**.

### Enter the Single-Threaded Model

Multi-threaded engines (Java/C++) require complex Locks (Mutexes) to prevent race conditions when two orders try to hit the same resting liquidity. Locks are expensive; they cause context switching.

**Node.js is Single-Threaded.**
This means we have **Zero Lock Contention**. We don't need to lock the Order Book. We just process events one by one, in order.

### The LMAX Disruptor Pattern in JS

We adopted an architecture similar to the LMAX Disruptor.

1.  **Ring Buffer**: We pre-allocate memory for incoming order events to avoid Garbage Collection.
2.  **Journaling**: Instead of writing to a DB (slow), we append every event to a simplified "Append-Only File" (AOF) on disk asynchronously.
3.  **In-Memory State**: The entire state of the exchange lives in RAM.

### Performance Results

By removing locks and DB waits from the hot path, our Node.js engine can process **15,000 orders per second** on a single CPU core. This is more than enough for our simulation needs and drastically simplifies the codebase compared to a multi-threaded C++ engine.`
        }
    ],
    zh: [
        {
            id: "1",
            title: "可视化脉搏：前端高频渲染性能优化",
            summary: "在高负载下利用 React、Canvas 和 Web Workers 实现 60FPS 订单簿渲染。",
            date: "2024年11月28日",
            readTime: "8 分钟阅读",
            tags: ["前端", "性能优化", "React", "Canvas"],
            image: "https://placehold.co/1200x600/0f172a/38bdf8?text=High-Frequency+Rendering",
            author: { name: "Hardi Hsu", role: "Lead Engineer", avatar: "https://github.com/hardihsu.png" },
            claps: 342,
            content: `在高频交易 (HFT) 应用中，前端不仅仅是 UI，更是一个实时数据可视化引擎。当每秒需要处理 500+ 个 Tick 更新时，React 标准的 Reconciliation（协调）过程成为一个显著的瓶颈。

### 挑战：React 机制与现实需求的冲突

React 很快，但每秒重新渲染深层 DOM 树 500 次会产生巨大的垃圾回收 (GC) 开销。在市场波动剧烈时，我们发现订单簿组件出现了明显的“卡顿” (Jank)。浏览器的主线程被布局计算（Layout Calculation）占满了。

### 方案一：节流 (Throttling) 与批量处理 (Batching)

第一道防线是将网络频率与渲染频率解耦。

\`\`\`javascript
// 不要直接在 WebSocket 回调中更新状态：
const updateQueue = useRef([]);

useEffect(() => {
  const processQueue = () => {
    if (updateQueue.current.length > 0) {
      // 批量处理所有堆积的更新
      const batch = updateQueue.current.splice(0);
      updateOrderBookState(batch);
    }
    requestAnimationFrame(processQueue);
  };
  requestAnimationFrame(processQueue);
}, []);
\`\`\`

通过使用 \`requestAnimationFrame\`，我们确保每屏幕刷新周期（通常为 60Hz 的 16ms）只尝试渲染一次，丢弃人眼在物理上无法捕捉的中间状态。

### 方案二：脱离主线程计算 (Web Workers)

数据聚合——例如将数千个 Tick 数据点归组为 Tick 图或 K 线图——是 CPU 密集型的。我们将这部分计算全部卸载到了 **Web Workers** 中。

主线程现在实际上变成了一个“哑渲染器”，而 Worker 线程负责数据的标准化和结构化。这使得即使在数据量爆炸的“崩盘”行情下，UI 依然能保持响应。

### 方案三：使用 Canvas 处理深度数据

对于 Level 2 深度图（Depth Chart），DOM 元素太重了。我们切换到了 HTML5 \`<canvas>\` API。通过在 Canvas 图层上绘制简单的矩形来表示深度，我们完全绕过了浏览器的布局（Layout）和绘制（Paint）合成阶段。

**结果**：即使在每秒处理 2,000+ 条消息的情况下，我们也实现了稳定的 <16ms 帧时间 (60FPS)。`
        },
        {
            id: "2",
            title: "微服务架构：Python CTP 网关与 Redis",
            summary: "解耦传统金融接口与现代 Web 架构：基于 Redis Pub/Sub 的网关模式。",
            date: "2024年10月15日",
            readTime: "12 分钟阅读",
            tags: ["后端", "Python", "微服务", "Redis"],
            image: "https://placehold.co/1200x600/1e293b/4ade80?text=Polyglot+Architecture",
            author: { name: "Hardi Hsu", role: "Lead Engineer", avatar: "https://github.com/hardihsu.png" },
            claps: 215,
            content: `国内期货交易的行业标准是 CTP（综合交易平台）。CTP 提供了优秀的 Python SDK（如 openctp）。而我们的核心应用栈是基于 Node.js/NestJS 构建的，因为 Node 在处理 WebSocket 和 Web 业务逻辑方面具有更好的开发者体验。

### 多语言栈的挑战

我们需要一种方法来连接 Python CTP 接口和 Node.js Web 服务。直接在 Node 中嵌入 Python（反之亦然）往往会导致脆弱、难以调试的“缝合怪”进程。

### 解决方案：Redis 网关模式

我们将系统解耦为两个完全独立的服务，纯粹通过 **Redis Pub/Sub** 进行通信：

1.  **连接层 (Python)**:
    *   使用 \`openctp-ctp\` 或 \`swig\` 绑定与交易所通讯。
    *   它是一个“哑管道”。它接收 \`OnRtnDepthMarketData\`，将结构体序列化为 JSON/MsgPack，然后 PUBLISH 到 Redis 频道（例如 \`market.data.au2401\`）。
    *   **优势**: 如果 Python 进程崩溃（由于 CTP 底层段错误），主 Web 服务器完全不受影响。我们可以简单地利用 Docker Swarm/Kubernetes 自动重启 Python 容器。

2.  **应用层 (Node.js)**:
    *   订阅 Redis 频道。
    *   通过 Socket.io 将更新转发给前端客户端。
    *   处理认证、权限和业务逻辑。

\`\`\`python
# Python CTP 回调
def OnRtnDepthMarketData(self, pDepthMarketData):
    tick = {
        "instrument": pDepthMarketData.InstrumentID,
        "price": pDepthMarketData.LastPrice,
        "volume": pDepthMarketData.Volume
    }
    # 射后不理 (Fire and forget) - 极低延迟
    redis_client.publish(f"market.{tick['instrument']}", json.dumps(tick))
\`\`\`

### 为什么不用 ZeroMQ 或 gRPC?

虽然 ZeroMQ 可能更快，但 Redis 免费为我们提供了一个宝贵的功能：**持久化与即时检查**。在开发过程中，我们可以只运行 Python 网关，并通过 inspect Redis keys 来验证数据完整性，而无需启动 Node.js 后端。`
        },
        {
            id: "3",
            title: "混合架构：HTTP、WebSocket 与 TCP",
            summary: "结合多种协议的优势，设计一个鲁棒的交易系统通信层。",
            date: "2024年9月10日",
            readTime: "9 分钟阅读",
            tags: ["网络", "系统设计", "WebSocket"],
            image: "https://placehold.co/1200x600/0f172a/a78bfa?text=Hybrid+Architecture",
            author: { name: "Hardi Hsu", role: "Lead Engineer", avatar: "https://github.com/hardihsu.png" },
            claps: 189,
            content: `交易系统不仅仅是一条管道，它是一个复杂的网络拓扑。我们采用了混合协议架构来平衡可靠性、速度和标准遵从性。

### 核心三要素

1.  **HTTP (REST)**: 管理层。
    *   *用途*: 用户登录、历史报表、设置、静态数据。
    *   *原因*: 在这里，可靠性和缓存比原始速度更重要。它是无状态且对缓存友好的。

2.  **WebSocket**: 实时脉搏。
    *   *用途*: 实时市场行情、订单状态更新。
    *   *原因*: 持久连接消除了 HTTP 握手开销。这通过对于“推送”类通知至关重要。

3.  **TCP / IPC**: 这网关骨干。
    *   *用途*: 撮合引擎与网关之间的内部通信。
    *   *原因*: 最大吞吐量，最小开销。

### 跨协议的状态管理

混合系统最大的挑战之一是保持“快照” (HTTP) 与“流” (WebSocket) 的一致性。

**序列号 (Sequence ID) 策略**:
系统中的每个事件（例如，订单成交）都分配有一个严格递增的序列 ID（101, 102, 103...）。

1.  用户加载页面 (HTTP): 获取订单历史。最新 SeqID = **100**。
2.  WebSocket 连接: 订阅更新。
3.  WebSocket 接收更新: "订单成交。SeqID = **102**"。
4.  **缺口检测**: 前端注意到错过了 SeqID **101**。它（或 Socket 库）立即请求“填补缺口”获取 101。

这确保了即使用户在从 REST 切换到 Socket 时网络波动，他们账户的试图在数学上也是保持一致的。

### “心跳”策略

移动网络是不可靠的。我们实现了每 3 秒一次的应用层心跳 (Ping/Pong)。

*   如果前端丢失了 2 个 Pong，它将进入“重连”模式。
*   发出的订单会在本地 Redux/Zustand 中排队。
*   重连后，队列会被刷新（带有时效性检查），以确保在短暂的隧道中断期间不会丢失用户意图。`
        },
        {
            id: "4",
            title: "事件循环：单线程撮合引擎的设计",
            summary: "为什么我们在 Node.js 而不是 Java 中构建核心撮合引擎，以及我们如何优化它。",
            date: "2024年8月22日",
            readTime: "10 分钟阅读",
            tags: ["后端", "性能优化", "算法"],
            image: "https://placehold.co/1200x600/172554/60a5fa?text=Event+Loop+Architecture",
            author: { name: "Hardi Hsu", role: "Lead Engineer", avatar: "https://github.com/hardihsu.png" },
            claps: 276,
            content: `传统观点认为“不要用 Node.js 做 CPU 密集型任务”。然而，我们用 Node 构建了我们的核心撮合引擎。为什么？

### 撮合的真相

撮合一个订单实际上是 O(1) 或 O(log N) 的操作。它只是简单的算术：\`if (buyPrice >= sellPrice) execute()\`.
交易系统真正的瓶颈是 **IO** (数据库写入) 和 **锁竞争 (Lock Contention)**。

### 进入单线程模型

多线程引擎 (Java/C++) 需要复杂的锁 (Mutexes) 来防止当两个订单试图打击同一流动性时出现的竞争条件。锁是昂贵的；它们导致上下文切换。

**Node.js 是单线程的。**
这意味着由于我们拥有 **零锁竞争**。我们不需要锁定订单簿。我们只是按顺序逐个处理事件。

### JS 中的 LMAX Disruptor 模式

我们采用了类似于 LMAX Disruptor 的架构。

1.  **环形缓冲区 (Ring Buffer)**: 我们为传入的订单事件预分配内存，以避免垃圾回收 (GC)。
2.  **日志化 (Journaling)**: 我们不写入数据库（太慢），而是将每个事件异步追加到磁盘上简化的“仅追加文件” (AOF) 中。
3.  **内存状态**: 交易所的整个状态都存在于 RAM 中。

### 性能结果

通过从热路径中移除锁和数据库等待，我们的 Node.js 引擎可以在单个 CPU 核心上处理 **每秒 15,000 个订单**。这对于我们的模拟需求来说绰绰有余，并且与多线程 C++ 引擎相比，代码库大大简化。`
        }
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
