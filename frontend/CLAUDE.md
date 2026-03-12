# Frontend - Utslippslogg

Emissions logging web application.

## Tech Stack

- React 19
- TypeScript
- TanStack Router (file-based routing)
- shadcn/ui + Tailwind CSS
- Vite
- Axios (for API calls)
- Sonner (toast notifications)

## Project Structure

```
src/
├── api/
│   ├── api.tsx       # All API fetch functions (getLogInToken, getUserData, getSiteData)
│   └── types.tsx     # TypeScript types: Token, UserData, SiteData
├── components/
│   ├── ui/           # shadcn primitives (button, input, table, badge, pagination, etc.)
│   ├── dashboard/
│   │   ├── dashboard-card-list.tsx # Dashboard site list — receives sites from loader, renders SiteCards
│   │   └── dashboard-cards.tsx     # Individual site card — blurred bg image, Badge status, navigate to site detail
│   ├── nav/
│   │   ├── navbar.tsx              # Top nav — NavigationMenu links + Profile dropdown
│   │   └── profile.tsx             # Avatar dropdown — logout clears token, redirects to index
│   ├── site/
│   │   ├── site-header.tsx         # Site detail header — blurred bg image (absolute div + scale-105), status badge
│   │   └── table/
│   │       ├── table.tsx           # Measurements table — useQuery with peek-ahead pagination (fetches limit+1)
│   │       ├── pagination.tsx      # Pagination controls — rows per page Select, prev/next with disabled states
│   │       └── filter.tsx          # Unit filter — dropdown checkboxes with pending/apply pattern, calls onFilterChange
├── routes/
│   ├── __root.tsx    # Root layout: Outlet, Toaster
│   ├── index.tsx     # Redirects to /dashboard
│   ├── login.tsx     # Login page
│   ├── contact.tsx   # Contact page (renders ContactForm)
│   └── _authenticated/ # Auth-guarded layout route (beforeLoad checks token)
│       ├── route.tsx   # Layout with Navbar + Outlet
│       ├── dashboard.tsx # Main dashboard — renders SiteCollection
│       └── site.$siteId.tsx # Site detail page — beforeLoad validates site, loader fetches units, page/limit state here
└── lib/
    └── utils.ts      # Utility functions (cn)
```

## Patterns

- Named exports: `export { Component }` not `export default`
- All API calls in `src/api/api.tsx`, types in `src/api/types.tsx`
- Token stored in `localStorage` under key `"token"`
- Auth guard via `beforeLoad` + `redirect` in route definitions (not in components)
- Use `Route as XRoute` imports for type-safe navigation: `navigate({ to: dashboardRoute.to })`
- `useNavigate({ from: currentRoute.to })` for type-safe `from`
- Toasts via `toast.error()` / `toast.success()` from sonner (Toaster in __root.tsx)
- shadcn components in `components/ui/`
- Use `@/` alias for imports from src/
- No `.tsx` extension on imports
- Combine imports from same package on one line
- Use `import type { Foo }` for type-only imports — plain `import { Foo }` fails at runtime for `export type`
- Data fetching via TanStack Router `loader` in route definition, accessed with `Route.useLoaderData()` — not `useEffect`
- Dynamic route params accessed via `Route.useParams()` in component or `params` in loader
- To navigate with params: `navigate({ to: route.to, params: { siteId: String(id) } })`
- `getSiteData` returns `SiteData[]` — filter by `params.siteId` in loader to get single site
- `key` prop goes on the outermost element in a `.map()`, not on the child component
- `localStorage.getItem("token")!` (non-null assertion) is safe inside `_authenticated` routes
- `beforeLoad` can return data to set route context — accessed via `Route.useRouteContext()` in components or `context` in loader
- `beforeLoad` returning `{ site }` makes it available as `context.site` in child loaders
- Use `Promise.all([...])` in loader for parallel fetches that don't depend on each other
- Add `staleTime: 0` to routes that should always re-fetch on navigation (prevents TanStack Router caching stale data)
- `cn()` imported from `@/lib/utils` — use for conditional className merging
- `CardAction` in `CardHeader` auto-positions to the right via CSS grid (`has-data-[slot=card-action]`)
- `CardFooter` has `border-t` and `bg-muted/50` built in — good for mobile-only status indicators
- Use `loader` for route-level data, `useQuery` for component-level data needing polling/refetch (e.g. graphs, tables)
- Peek-ahead pagination: fetch `limit + 1` rows, slice to `limit` for display, use `data.length > limit` to check next page
- `onHasNextPage` callback pattern: child component reports pagination state up to parent via prop callback + `useEffect`
- Blurred background image: use `absolute inset-0 bg-cover bg-center blur-[Xpx] scale-105` div inside `relative overflow-hidden` card — `scale-105` prevents blur edge artifacts
- `PaginationPrevious`/`PaginationNext` render as `<a>` tags — disable with `pointer-events-none opacity-50` classes
- Table column widths set on `TableHead`, use `table-fixed` on `Table` to enforce them
- Filter pending/apply pattern: maintain `pending` state for in-dropdown selections, only call `onFilterChange` on Apply click — keeps table stable while user browses options
- Axios array query params require `paramsSerializer: { indexes: null }` — otherwise sends `unit_ids[]=1` (brackets) instead of `unit_ids=1` (what FastAPI expects)

