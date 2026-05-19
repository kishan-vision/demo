# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Next.js 14 Admin Dashboard** built with TypeScript, Tailwind CSS, and shadcn/ui. The app features a collapsible sidebar navigation, 6 module pages (Dashboard, Users, Products, Orders, Analytics, Settings), and populated with dummy data for development and testing purposes.

**Stack:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui component library
- lucide-react (icons)
- React hooks for state management

---

## Common Commands

### Development
- **Start dev server:** `npm run dev`
  - Runs on `http://localhost:3000` (or next available port)
  - Hot reload enabled; changes reflect immediately
  - Recommended for active development

### Building & Deployment
- **Build for production:** `npm run build`
  - Creates optimized production bundle in `.next/`
  - Run this before deploying
  - May require increased Node memory on low-RAM systems

### Code Quality
- **Run ESLint:** `npm run lint`
  - Checks TypeScript and JavaScript for style issues
  - Run before committing to catch errors early
  - ESLint config inherits Next.js defaults; see `.eslintrc.json` if customization needed

### Running Built App
- **Preview production build locally:** `npm run dev` after `npm run build`
  - Tests the production-optimized app on your machine before deployment

---

## Project Architecture

### Directory Structure

```
src/
├── app/                      ← Next.js App Router pages
│   ├── layout.tsx           ← Root layout (wraps everything in AppShell)
│   ├── page.tsx             ← Redirects "/" to "/dashboard"
│   ├── dashboard/page.tsx   ← Dashboard module
│   ├── users/page.tsx       ← Users module with table
│   ├── products/page.tsx    ← Products module with table
│   ├── orders/page.tsx      ← Orders module with table
│   ├── analytics/page.tsx   ← Analytics module with stats & charts
│   └── settings/page.tsx    ← Settings module (profile & preferences)
│
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx     ← Root shell: sidebar + topbar + main area
│   │   ├── Sidebar.tsx      ← Collapsible sidebar with nav links
│   │   ├── SidebarLink.tsx  ← Individual nav item with active state
│   │   └── Topbar.tsx       ← Sticky header: breadcrumb + avatar + mobile hamburger
│   │
│   ├── dashboard/
│   │   ├── KpiCard.tsx      ← KPI metric card (icon + value + delta)
│   │   └── ActivityList.tsx ← Recent activity feed with colored dots
│   │
│   ├── users/, products/, orders/, analytics/, settings/
│   │   └── *Table.tsx / *Form.tsx / *Panel.tsx
│   │       Client components for each module
│   │
│   └── ui/                  ← shadcn/ui pre-built components
│       ├── button.tsx, card.tsx, badge.tsx, table.tsx, etc.
│       └── (Do not edit these; add new components via `npx shadcn add <name>`)
│
├── data/
│   ├── users.ts             ← 10 dummy user records
│   ├── products.ts          ← 10 dummy product records
│   ├── orders.ts            ← 10 dummy order records
│   ├── dashboard.ts         ← KPI metrics + activity items
│   └── analytics.ts         ← Stat cards + monthly revenue chart data
│
├── types/
│   └── index.ts             ← Shared TypeScript interfaces (User, Product, Order, etc.)
│
├── hooks/
│   └── useSidebar.ts        ← Custom hook for sidebar collapsed/expanded state
│                               Persists to localStorage; auto-collapses below 1024px
│
└── lib/
    └── utils.ts             ← Utility functions (cn() for classname merging)
```

### Key Architectural Patterns

#### 1. Layout Composition (AppShell)
- **AppShell** (`src/components/layout/AppShell.tsx`) is the root client component that composes:
  - **Sidebar** — collapsible nav with links to all 6 modules
  - **Topbar** — breadcrumb, page title, user avatar, hamburger menu (mobile)
  - **Main content area** — renders page children
- Root `layout.tsx` wraps the entire app in `<AppShell>`, so every page gets the sidebar + topbar

#### 2. Client vs. Server Components
- **Server Components (pages):** `src/app/**/page.tsx` files are Server Components
  - Fetch/prepare data and pass to Client Components
  - Cannot use hooks or browser APIs directly
- **Client Components:** Any component using `useState`, `useEffect`, `usePathname`, etc. must have `"use client"` at the top
  - Examples: `AppShell`, `SidebarLink`, table components (`UsersTable`, `ProductsTable`), forms (`ProfileForm`)

#### 3. State Management
- **Sidebar collapse state:** Managed in `useSidebar` hook using `localStorage` for persistence
- **Table sorting/filtering:** Local `useState` inside table components (`UsersTable`, `ProductsTable`, etc.)
- **Settings forms:** Local `useState` (profile form auto-saves with visual feedback)
- **No global state management needed** — all state is local to components

#### 4. Styling Strategy
- **Tailwind CSS utility classes** for all styling
- **Shadcn/ui components** for pre-built UI (Button, Card, Badge, Table, etc.)
- **CSS variables in globals.css** for theme colors (light mode only currently)
- **Dynamic Tailwind classes must use full class strings** — never construct them dynamically, or Tailwind will purge them
  - Example: Use a lookup map for status badge colors, not `className={statusColor[status]}`

#### 5. Data Flow
- **Dummy data in `src/data/`** — imported directly into pages and components
- **Types in `src/types/index.ts`** — all data shapes defined here; ensures type safety
- **No API calls** — the app is fully client-side with in-memory data
- To integrate a real backend:
  1. Replace data imports with API calls (e.g., `fetch('/api/users')`)
  2. Move data fetching to Server Components or use `useEffect` in Client Components
  3. Add loading states and error handling

