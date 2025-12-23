"use client";

import { useState } from "react";
import { useLanguage, InsightData } from "@/context/LanguageContext";
import InsightCard from "./InsightCard";
import InsightDetailsModal from "./InsightDetailsModal";

export default function InsightsSection() {
    const { t, insights } = useLanguage();
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
