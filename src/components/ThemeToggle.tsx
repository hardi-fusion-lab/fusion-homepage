import { useState, useEffect } from 'react';

export default function ThemeToggle() {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    useEffect(() => {
        // Check local storage or system preference
        const stored = localStorage.getItem('theme');
        if (stored === 'light' || (!stored && window.matchMedia('(prefers-color-scheme: light)').matches)) {
            setTheme('light');
            document.documentElement.classList.remove('dark');
        } else {
            setTheme('dark');
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);

        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100 group"
            title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
            <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">
                {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
            <span className="text-sm font-medium">
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </span>
        </button>
    );
}
