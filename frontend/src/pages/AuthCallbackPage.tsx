import { createNewUserRequest } from "@/redux/features/myUserSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { getAccessTokenSilently, user, isAuthenticated, loginWithRedirect } =
    useAuth0();
  const hasCreatedUser = useRef(false);
  const dispatch = useAppDispatch();
  const {
    createNewUserIsLoading,
    createNewUserIsError,
    createNewUserError,
    createNewUserIsSuccess,
  } = useAppSelector((state) => state.myUser);

  useEffect(() => {
    const fetchNewUser = async () => {
      const token = await getAccessTokenSilently();
      if (user?.sub && user?.email && !hasCreatedUser.current) {
        const payload = {
          token,
          credentials: { auth0Id: user.sub, email: user.email, token }
        }
        dispatch(
          createNewUserRequest(payload)
        );
        hasCreatedUser.current = true;
      }
    };
    fetchNewUser();
  }, [user, dispatch]);

  useEffect(() => {
    const handleUserCreation = async () => {
      if (createNewUserIsSuccess && isAuthenticated && user) {
        toast("Login Successful", { autoClose: 2000, type: "success" });
        navigate("/");
      } else if (createNewUserIsError) {
        toast(createNewUserError, { autoClose: 2000, type: "error" });
        await loginWithRedirect();
      }
    };

    handleUserCreation();
  }, [
    createNewUserIsSuccess,
    createNewUserIsError,
    createNewUserError,
    navigate,
    loginWithRedirect,
    isAuthenticated,
    user,
  ]);

  return <>{createNewUserIsLoading ? <h1>Loading..</h1> : null}</>;
};

export default AuthCallbackPage;
