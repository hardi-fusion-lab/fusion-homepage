export interface Category {
    id: string;
    name: string;
    icon: string;
    color: string;
    description: string;
}

export const CATEGORIES: Category[] = [
    { id: 'react', name: 'React', icon: 'layers', color: 'text-primary', description: '深入探讨渲染生命周期、状态管理和组件架构。' },
    { id: 'javascript', name: 'JS 核心原理', icon: 'terminal', color: 'text-yellow-400', description: '掌握执行上下文、异步范式以及 Web 核心语言的运行机制。' },
    { id: 'http', name: '网络协议', icon: 'lan', color: 'text-blue-400', description: '精通网络协议、缓存策略以及安全通信。' },
    { id: 'security', name: 'Web 安全', icon: 'security', color: 'text-red-400', description: '深度防御策略，涵盖 XSS、CSRF 和现代安全头设计。' },
    { id: 'performance', name: '性能优化', icon: 'speed', color: 'text-orange-400', description: '关键渲染路径、V8 引擎和 Web Workers 的优化技巧。' },
    { id: 'engineering', name: '前端工程化', icon: 'construction', color: 'text-gray-400', description: 'CI/CD、构建工具以及面向规模化的现代 Monorepo 架构。' },
    { id: 'architecture', name: '架构与设计模式', icon: 'account_tree', color: 'text-amber-400', description: '系统设计、设计模式以及模块化前端架构。' },
    { id: 'v8', name: 'V8 引擎原理', icon: 'memory', color: 'text-sky-400', description: '理解 JIT 编译、内存管理和垃圾回收机制。' },
    { id: 'css', name: 'CSS', icon: 'css', color: 'text-pink-400', description: '高级布局、动画性能以及现代样式系统。' },
    { id: 'typescript', name: 'TypeScript', icon: 'code', color: 'text-blue-500', description: '静态类型、高级泛型模式以及高阶类型安全。' },
    { id: 'web3', name: 'Web3 探索', icon: 'currency_bitcoin', color: 'text-yellow-500', description: '区块链协议、智能合约以及去中心化应用逻辑。' },
    { id: 'graphics', name: '图形学', icon: 'palette', color: 'text-purple-400', description: 'WebGL、Canvas API 以及高性能交互式图形。' },
    { id: 'algorithms', name: '数据结构与算法', icon: 'function', color: 'text-emerald-400', description: '基础数据结构与高效的算法问题解决方案。' },
];
