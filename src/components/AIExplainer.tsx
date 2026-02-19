import { useState } from 'react';

interface Props {
    topic: string;
}

export default function AIExplainer({ topic }: Props) {
    const [response, setResponse] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleAsk = async () => {
        setLoading(true);

        try {
            const res = await fetch('/api/explain', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ topic }),
            });

            if (!res.ok) {
                throw new Error('API request failed');
            }

            const data = await res.json();
            setResponse(data.text || 'No response received.');
        } catch (error) {
            console.error('API Error:', error);
            setResponse('Failed to fetch AI explanation. Please check your connection.');
        }
        setLoading(false);
    };

    return (
        <div className="p-4 bg-primary/10 rounded-lg border-l-4 border-primary my-10">
            <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary">tips_and_updates</span>
                <div>
                    <h4 className="font-bold text-sm text-primary mb-1">AI 深度解析</h4>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                        需要更详细的解释或代码示例？让 AI 助教为你深度分析。
                    </p>
                    <button
                        onClick={handleAsk}
                        disabled={loading}
                        className="px-4 py-2 bg-primary text-white text-xs font-bold rounded hover:bg-primary/80 transition-all disabled:opacity-50 flex items-center gap-2"
                    >
                        {loading ? '思考中...' : '生成 AI 解析'}
                        <span className="material-symbols-outlined text-sm">bolt</span>
                    </button>
                </div>
            </div>

            {response && (
                <div className="bg-white dark:bg-slate-800/30 p-6 rounded-xl border border-slate-200 dark:border-slate-700 mt-8 animate-in fade-in slide-in-from-bottom-2 duration-500 shadow-sm">
                    <div className="flex items-center gap-2 text-primary font-bold text-sm mb-4">
                        <span className="material-symbols-outlined text-sm">smart_toy</span>
                        AI 回复
                    </div>
                    <div className="prose prose-slate dark:prose-invert prose-sm max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
                        {/* Simple markdown rendering can be done here if needed, or just whitespace-pre-wrap */}
                        <div className="whitespace-pre-wrap">{response}</div>
                    </div>
                </div>
            )}
        </div>
    );
}
