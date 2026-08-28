# Quickstart Validation Guide: UI Structure & Frontend Foundation

This document defines the procedures to run and visually validate the UI structure and responsive layout components.

## Prerequisites

- **Node.js**: version 18.0 or higher
- **Package Manager**: `npm` (bundled with Node) or `pnpm`

## Installation & Setup

1. **Verify Tailwind Configuration**:
   Ensure `tailwind.config.ts` includes the necessary layouts, colors, and container configurations.

2. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your web browser.

## Validation Scenarios

### Scenario 1: Landing Page & Hero Section (Desktop view)
1. Navigate to the root site address `/`.
2. **Verify**:
   - The top Navigation Bar is displayed.
   - The main landing area displays the Hero Section and a Featured content grid.
   - The Page Footer is rendered correctly.

### Scenario 2: Responsive Mobile Navbar Toggle (<768px viewport)
1. Open Browser Developer Tools (`F12`) and switch to device emulation mode (e.g., iPhone/Mobile View).
2. **Verify**:
   - The desktop navigation links collapse and are replaced by a hamburger menu icon.
3. Click the Hamburger Icon.
4. **Verify**:
   - The mobile menu drawer transition opens cleanly.
   - The links (Home, Products/Dashboard, Cart, Profile) are present.
5. Click the Close Icon.
6. **Verify**:
   - The menu drawer collapses cleanly.

### Scenario 3: Admin Dashboard Layout Switch
1. Click the "Products/Dashboard" navigation link in the top navbar.
2. **Verify**:
   - The main landing page content is replaced with the Admin Dashboard view.
   - A left Sidebar navigation menu renders (on desktop widths).
   - The main area displays mock admin content grids (reusable cards, badge statuses).
   - A consistent Header and Footer are displayed.

### Scenario 4: Modal UI Primitive Triggering
1. Click the modal demonstration trigger (e.g. "Trigger Modal" button in the component gallery).
2. **Verify**:
   - The Modal window opens on top of the layout.
   - A dark transparent backdrop overlay is visible behind the modal.
   - Viewport scrolling on the main page is locked.
3. Click the close ("X") button or click outside the modal boundaries.
4. **Verify**:
   - The modal overlay closes cleanly.
   - Main page scrolling is unlocked.
