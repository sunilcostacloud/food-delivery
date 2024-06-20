import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserProfileForm, {
  UserFormData,
} from "@/forms/user-profile-form/UserProfileForm";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { useEffect } from "react";
import { getCurrentUserRequest } from "@/redux/features/myUserSlice";

type Props = {
  onCheckout: (userFormData: UserFormData) => void;
  disabled: boolean;
};

const CheckoutButton = ({ onCheckout, disabled }: Props) => {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
    getAccessTokenSilently,
  } = useAuth0();

  const { pathname } = useLocation();

  const dispatch = useAppDispatch();

  const {
    getCurrentUserIsLoading,
    getCurrentUserIsError,
    getCurrentUserError,
    getCurrentUserIsSuccess,
  } = useAppSelector((state) => state.myUser);

  const { createCheckoutSessionIsLoading } = useAppSelector(
    (state) => state.order
  );

  useEffect(() => {
    const getCurrentuser = async () => {
      const token = await getAccessTokenSilently();

      const payload = {
        token,
      };
      dispatch(getCurrentUserRequest(payload));
    };

    getCurrentuser();
  }, [dispatch]);

  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  return (
    <>
      {!isAuthenticated || createCheckoutSessionIsLoading ? (
        <Button onClick={onLogin} className="bg-orange-500 flex-1">
          Log in to check out
        </Button>
      ) : isAuthLoading ? (
        <LoadingButton />
      ) : null}

      {getCurrentUserIsLoading ? (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4 text-orange-500">
            Loading...
          </h1>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-orange-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      ) : getCurrentUserIsError ? (
        <div>{getCurrentUserError}</div>
      ) : getCurrentUserIsSuccess ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button disabled={disabled} className="bg-orange-500 flex-1">
              Go to checkout
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
            <UserProfileForm
              onCheckout={onCheckout}
              title="Confirm Deliery Details"
              buttonText="Continue to payment"
            />
          </DialogContent>
        </Dialog>
      ) : null}
    </>
  );
};

export default CheckoutButton;
