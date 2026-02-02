import { LogInForm } from "@/components/login";
import { useAuth } from "@/hooks/useAuth";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Profile } from "@/components/profile";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <NavigationMenu className="max-w-screen-xl mx-8 mt-4 2xl:mx-auto justify-between">
      <NavigationMenuList className="flex items-center">
        <div>
          <NavigationMenuItem>
            <NavigationMenuLink variant="outline" href="/">
              Home
            </NavigationMenuLink>
          </NavigationMenuItem>
        </div>
        {user && (
          <div>
            <NavigationMenuItem>
              <NavigationMenuLink href="/dashboard">
                Dashboard
              </NavigationMenuLink>
            </NavigationMenuItem>
          </div>
        )}
      </NavigationMenuList>
      <div>
        <NavigationMenuItem className="list-none">
          {!user && (
            <Popover>
              <PopoverTrigger asChild>
                <Button>Log in</Button>
              </PopoverTrigger>
              <PopoverContent>
                <LogInForm />
              </PopoverContent>
            </Popover>
          )}
          {user && <Profile />}
        </NavigationMenuItem>
      </div>
    </NavigationMenu>
  );
}

export { Navbar };
