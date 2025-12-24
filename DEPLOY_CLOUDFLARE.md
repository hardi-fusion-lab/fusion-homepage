# Deploying to Cloudflare Pages

This guide outlines how to deploy the **Hardi Fusion Lab** portfolio to Cloudflare Pages using the `@cloudflare/next-on-pages` adapter.

## Prerequisites

1.  A Cloudflare Account.
2.  GitHub Repository connected to your Cloudflare account.

## Configuration Changes (Completed)

We have already made necessary changes to the project:
*   Installed `@cloudflare/next-on-pages`.
*   Updated `next.config.ts` to disable Image Optimization (`unoptimized: true`), as standard Next.js Image Optimization is not supported on Cloudflare Pages freely without a custom loader.
*   Added `"pages:build": "npx @cloudflare/next-on-pages"` to `package.json`.

## Deployment Steps

1.  **Push to GitHub**: Ensure all your latest changes (including `next.config.ts` and `package.json`) are committed and pushed to your GitHub repository.

2.  **Go to Cloudflare Dashboard**:
    *   Navigate to **Workers & Pages**.
    *   Click **Create Application** -> **Pages** -> **Connect to Git**.

3.  **Select Repository**:
    *   Choose your `FusionLab` repository.

4.  **Configure Build**:
    *   **Production branch**: `main` (or your default branch).
    *   **Framework preset**: Select **Next.js**.
    *   **Build command**: Change this to:
        ```bash
        npm run pages:build
        ```
        *(Note: Do not use the default `next build`. We must use the Cloudflare adapter script we defined.)*
    *   **Build output directory**: `.vercel/output/static`
        *(Note: The adapter outputs here. Cloudflare usually defaults to `.next`, you MUST change this.)*

5.  **Environment Variables (Optional)**:
    *   If you have any environment variables (e.g., API keys), add them in the setup screen. currently, this project is purely static/client-side and doesn't strictly require env vars.

6.  **Deploy**: Click **Save and Deploy**.

## Troubleshooting

*   **"fs" module not found**: If the build fails due to `fs` (Node.js filesystem) errors, ensure that `app/page.tsx` is being statically generated. Since it doesn't use dynamic data (headers/cookies), Next.js automatically treats it as static, and the `fs` calls happen during the build phase (which is allowed).
*   **Images not loading**: Verify that `next.config.ts` has `images: { unoptimized: true }`.

## Local Preview

To test the build locally before deploying:

```bash
# Build using the adapter
npm run pages:build

# Preview using Wrangler (Cloudflare CLI)
npx wrangler pages dev .vercel/output/static
```
