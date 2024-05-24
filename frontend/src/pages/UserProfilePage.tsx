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
        <div>Loading...</div>
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
