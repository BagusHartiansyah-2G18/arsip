# AGENTS

Centralized guidance for human + AI agents collaborating on the Peaceful Dashboard (Tourism Management System). Aligns with `.cursorrules` and project conventions.

## Context
- Framework: Next.js 15 App Router, Turbopack, Tailwind CSS v4, TypeScript 5
- UI: shadcn/ui (New York), Lucide icons
- Data: Feature-first domains (destinations, events, services, announcements, categories, flows, users, settings, auth)
- Forms: React Hook Form + Zod
- Tables: TanStack Table
- Maps: Mapbox GL
- State: Hooks-first, server components by default

## Agent Roles

### 1) Code Agent (Full-Stack)
- Owns feature scaffolding, routing, and integration across `src/app`, `src/features`, `src/components`.
- Ensures imports follow feature-first patterns and barrel exports.
- Adds loading and error boundaries.

### 2) UI Agent (Design System)
- Implements UI with shadcn/ui, Tailwind v4, dark mode.
- Maintains consistency with `.cursorrules` color tokens and components.
- Ensures accessibility and responsive design.

### 3) Data/API Agent
- Owns `src/lib/api/*`, `src/lib/actions/*`, and API usage in hooks.
- Provides typed clients, error handling, and optimistic updates when relevant.
- Coordinates pagination, filters, and table data flows.

### 4) Auth Agent
- Owns auth flows and storage in `src/hooks/auth/*`, `src/contexts/*`.
- Ensures protected routes and token lifecycle (persist/refresh/clear).
- Guards admin routes under `src/app/(admin)`.

### 5) Content Agent (Tourism Domain)
- Crafts domain copy for destinations, events, flows, and announcements.
- Validates field labels, help text, and empty states align with tourism context.
- Curates icons and imagery per section.

### 6) QA Agent
- Verifies TypeScript types, ESLint, accessibility, and responsive behavior.
- Validates skeleton loading UX and error states.
- Checks import hygiene and file placement.

### 7) Release Agent
- Coordinates build, environment variables, and release notes.
- Ensures bundle size, CSP/security headers, and performance budgets.

## Ownership Map
- Features: `src/features/{domain}` → Code Agent (lead), UI Agent (UI), Data/API Agent (data)
- Shared UI: `src/components/*` → UI Agent
- Hooks: `src/hooks/*` → Code Agent + Data/API Agent (api), Auth Agent (auth)
- Lib: `src/lib/*` → Data/API Agent (api, utils, errors), Code Agent (actions)
- App Router: `src/app/*` → Code Agent (+ Auth Agent for protection)

## Playbooks

### A) Implement a new feature page (list + add + edit)
1. App routes under `src/app/(admin)/{feature}/(page|add|edit)/page.tsx`.
2. UI with `DashboardLayout`, domain components from `src/features/{feature}`.
3. Data with `useApi` and `src/lib/api/{feature}.ts` client.
4. Tables using `components/data-table` with action column.
5. Forms using React Hook Form + Zod; use `FormHeader` and `FormActions`.
6. Loading states using skeletons under `components/skeletons`.
7. Errors via `components/ui/error-alert` and try/catch pattern from `.cursorrules`.

### B) Add a new API client
1. Create `src/lib/api/{feature}.ts` with typed CRUD functions.
2. Export through `src/lib/api/index.ts`.
3. Use in `useApi` within feature pages/components.
4. Handle errors with `lib/errors/handler.ts` and toast feedback.

### C) Protect a route
1. Wrap content with `features/auth/ProtectedRoute` or server-side check.
2. Ensure `useAuth` + `useAuthStorage` manage token and user state.
3. Redirect unauthenticated users to `/login`.

### D) Form page standard
1. `<FormHeader title description showBackButton />`.
2. `<Card>` with `<form>` and validated fields.
3. `<FormActions onCancel onSubmit isLoading />`.
4. Success → toast + navigate; Error → toast error.

### E) Data table page standard
1. `DataTable` with searchKey, pagination, and actions.
2. Column defs colocated with page or feature component.
3. Empty state via `components/ui/empty`.

### F) Map input (Mapbox)
1. Use `components/ui/mapbox-input`.
2. Persist coordinates and address in typed schema.

## Guardrails
- Feature-first imports only; no deep component imports from features.
- Keep business logic in `src/features`, reusable UI in `src/components`.
- Use server components by default; add "use client" only when needed.
- Tailwind v4 utilities with dark mode variants; avoid custom CSS unless necessary.
- Forms must be fully typed with Zod schemas.
- Tables: paginated, accessible, keyboard-friendly.
- Loading: skeletons for dashboard, tables, forms, edit pages.
- Accessibility: semantic landmarks, labels, focus management, color contrast.
- Performance: code-split heavy components, optimize images, avoid large deps.
- Security: respect auth, validate inputs, avoid leaking tokens, set CSP headers.

## Commands
- Dev: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Start: `npm start`

## PR Checklist (Quick)
- Types OK, ESLint clean, no `any`.
- Proper feature-first imports and file placement.
- Loading + error states implemented.
- Mobile + dark mode verified.
- Accessible labels and focus order.
- API errors surfaced via toasts; no console logs in prod code.

## Incident Response
1. Reproduce with steps and logs (redact sensitive data).
2. Add failing case to a minimal page/component if relevant.
3. Roll forward with a guarded fix; add error boundaries where missing.
4. Post-mortem: document root cause and mitigations in PR description.

## References
- `.cursorrules` for authoritative patterns and coding constraints
- `ARCHITECTURE.md` for structure and import rules
- `components/skeletons/README.md` for loading standards

