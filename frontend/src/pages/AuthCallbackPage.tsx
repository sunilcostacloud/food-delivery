import { createNewUserRequest } from "@/redux/features/myUserSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { getAccessTokenSilently, user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const hasCreatedUser = useRef(false);
  const dispatch = useAppDispatch();
  const {
    createNewUserIsLoading,
    createNewUserIsError,
    createNewUserError,
    createNewUserIsSuccess,
  } = useAppSelector((state) => state.myUser);

  const fetchAccessToken = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently();
      localStorage.setItem("token", token);
      setAccessToken(token);
    } catch (err) {
      console.error("Error fetching access token", err);
      toast("Failed to fetch access token, Please Login Again", { autoClose: 2000, type: "error" });
      await loginWithRedirect();
    }
  }, [getAccessTokenSilently, loginWithRedirect]);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchAccessToken();
    }
  }, [isAuthenticated, user, fetchAccessToken]);

  useEffect(() => {
    if (accessToken && user?.sub && user?.email && !hasCreatedUser.current) {
      dispatch(createNewUserRequest({ auth0Id: user.sub, email: user.email }));
      hasCreatedUser.current = true;
    }
  }, [accessToken, user, dispatch]);

  useEffect(() => {
    const handleUserCreation = async () => {
      if (createNewUserIsSuccess) {
        toast("Login Successful", { autoClose: 2000, type: "success" });
        navigate("/");
      } else if (createNewUserIsError) {
        toast(createNewUserError, { autoClose: 2000, type: "error" });
        await loginWithRedirect();
      }
    };

    handleUserCreation();
  }, [createNewUserIsSuccess, createNewUserIsError, createNewUserError, navigate, loginWithRedirect]);

  return <>{createNewUserIsLoading ? <h1>Loading..</h1> : null}</>;
};

export default AuthCallbackPage;
