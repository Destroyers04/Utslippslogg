import { useNavigate } from "@tanstack/react-router";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Route as indexRoute } from "@/routes/index";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Profile() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear("token");
    navigate({ to: indexRoute.to });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=User" />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={handleLogout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { Profile };
