"use client";

import { useState } from "react";
import { useLanguage, InsightData } from "@/context/LanguageContext";
import InsightCard from "./InsightCard";
import InsightDetailsModal from "./InsightDetailsModal";

// Define the interface for props, extending/compatible with InsightData
interface InsightsSectionProps {
    insights: InsightData[];
}

export default function InsightsSection({ insights }: InsightsSectionProps) {
    const { t } = useLanguage();
    const [selectedInsight, setSelectedInsight] = useState<InsightData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleConstraintClick = (insight: InsightData) => {
        setSelectedInsight(insight);
        setIsModalOpen(true);
    };

    return (
        <section id="insights" className="py-20 px-6 border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-4">{t("insights.title")}</h2>
                    <p className="text-gray-400">{t("insights.subtitle")}</p>
                </div>

                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 max-w-lg">
                        <div className="text-4xl mb-4">🚧</div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-200">
                            Technical Docs Under Construction
                        </h3>
                    </div>
                </div>

                <div className="hidden grid-cols-1 md:grid-cols-3 gap-6">
                    {insights.map((insight) => (
                        <InsightCard
                            key={insight.id}
                            title={insight.title}
                            summary={insight.summary}
                            date={insight.date}
                            readTime={insight.readTime}
                            onClick={() => handleConstraintClick(insight)}
                        />
                    ))}
                </div>
            </div>

            <InsightDetailsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                insight={selectedInsight}
            />
        </section>
    );
}
