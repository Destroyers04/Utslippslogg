import { createFileRoute, redirect } from "@tanstack/react-router"
import { Route as dashboardRoute } from "@/routes/dashboard"

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: dashboardRoute.to })
  },
})
