# Research & Technical Decisions: Initial UI Structure

This document logs key design decisions, technology selections, and rationales for the initial layout and UI primitives structure.

## Decision 1: Dynamic Class Merging Helper

- **Decision**: Implement a custom class name merging utility `cn` using `clsx` and `tailwind-merge`.
- **Rationale**: Reusable UI primitives (like Buttons, Badges, and Cards) frequently require optional variant props or external custom class names. Standard string concatenation causes styling conflicts (e.g. `px-4` conflicting with `p-2`). `tailwind-merge` resolves conflicts dynamically in favor of the last-applied rule.
- **Alternatives Considered**: 
  - *Standard string template literals*: Rejected due to styling precedence issues.
  - *Tailwind Variants Library (cva/tv)*: Deferred to later modules to keep the current dependency foot-print minimal.

## Decision 2: Mobile Navigation State Toggling

- **Decision**: Manage the mobile sidebar and hamburger dropdown toggling via React `useState` at the closest common parent layout element.
- **Rationale**: Since no routing library state is linked to the navigation open/close states yet, local client state is the most lightweight, robust solution. The layout component containing the navbar and drawer will be marked with `'use client'`.
- **Alternatives Considered**: 
  - *Global Context/Zustand*: Rejected. Global state is overkill for basic UI display toggles at this stage.

## Decision 3: Next.js App Router and Project Layout

- **Decision**: Adopt Next.js 14 App Router layout at the root directory level (`/app`).
- **Rationale**: The user requested `/app` directly at root instead of nested within `/src`. This reduces nesting depths and aligns with modern standard configurations.
- **Alternatives Considered**:
  - *Pages Router*: Rejected because standard modern features require standard App Router capabilities.
