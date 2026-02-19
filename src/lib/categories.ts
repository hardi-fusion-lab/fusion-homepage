export interface Category {
    id: string;
    name: string;
    icon: string;
    color: string;
}

export const CATEGORIES: Category[] = [
    { id: 'react', name: 'React', icon: 'layers', color: 'text-primary' },
    { id: 'http', name: 'HTTP', icon: 'lan', color: 'text-blue-400' },
    { id: 'security', name: 'Web 安全', icon: 'security', color: 'text-red-400' },
    { id: 'performance', name: '性能优化', icon: 'speed', color: 'text-orange-400' },
    { id: 'engineering', name: '前端工程化', icon: 'construction', color: 'text-gray-400' },
    { id: 'architecture', name: '架构设计', icon: 'account_tree', color: 'text-amber-400' },
    { id: 'v8', name: 'V8 引擎', icon: 'memory', color: 'text-sky-400' },
    { id: 'css', name: 'CSS', icon: 'css', color: 'text-pink-400' },
    { id: 'typescript', name: 'TypeScript', icon: 'code', color: 'text-blue-500' },
    { id: 'web3', name: 'Web3', icon: 'currency_bitcoin', color: 'text-yellow-500' },
    { id: 'graphics', name: '图形学', icon: 'palette', color: 'text-purple-400' },
    { id: 'algorithms', name: '算法与数据结构', icon: 'function', color: 'text-emerald-400' },
];
