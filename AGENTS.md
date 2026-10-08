<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project Architecture & Engineering Guidelines: Deepak Photo Films

## 1. Next.js 16+ Critical Conventions
- **Routing Proxy (formerly Middleware)**:
  - `middleware.ts` is **deprecated** in Next.js 16 (`v16.0.0+`).
  - Always use `src/proxy.ts` exporting a named or default `proxy` function (`export function proxy(request: NextRequest)`).
  - Reference: `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md`.
- **Root Parameters (`next/root-params`) & i18n (`next-intl`)**:
  - `setRequestLocale(locale)` is **deprecated**. Do NOT use `setRequestLocale` in layouts or pages.
  - In Next.js 16.3+, root layouts placed inside dynamic segments (`src/app/[locale]/layout.tsx`) expose their params via `next/root-params`.
  - In `src/i18n/request.ts`, retrieve the active locale via `await rootParams.locale()` from `next/root-params`:
    ```ts
    import * as rootParams from 'next/root-params';
    const paramValue = await rootParams.locale();
    ```
  - In Server Components and layouts, retrieve the active locale via `await getLocale()` from `next-intl/server`.
  - Reference: [next-intl root-params migration](https://next-intl.dev/blog/nextjs-root-params) and `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/next-root-params.md`.
- **Route Segments & Layouts**:
  - Keep `generateStaticParams()` in `src/app/[locale]/layout.tsx` returning all supported locales (`['en', 'or']`) to guarantee static site generation (SSG).

---

## 2. Design System & Studio Theming
- **Active Theme**: **Sacred Mandap & Chandan Silk** (Traditional Odia Wedding Heritage: Sindoor Crimson & Zari Gold)
  - Primary Background: Warm Chandan Silk Ivory (`#FAF7F2`)
  - Secondary Surfaces: Warm Sandalwood Paper & Aged Linen (`#F3ECE2`, `#ECE3D5`)
  - Accent & Hairlines: Temple Zari Gold (`#946500`, `#7A5200`), Hairline `rgba(125, 17, 23, 0.14)`
  - Headings & Highlights: Deep Royal Khandua / Sindoor Crimson Red (`#7D1117`)
  - Body & Microcopy: Deep Mahua Charcoal Ink (`#1C0E10`), Sandalwood Slate (`#5C4E4B`)
  - Configuration: `src/config/theme.ts`.
- **CSS Variables & Tailwind CSS v4**:
  - Theme variables (`--color-bg-primary`, `--color-accent`, etc.) are injected into `<html>` style in `src/app/[locale]/layout.tsx`.
  - Utility tokens in `src/app/globals.css` map to these CSS variables (`var(--color-bg-primary)`).
- **Typography & Font Strategy (`next/font/google`)**:
  - Latin Display / Headings: **`Marcellus`** (Humanist Roman flare serif inspired by classical stone/temple inscriptions; crystal-clear numerals and high legibility).
  - Latin Body / Nav / Meta: **`Tenor_Sans`** (Airy, refined editorial fashion sans).
  - Odia (`or`) Script: **`Noto_Serif_Oriya`** (Classic display serif) and **`Anek_Odia`** (Modern body sans).
- **Navigation & Brand Links Configuration**:
  - Maintained in `src/config/navigation.ts` (`navigationConfig`).
  - Add, reorder, or edit navigation items, socials, footer columns, and bento media slots directly in `src/config/navigation.ts`.

---

## 3. Linting, Quality & Code Integrity
- Always run `npm run lint` and `npm run build` after editing configuration or server components.
- Do NOT use explicit `any` types; use strict type helpers (e.g., `(typeof routing.locales)[number]`).
- Do NOT re-add removed Next.js boilerplate SVGs or root `app/layout.tsx` (which would conflict with `app/[locale]/layout.tsx` as a root layout).
