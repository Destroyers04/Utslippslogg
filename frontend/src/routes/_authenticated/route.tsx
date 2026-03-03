import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { Navbar } from "@/components/nav/navbar";
import { Route as loginRoute } from "@/routes/login";
import { getUserData } from "@/api/api";
import axios from "axios";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async () => {
    const token = localStorage.getItem("token");
    // Check if there is an existing token, if not throw to login
    if (!token) throw redirect({ to: loginRoute.to });
    // Verify if the token is valid, if valid return user data
    try {
      const userData = await getUserData(token);
      return { userData };
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      // If not valid, clear it
      localStorage.removeItem("token");
      throw redirect({ to: loginRoute.to });
    }
  },
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <>
      <Navbar></Navbar>
      <Outlet />
    </>
  );
}
