export const prerender = false;

import type { APIRoute } from 'astro';
import { GoogleGenAI } from '@google/genai';

export const POST: APIRoute = async ({ request }) => {
    const apiKey = import.meta.env.GEMINI_API_KEY;

    if (!apiKey) {
        return new Response(JSON.stringify({ error: 'Server API key not configured' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const body = await request.json();
        const { topic } = body;

        if (!topic) {
            return new Response(JSON.stringify({ error: 'Topic is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const ai = new GoogleGenAI({ apiKey });
        const result = await ai.models.generateContent({
            model: 'gemini-2.0-flash-exp',
            contents: `Explain the following front-end engineering topic in detail, providing a code example if relevant: ${topic}. Use Markdown formatting.`,
        });

        return new Response(JSON.stringify({ text: result.text }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Gemini API Error:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch AI explanation' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
