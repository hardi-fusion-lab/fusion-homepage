import { getAllInsights } from "@/lib/mdx";
import ClientHome from "@/components/ClientHome";
import { InsightData } from "@/context/LanguageContext";

export default function Home() {
  // Server-side Data Fetching
  const initialInsightsEn = getAllInsights('en');
  const initialInsightsZh = getAllInsights('zh');

  return (
    <ClientHome
      // Cast the MDX result (InsightMetadata) to InsightData since they are structurally identical
      // In a real app we would use Zod or shared interfaces more strictly
      initialInsightsEn={initialInsightsEn as unknown as InsightData[]}
      initialInsightsZh={initialInsightsZh as unknown as InsightData[]}
    />
  );
}
