import { defineCollection, z } from 'astro:content';

const questionsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        category: z.enum([
            'react',
            'http',
            'security',
            'performance',
            'engineering',
            'architecture',
            'v8',
            'css',
            'typescript',
            'web3',
            'graphics',
            'algorithms',
        ]),
        subCategory: z.string(),


        order: z.number().default(999),
        tags: z.array(z.string()).optional(),
        publishedAt: z.date().optional(),
    }),
});

const insightsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        summary: z.string(),
        date: z.string(),
        tags: z.array(z.string()),
        author: z.string().default('Hardi Hsu'),
        category: z.string().optional(),
        image: z.string().optional(),
    }),
});

export const collections = {
    questions: questionsCollection,
    insights: insightsCollection,
};
