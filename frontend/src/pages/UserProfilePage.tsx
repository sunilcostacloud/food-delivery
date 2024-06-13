import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";
import { getCurrentUserRequest } from "@/redux/features/myUserSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const UserProfilePage = () => {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();

  const {
    getCurrentUserIsLoading,
    getCurrentUserIsError,
    getCurrentUserError,
    getCurrentUserIsSuccess,
  } = useAppSelector((state) => state.myUser);

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

  return (
    <>
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
        <UserProfileForm />
      ) : (
        ""
      )}
    </>
  );
};

export default UserProfilePage;
