// src/pages/AuthCallbackPage.js
import { useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

import { createNewUserRequest } from "@/redux/features/myUserSlice";
import { useAppDispatch } from "@/redux/hooks";


const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const dispatch = useAppDispatch();
  const hasCreatedUser = useRef(false);

  useEffect(() => {
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      dispatch(createNewUserRequest({ auth0Id: user.sub, email: user.email }));
      hasCreatedUser.current = true;
    }
    navigate("/");
  }, [dispatch, navigate, user]);

  return <>Loading...</>;
};

export default AuthCallbackPage;
