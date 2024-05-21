import { CircleUserRound, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import MobileNavLinks from "./MobileNavLinks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MobileNav = () => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-orange-500" />
      </SheetTrigger>
      <SheetContent className="space-y-3">
        <SheetTitle>
          {isAuthenticated ? (
            <span className="flex items-center font-bold gap-2">
              {user?.picture && user?.picture?.length > 0 ? (
                <Avatar>
                  <AvatarImage src={user?.picture} />
                  <AvatarFallback>
                    {user?.name
                      ?.split(" ")
                      .map((part) => part.charAt(0))
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <CircleUserRound className="text-orange-500" />
              )}
              {user?.email}
            </span>
          ) : (
            <span> Welcome to Food Delivery</span>
          )}
        </SheetTitle>
        <Separator />
        <SheetDescription className="flex flex-col gap-4">
          {isAuthenticated ? (
            <MobileNavLinks />
          ) : (
            <Button
              onClick={() => loginWithRedirect()}
              className="flex-1 font-bold bg-orange-500"
            >
              Log In
            </Button>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
