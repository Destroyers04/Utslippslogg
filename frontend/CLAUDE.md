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
│   ├── ui/           # shadcn primitives (button, input, table, badge, etc.)
│   ├── navbar.tsx    # Nav bar: uses plain <nav> wrapper, NavigationMenu for links, conditional Profile/Login button
│   ├── profile.tsx   # User profile dropdown (DropdownMenu with logout)
│   ├── contact-form.tsx # Contact form extracted from route
│   ├── login-form.tsx # Login form with useActionState, toast errors, JWT storage
│   ├── site-collection.tsx # Dashboard site list — useQuery fetches getSiteData, renders SiteCards
│   └── site-cards.tsx # Individual site card — Badge status, MapPin location, Cctv station count, navigate to site detail
├── routes/
│   ├── __root.tsx    # Root layout: Outlet, Toaster
│   ├── index.tsx     # Redirects to /dashboard
│   ├── login.tsx     # Login page
│   ├── contact.tsx   # Contact page (renders ContactForm)
│   └── _authenticated/ # Auth-guarded layout route (beforeLoad checks token)
│       ├── route.tsx   # Layout with Navbar + Outlet
│       ├── dashboard.tsx # Main dashboard — renders SiteCollection
│       └── site.$siteId.tsx # Site detail page — loader filters getSiteData by siteId param
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
