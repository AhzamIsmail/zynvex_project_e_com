<!--
Sync Impact Report:
- Version change: None (Initial adoption) -> 1.0.0
- List of modified principles:
  - PRINCIPLE_1: Code Quality & Architecture
  - PRINCIPLE_2: Frontend Standards
  - PRINCIPLE_3: State Management & Data
  - PRINCIPLE_4: API & Backend Integration
  - PRINCIPLE_5: Performance & Testing
- Added sections:
  - Development Workflow
  - Incremental Delivery
- Removed sections: None
- Follow-up TODOs: None
-->
# Modern Web Application & E-Commerce Dashboard Constitution

## Core Principles

### I. Code Quality & Architecture
TypeScript must be used everywhere across the application (no plain JavaScript is permitted). Development must follow a component-based architecture where UI primitives, layout components, and page-level components are strictly separated. All components must be kept small, reusable, and single-responsibility. Naming conventions must be consistent, using PascalCase for components and camelCase for functions and files.

### II. Frontend Standards
The project must be built using React.js and Next.js (utilizing the App Router). Styling must be implemented using Tailwind CSS only, with no inline styles or separate CSS files unless absolutely necessary. Development must follow a mobile-first responsive approach, ensuring a seamless user experience across all breakpoints. Accessibility basics must be guaranteed, including semantic HTML, image alt texts, and proper form/input labels.

### III. State Management & Data
React hooks, specifically `useState` and `useContext`, must be used for local and shared frontend state management. All asynchronous data fetching must gracefully handle loading and error states, which must always be clearly displayed to the user. Critical or persistent user data must be saved using LocalStorage or stored in a persistent database (PostgreSQL or MongoDB).

### IV. API & Backend Integration
All client-server communications must follow REST API best practices, using correct HTTP methods (GET, POST, PUT, DELETE) and returning accurate HTTP status codes. Every API invocation must incorporate proper error handling and display corresponding loading states. Under no circumstances should sensitive credentials or API keys be hardcoded in the codebase; they must be managed via environment variables.

### V. Performance & Testing
The application must be optimized for fast load times, incorporating lazy loading and code splitting where appropriate. The user interface must be tested across all major modern web browsers before final submission. All unused code, dead imports, and diagnostic console logs must be cleaned up prior to production deployment.

## Development Workflow

Every module must be committed to Git with clear, descriptive commit messages. Development must use feature branches per module (`module-1`, `module-2`, `module-3`, and `module-4`). Code must be pushed to GitHub upon the completion of each module.

## Incremental Delivery

The dashboard must be built incrementally across four defined phases:
- **Module 1**: UI Design & Frontend Structure
- **Module 2**: Dynamic Components & Routing
- **Module 3**: API Integration & Data Handling
- **Module 4**: Performance Optimization & Final Review
Each module must build directly on top of the preceding one, ensuring that new additions do not break or degrade previously completed functionality.

## Governance

This constitution serves as the primary governing document for all development on the Modern Web Application & E-Commerce Dashboard. Any amendments or updates to this constitution must be documented, versioned, and agreed upon by the team. All feature specifications, designs, and pull requests must be validated against these core principles to ensure compliance.

**Version**: 1.0.0 | **Ratified**: 2026-08-28 | **Last Amended**: 2026-08-28
