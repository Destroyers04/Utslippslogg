import { GalleryVerticalEnd } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Profile } from "@/components/profile";
import { Link } from "@tanstack/react-router";
import { Route as indexRoute } from "@/routes/index";
import { Route as dashboardRoute } from "@/routes/_authenticated/dashboard";
import { Route as loginRoute } from "@/routes/login";
import { Button } from "@/components/ui/button";

function Navbar() {
  return (
    <nav className="flex justify-between items-center max-w-screen-xl mx-20 mt-4 2xl:mx-auto">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className="bg-primary">
              <Link to={indexRoute.to}>
                <GalleryVerticalEnd className="size-4 text-white" />
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to={dashboardRoute.to}>Dashboard</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      {localStorage.getItem("token") ? (
        <Profile />
      ) : (
        <Button asChild>
          <Link to={loginRoute.to}>Log in</Link>
        </Button>
      )}
    </nav>
  );
}

export { Navbar };