---

## Module Breakdown

| Module | Purpose | Key Features |
|--------|---------|--------------|
| **Dashboard** | Overview page | 4 KPI cards, recent activity feed |
| **Users** | User management | 10-row sortable table, search filter, role + status badges |
| **Products** | Product catalog | 10-row table, category filter, price + stock display |
| **Orders** | Order tracking | 10-row table, status filter, colored status badges |
| **Analytics** | Metrics & charts | 6 stat cards, CSS-based bar chart (no external charting lib) |
| **Settings** | User preferences | Two tabs: Profile (form) and Preferences (toggles) |

---

## Responsive Design

- **Desktop (lg+, ≥1024px):** Sidebar expanded with full labels, `w-64`
- **Tablet (md-lg, 768–1023px):** Sidebar auto-collapses to icon-only, `w-16`
- **Mobile (<768px):** Sidebar hidden off-screen; hamburger icon in Topbar opens it as a slide-out drawer (shadcn `<Sheet>`)

The collapse behavior is handled by `useSidebar` hook which:
1. Reads `localStorage` for user preference on mount
2. Listens to window resize events and auto-collapses below 1024px
3. Persists the collapsed state to `localStorage` for next visit

---

## Common Development Tasks

### Adding a New Module Page
1. Create `src/app/[modulename]/page.tsx` with your page content
2. Add a nav item to `NAV_ITEMS` in `src/components/layout/Sidebar.tsx`:
   ```typescript
   { label: "Module Name", href: "/modulename", icon: SomeIcon }
   ```
3. Add breadcrumb mapping to `PAGE_TITLES` in `src/components/layout/Topbar.tsx`
4. Create reusable components in `src/components/[modulename]/` as needed
5. Import dummy data from `src/data/` if applicable

### Integrating a Real API
1. Replace data imports with API calls:
   ```typescript
   // Before (dummy data)
   import { USERS } from "@/data/users";

   // After (real API)
   async function getUsers() {
     const res = await fetch('/api/users');
     return res.json();
   }
   ```
2. For Server Components: call the fetch function directly
3. For Client Components: use `useEffect` with `useState` to manage loading/error states
4. Add `Loading.tsx` and `error.tsx` error boundaries if needed

### Adding a New Shadcn/ui Component
1. Install it via CLI: `npx shadcn@latest add [component-name]`
   - Adds the component to `src/components/ui/[component-name].tsx`
2. Import and use in your components:
   ```typescript
   import { ComponentName } from "@/components/ui/component-name";
   ```
3. Do NOT edit the component files in `src/components/ui/` — they're auto-generated

### Styling a New Component
- Use Tailwind utility classes: `className="flex gap-4 rounded-lg bg-white p-6"`
- For variants (active, hover, etc.), use inline conditions or className libraries
- Avoid magic numbers; prefer Tailwind spacing scale (`gap-4`, `p-6`, etc.)
- For complex styling, consider creating a reusable component

### Testing Interactive Features
- **Sidebar collapse:** Click the chevron toggle at bottom of sidebar; should shrink to icon-only
- **Responsive:** Use Chrome DevTools (F12 → Device Toolbar) to test tablet/mobile views
- **Table sorting:** Click column headers in Users table; should cycle: asc → desc → none
- **Table filtering:** Use the Select dropdowns in Products/Orders; should filter results
- **Settings forms:** Edit fields in Profile tab; click "Save Changes" should show "✓ Saved!" feedback
- **Preferences toggles:** Click any Switch in Preferences tab; state should update

---

## Tailwind CSS & Custom Styles

- **CSS file:** `src/app/globals.css`
- **Theme colors:** Defined as CSS variables in `:root`
- **Components use semantic Tailwind:** `text-slate-900`, `bg-green-100`, `border-slate-200`, etc.
- **Status badge colors:** Hardcoded in lookup maps (e.g., `STATUS_CLASSES` in table components) to ensure Tailwind doesn't purge them
- **No PostCSS plugins** currently configured; pure Tailwind setup

---

## Deployment Notes

- Build runs on production: `npm run build`
- Output is in `.next/` directory
- The app is ready for deployment to Vercel (Next.js' native platform) or any Node.js host (docker, etc.)
- Environment variables (if needed) go in `.env.local` for development, `.env.production` for prod

---

## Known Quirks & Solutions

1. **Sidebar state blinks on page load:** The sidebar uses `localStorage`, which isn't available until after hydration. This causes a brief flash on initial load (collapsed → expanded or vice versa). This is acceptable and unavoidable with client-side `localStorage` persistence in Next.js.

2. **Build runs out of memory:** If `npm run build` fails with "Zone Allocation failed," increase Node's memory limit:
   ```bash
   NODE_OPTIONS=--max-old-space-size=2048 npm run build
   ```

3. **Port 3000 in use:** The dev server will automatically try the next available port (3001, 3002, etc.) if 3000 is taken.

4. **TypeScript strict mode:** The project uses Next.js defaults; if you encounter strict type errors, check `tsconfig.json`.

---

## Resources

- **Next.js 14 Docs:** https://nextjs.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **shadcn/ui:** https://ui.shadcn.com
- **Lucide Icons:** https://lucide.dev

---

**Last updated:** 2026-05-19
