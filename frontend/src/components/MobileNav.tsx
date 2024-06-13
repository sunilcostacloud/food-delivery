import { Menu } from "lucide-react";
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
  const { isAuthenticated, loginWithRedirect, user, isLoading } = useAuth0();

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-orange-500" />
      </SheetTrigger>
      <SheetContent className="space-y-3">
        <SheetTitle>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold mb-4 text-orange-500">
                Loading...
              </h1>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          ) : (
            <>
              {isAuthenticated ? (
                <span className="flex items-center font-bold gap-2">
                  <Avatar>
                    <AvatarImage src={user?.picture} />
                    <AvatarFallback>
                      {user?.name
                        ?.split(" ")
                        .map((part) => part.charAt(0))
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  {user?.email}
                </span>
              ) : (
                <span> Welcome to Food Delivery</span>
              )}
            </>
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
