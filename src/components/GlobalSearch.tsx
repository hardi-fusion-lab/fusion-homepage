import { useState, useEffect, useRef } from 'react';

interface SearchResult {
    title: string;
    slug: string;
    category: string;

}

export default function GlobalSearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [index, setIndex] = useState<SearchResult[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Fetch search index on mount
        fetch('/api/search.json')
            .then(res => res.json())
            .then(data => setIndex(data))
            .catch(err => console.error('Failed to load search index:', err));

        // Click outside to close
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (query.trim() === '') {
            setResults([]);
            return;
        }

        const filtered = index.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 10); // Limit to 10 results

        setResults(filtered);
        setIsOpen(true);
    }, [query, index]);

    return (
        <div className="relative w-full" ref={wrapperRef}>
            <div className="relative group">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-lg group-focus-within:text-primary transition-colors">
                    search
                </span>
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query && setIsOpen(true)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-900/50 border-none rounded-lg text-sm focus:ring-1 focus:ring-primary placeholder-slate-400 dark:placeholder-slate-600 text-slate-900 dark:text-slate-100 interaction-shadow transition-all"
                    placeholder="全局搜索..."
                    type="text"
                />
            </div>

            {isOpen && results.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
                    {results.map((result) => (
                        <a
                            key={result.slug}
                            href={`/questions/${result.slug}`}
                            className="block p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 border-b border-slate-100 dark:border-slate-700/50 last:border-0 transition-colors"
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-1.5 py-0.5 rounded">
                                    {result.category}
                                </span>
                                <span className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{result.title}</span>
                            </div>

                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}
