import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UsernameMenu from "./UsernameMenu";
import { Link } from "react-router-dom";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  return (
    <span className="flex space-x-2 items-center">
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
            <>
              <Link
                to="/order-status"
                className="font-bold hover:text-orange-500"
              >
                Order Status
              </Link>
              <UsernameMenu />
            </>
          ) : (
            <Button
              variant="ghost"
              className="font-bold hover:text-orange-500 hover:bg-white"
              onClick={async () => await loginWithRedirect()}
            >
              Log In
            </Button>
          )}
        </>
      )}
    </span>
  );
};

export default MainNav;
