# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start dev server with Turbopack
pnpm build      # Production build
pnpm lint       # ESLint via next lint
```

No test suite configured.

## Architecture

Single-page portfolio — `app/page.tsx` composes five full-screen sections in order: `Hero → About → Skills → Projects → Contact`. All sections are client components rendered under a shared layout.

### Provider hierarchy (`app/layout.tsx`)

```
AnimationSettingsProvider   ← global animation on/off toggle (persisted to localStorage)
  └─ GsapProvider           ← registers GSAP + ScrollTrigger globally, sets defaults
       ├─ RippleCursor       ← canvas-based cursor effect
       ├─ {children}         ← page sections
       ├─ Footer
       └─ AnimationToggle    ← floating UI switch that writes to AnimationSettingsContext
```

### Animation system

- **GSAP + ScrollTrigger** (`useGSAP` hook): used in section components for scroll-triggered entrance animations. Always scoped via `{ scope: sectionRef }`.
- **Canvas backgrounds**: `SmoothWavyCanvas` (Hero) and `FlowingDots` (Skills) use raw `requestAnimationFrame` loops. Both read `useAnimationSettings()` with a try/catch for SSR safety — when animations are disabled they fall back to a static render.
- **CSS marquee** (Skills): `@keyframes marquee-left/right` defined in `globals.css`; rows pause on hover and stop when the section leaves the viewport (IntersectionObserver).
- All canvas components cap DPR at 1.5 for performance.

### Styling

- Tailwind CSS v4 (`@import "tailwindcss"` in `globals.css`) — no `@tailwind` directives.
- Theme tokens defined in `globals.css` under `@theme inline` and `:root`; referenced as CSS variables in `tailwind.config.ts`.
- Color scheme: pure black background (`#000000`) + white text. A `matrix` color scale is defined but mostly unused.
- Fonts loaded via `next/font/google`: **Inter** (`--font-inter`, body) and **Playfair Display** (`--font-playfair`, display/headings).

### Icons

Use `@iconify/react` (`<Icon icon="devicon:..." />`). `lucide-react` is installed but being phased out — prefer Iconify for any new icons.

### UI primitives

`components/ui/` contains shadcn-style primitives (Button, Badge, Card, Input, Textarea, Switch) using `class-variance-authority` + `tailwind-merge`.
