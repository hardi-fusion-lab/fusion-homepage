import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content/insights');

export interface InsightMetadata {
    id: string;
    title: string;
    summary: string;
    date: string;
    readTime: string;
    tags: string[];
    image: string;
    author: {
        name: string;
        avatar: string;
        role: string;
    };
    claps: number;
    content: string; // The markdown content
}

export function getAllInsights(lang: 'en' | 'zh' = 'en'): InsightMetadata[] {
    const langDir = path.join(contentDirectory, lang);

    // Create directory if it doesn't exist (safety check)
    if (!fs.existsSync(langDir)) {
        return [];
    }

    const fileNames = fs.readdirSync(langDir);
    const allInsights = fileNames.map((fileName) => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '');

        // Read markdown file as string
        const fullPath = path.join(langDir, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        // Combine the data with the id
        return {
            id,
            ...matterResult.data,
            content: matterResult.content,
        } as InsightMetadata;
    });

    // Sort by date (descending)
    return allInsights.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}
