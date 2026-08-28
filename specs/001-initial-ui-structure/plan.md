# Implementation Plan: Initial UI Structure & Frontend Foundation

**Branch**: `001-initial-ui-structure` | **Date**: 2026-08-28 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-initial-ui-structure/spec.md`

## Summary

Set up a clean Next.js 14+ (App Router) project using TypeScript and Tailwind CSS as the core layout stack. Build a responsive navbar with mobile hamburger navigation, a landing layout featuring a hero and featured content area, an admin dashboard layout featuring a sidebar, and basic reusable UI primitives (Button, Card, Input, Badge, Modal). This phase represents a pure UI/layout foundation with no API integrations or complex router setups.

## Technical Context

**Language/Version**: Next.js 14+ (App Router), React 18+, TypeScript 5+

**Primary Dependencies**: Tailwind CSS, lucide-react (for icons)

**Storage**: LocalStorage (for client-side toggles if needed)

**Testing**: Visual verification across major desktop and mobile viewports

**Target Platform**: Modern Web Browsers (Chrome, Edge, Safari, Firefox)

**Project Type**: Web Application

**Performance Goals**: Under 200ms page paint times, 0 cumulative layout shift (CLS), 60fps responsive menu transition

**Constraints**: Tailwind CSS only (no external CSS files or inline style attributes), no backend API queries or functional state routing, maximum 150 lines per component

**Scale/Scope**: 5 primitive UI components, 4 layout wrapper components, and 2 mock pages

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Rule 1 (TypeScript everywhere)**: PASS. All components, layouts, and lib files will be `.ts` or `.tsx` only.
- **Rule 2 (Tailwind CSS only)**: PASS. Layout and component styling will rely exclusively on Tailwind class strings.
- **Rule 3 (Component limits)**: PASS. Single components are restricted to ~150 lines of code.
- **Rule 4 (Component Architecture)**: PASS. Strict folder separation into UI primitives, layout structures, and page templates.
- **Rule 5 (Mobile-first responsive)**: PASS. Viewports starting at 375px scaled upward using Tailwind breakpoint prefixes.

## Project Structure

### Documentation (this feature)

```text
specs/001-initial-ui-structure/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
└── quickstart.md        # Phase 1 output
```

### Source Code (repository root)

```text
/app
├── layout.tsx            # Global layout setting body styling, metadata, and HTML tags
├── page.tsx              # Home / Landing page displaying hero and featured grids
└── dashboard
    └── page.tsx          # Mock admin dashboard page displaying layout framework
/components
├── ui
│   ├── button.tsx        # UI Primitive: button variant component
│   ├── card.tsx          # UI Primitive: content container component
│   ├── input.tsx         # UI Primitive: input field component
│   ├── badge.tsx         # UI Primitive: status indicator component
│   └── modal.tsx         # UI Primitive: modal dialog popup
└── layout
    ├── navbar.tsx        # Layout: Top header navigation bar (with mobile toggle)
    ├── sidebar.tsx       # Layout: Collapsible dashboard sidebar
    ├── footer.tsx        # Layout: Global site footer
    └── page-container.tsx # Layout: Wrapper defining main layout boundaries
/lib
└── utils.ts              # Utility library for Tailwind class merging (clsx, tailwind-merge)
/public
```

**Structure Decision**: Single Next.js 14 app folder structure using standard App Router nesting.

## Complexity Tracking

*No violations of the project constitution are identified or requested.*
