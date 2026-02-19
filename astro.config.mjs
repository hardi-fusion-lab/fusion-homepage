import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    integrations: [
        react(),
        tailwind({
            applyBaseStyles: false,
        }),
        mdx(),
        sitemap(),
    ],
    output: 'server',
    adapter: node({
        mode: 'standalone',
    }),
    site: 'https://fe-library.example.com',
    vite: {
        define: {
            'import.meta.env.PUBLIC_GEMINI_API_KEY': JSON.stringify(process.env.GEMINI_API_KEY || ''),
        },
    },
});
