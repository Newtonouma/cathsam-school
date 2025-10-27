# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project: SvelteKit + Vite + TailwindCSS web app (TypeScript enabled)

Common commands
- Install deps: npm install
- Dev server: npm run dev
  - Open browser automatically: npm run dev -- --open
- Build (production): npm run build
- Preview built app: npm run preview
- Format (Prettier is configured): npx prettier --check . | npx prettier --write .
- Lint: No ESLint configuration present
- Tests: No test runner/scripts configured

Architecture overview
- Framework/tooling
  - Vite config at vite.config.ts uses the SvelteKit plugin: sveltekit()
  - Adapter: @sveltejs/adapter-auto is present in devDependencies; choose a specific adapter for deployment as needed
  - TypeScript: tsconfig.json extends .svelte-kit/tsconfig.json with strict settings; $lib alias is provided by SvelteKit
  - Formatting: .prettierrc with prettier-plugin-svelte and prettier-plugin-tailwindcss (ensures Svelte formatting and Tailwind class ordering)
- App structure (SvelteKit conventions)
  - Global shell: src/app.html
  - Global styles: src/app.css (imports Tailwind base/components/utilities; defines red-theme variables)
  - Routing: files under src/routes map to routes
    - src/routes/+layout.svelte defines the global layout, imports Navbar and Footer from $lib/components and includes app.css
    - src/routes/+page.svelte is the home page (hero/carousel, sections, program cards, gallery, CTA)
    - Example nested route: src/routes/about/+page.svelte
- Shared library ($lib)
  - src/lib/index.ts is the entry for $lib imports
  - src/lib/components contains reusable UI (e.g., Navbar.svelte, Footer.svelte, Carousel.svelte, ProgramCard.svelte, GalleryItem.svelte)
  - src/lib/assets contains asset helpers (e.g., carouselData.js placeholder)

Notes pulled from README.md
- Development: npm run dev (use -- --open to auto-open)
- Production build: npm run build; preview with npm run preview
- Deployment may require installing a target-specific SvelteKit adapter