## Styling Conventions

### Page containers
- Standard page section: `max-w-screen-xl mx-auto mt-8 px-8` — used on dashboard heading and site detail wrapper
- Card grid wrapper: `max-w-screen-xl mx-auto mt-8 flex flex-wrap md:px-8 justify-center lg:justify-start gap-4 mb-4` — responsive px and alignment

### Gap
- `gap-1` — icon + text inline pairs (MapPin/Cctv + label, flex-col between title lines)
- `gap-4` — between sibling UI blocks (cards, filter row elements, pagination row, login panels)
- `gap-6` — between form fields (`login-form.tsx`)
- Prefer `gap` on the flex/grid container over margins between siblings

### Margin
- `mt-8` — standard top margin for all main page sections
- `mb-4` — only used on card grid bottom (`dashboard-card-list.tsx:6`) to pad page bottom

### Padding
- `px-8` — standard horizontal page padding
- `px-3 py-1` — status badge/pill padding (consistent across all badge instances)

### Typography
- Page headings: `font-extrabold text-3xl tracking-tight text-balance`
- Muted body/description: `text-muted-foreground text-sm`
- Status badge text: `font-bold text-sm tracking-tight`

### Icons
- `h-4 w-4` — icons inline within text/labels (MapPin, Cctv)
- `size-4` — icons inside a sized container (GalleryVerticalEnd in nav logo, login logo)

### Status badge
- Always: `font-bold text-sm tracking-tight px-3 py-1 rounded-full`
- Active: `text-green-800 bg-green-100` / Inactive: `text-red-800 bg-red-100`

### Images / media
- Card overlay: `brightness-60 grayscale dark:brightness-40` on `<img>` + `absolute z-30 bg-black/35` overlay div
- Blurred bg: `absolute inset-0 bg-cover bg-center blur-[1px] scale-105 brightness-60 grayscale dark:brightness-40`

### Disabled interactive elements
- `pointer-events-none opacity-50` — pagination prev/next when at boundary

### Outliers (with reasoning)
- `navbar.tsx:17` — `mx-8 mt-4 2xl:mx-auto` instead of `mx-auto mt-8 px-8`: navbar sits at the very top so uses `mt-4`; uses `mx-8` with `2xl:mx-auto` because NavigationMenu adds its own internal padding
- `contact-form.tsx:16` — `w-full max-w-md mt-10` instead of `max-w-screen-xl px-8`: standalone narrow form, not a full page section
- `login.tsx:27` — `p-6 md:p-10` padding: login uses a unique split-screen layout, padding replaces the standard px-8 container
- `login.tsx:40` — `w-full max-w-xs`: very narrow login form column by design
- `login-form.tsx:49` — `text-2xl font-bold` instead of `text-3xl font-extrabold`: form-internal heading, subordinate to page heading
- `filter.tsx:125` — `text-xs`: only `text-xs` usage in codebase — sub-label for unit type inside dropdown
- `login.tsx:31` — `gap-2`: only `gap-2` usage — brand logo icon + name in nav link
- `login.tsx:45–50` — `dark:brightness-[0.2] dark:grayscale` only (no light-mode filter): login hero image is shown as-is in light mode, heavily dimmed in dark

## Auth

- JWT token fetched from `POST /auth/token` (OAuth2 form-data, not JSON)
- Token stored in localStorage, read on every protected route via `beforeLoad`
- Login form uses `useActionState` — returns `"success"` or error string
- Navigation after login handled in `useEffect` watching `state`
- `useNavigate` and `Link` imported together from `@tanstack/react-router`

## Notes

- CORS: backend allows `localhost:5173` and `127.0.0.1:5173`
- Navbar is in `_authenticated/route.tsx` layout, not `__root.tsx`
- `NavigationMenuLink` used with `asChild` + TanStack `Link` for client-side nav — never use `href` directly
- Use plain `<nav>` as outer layout wrapper for navbar, `NavigationMenu` only wraps the nav links
- Auth check in navbar uses `localStorage.getItem("token")` directly (no hook)
- `_app/` layout was renamed to `_authenticated/`
- `useAuth` hook removed — check token via localStorage directly
- `useEffect` with no dependency array `[]` runs once on mount
- `useActionState` initial state is `0` (not null) — check `state && state !== "success"` for errors
