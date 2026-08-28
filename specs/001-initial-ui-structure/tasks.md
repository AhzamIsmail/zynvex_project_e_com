# Tasks: Initial UI Structure & Frontend Foundation

**Input**: Design documents from `/specs/001-initial-ui-structure/`

**Prerequisites**: [plan.md](./plan.md) (required), [spec.md](./spec.md) (required), [research.md](./research.md), [data-model.md](./data-model.md)

**Tests**: Tests are NOT requested for this phase (manual visual verification only).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and base structure configuration

- [x] T001 Initialize Next.js project folder structure at `/app`, `/components/ui`, `/components/layout`, `/lib`, and `/public` per implementation plan
- [x] T002 Configure Tailwind CSS design tokens (colors, font scale, container) in `/tailwind.config.ts`
- [x] T003 [P] Add primary layout dependencies (`lucide-react`, `clsx`, `tailwind-merge`) in `/package.json`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core layout utilities and styles that must be complete before any user story is implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Implement dynamic class merging helper `cn` in `/lib/utils.ts`
- [x] T005 Set up base globals and font layout definitions in `/app/globals.css`
- [x] T006 Implement base root layout setting HTML body tags and layout viewport in `/app/layout.tsx`

**Checkpoint**: Foundation ready - user story layout implementations can now begin

---

## Phase 3: User Story 1 - View Landing/Home Page (Priority: P1) 🎯 MVP

**Goal**: Renders the default Landing Page layout (Hero section, Featured content grids, and Footer)

**Independent Test**: Navigate to the homepage root address `/` and verify the hero content block, feature grids, and global footer render correctly.

### Implementation for User Story 1

- [x] T007 [P] [US1] Create responsive footer component in `/components/layout/footer.tsx`
- [x] T008 [US1] Create layout page container wrapper component in `/components/layout/page-container.tsx`
- [x] T009 [US1] Implement landing home page showing hero section and content grids in `/app/page.tsx`

**Checkpoint**: At this point, User Story 1 (Landing Page Layout) should be fully functional and testable independently.

---

## Phase 4: User Story 2 - Toggle Mobile Navigation (Priority: P1)

**Goal**: Toggle navigation drawer overlay on smaller screen viewports

**Independent Test**: Resize browser viewport below 768px, click hamburger icon to open menu, click trigger to close menu.

### Implementation for User Story 2

- [x] T010 [US2] Implement responsive navigation bar with local state hamburger toggle in `/components/layout/navbar.tsx`

**Checkpoint**: User Stories 1 and 2 are fully integrated and testable on desktop and mobile viewports.

---

## Phase 5: User Story 3 - View Admin Dashboard Layout (Priority: P2)

**Goal**: Render an admin/user dashboard view featuring a sidebar and main dashboard grids

**Independent Test**: Navigate to `/dashboard`, confirm sidebar renders on desktop screen sizes, main dashboard details layout renders properly.

### Implementation for User Story 3

- [x] T011 [P] [US3] Create dashboard sidebar navigation component in `/components/layout/sidebar.tsx`
- [x] T012 [US3] Implement admin dashboard main page grid structures in `/app/dashboard/page.tsx`

**Checkpoint**: Landing and Dashboard layout routes function and render correctly.

---

## Phase 6: User Story 4 - Preview UI Component Library (Priority: P3)

**Goal**: Develop and check base styling of primitive layout elements (Button, Card, Input, Badge, Modal)

**Independent Test**: Verify components render with correct colors, spacing, borders, state styles, and backdrop scroll locks on open.

### Implementation for User Story 4

- [x] T013 [P] [US4] Create reusable Button primitive in `/components/ui/button.tsx`
- [x] T014 [P] [US4] Create reusable Card primitive in `/components/ui/card.tsx`
- [x] T015 [P] [US4] Create reusable Input primitive in `/components/ui/input.tsx`
- [x] T016 [P] [US4] Create reusable Badge primitive in `/components/ui/badge.tsx`
- [x] T017 [US4] Create reusable Modal dialog primitive with body scroll locking in `/components/ui/modal.tsx`

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Styling cleanup, mobile breakpoint verification, and type checking

- [x] T018 Confirm responsive styling across desktop, tablet, and mobile dimensions
- [x] T019 Audit files to clean up dead imports and test console logs
- [x] T020 Run full TypeScript compilation check to verify clean compilation
- [x] T021 Validate manual quickstart testing scenarios in `/specs/001-initial-ui-structure/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Phase 1 Setup. Blocks all User Stories.
- **User Stories (Phase 3-6)**: Depend on Phase 2 Foundational. Can run sequentially or in parallel once foundation is ready.
- **Polish (Phase 7)**: Depends on all User Story phases completion.

### Parallel Opportunities

- Setup: Package configuration `T003` can run in parallel with structure `T001`/`T002`.
- User Story 1: Footer setup `T007` can run in parallel with container setup `T008`.
- User Story 3: Sidebar component `T011` can run in parallel with main dashboard setup `T012`.
- User Story 4: Button `T013`, Card `T014`, Input `T015`, and Badge `T016` can be implemented in parallel.

***

## Implementation Strategy

### MVP First (User Story 1 & 2)
1. Initialize setup (Phase 1) and core foundations (Phase 2).
2. Complete landing page layout (Phase 3) and mobile navbar (Phase 4).
3. Test layout responsiveness and local toggles.

### Next Steps
1. Add dashboard views (Phase 5).
2. Refactor layouts to use UI primitives (Phase 6).
3. Final polish, build validation, and deployment (Phase 7).
