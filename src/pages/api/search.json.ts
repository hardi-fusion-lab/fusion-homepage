import { getCollection } from 'astro:content';

export const GET = async () => {
    const allQuestions = await getCollection('questions');

    const searchIndex = allQuestions.map(q => ({
        title: q.data.title,
        slug: q.slug,
        category: q.data.category,

    }));

    return new Response(JSON.stringify(searchIndex), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
