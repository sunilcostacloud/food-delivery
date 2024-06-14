import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const useFetchAccessToken = () => {
  const navigate = useNavigate();
  const { getAccessTokenSilently, user, isAuthenticated } = useAuth0();
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [accessTokenLoading, setAccessTokenLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchAccessToken = async () => {
      setAccessTokenLoading(true); // Start loading
      try {
        const token = await getAccessTokenSilently();
        setToken(token);
        setError(false); // Clear any previous error
      } catch (err) {
        console.log("error from access token", err)
        setError(true);
        setToken(null); // Clear any previous access token
        toast( "Login Expired", {
          autoClose: 2000,
          type: "error",
        });
        
        setTimeout(() => {
          navigate("/login"); // Navigate to login
        }, 1000)
       
      }  finally {
        setAccessTokenLoading(false); // End loading
      }
    };

    if (isAuthenticated && user) {
      fetchAccessToken();
    }
  }, [isAuthenticated, user, getAccessTokenSilently, navigate]);

  return { token, error, accessTokenLoading };
};

export default useFetchAccessToken;
