import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";

const useFetchAccessToken = () => {
  const { getAccessTokenSilently, user, isAuthenticated } = useAuth0();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const token = await getAccessTokenSilently();
        setAccessToken(token);
      } catch (err) {
        setError("Failed to fetch access token");
      }
    };

    if (isAuthenticated && user) {
      fetchAccessToken();
    }
  }, [isAuthenticated, user, getAccessTokenSilently]);

  return { accessToken, error };
};

export default useFetchAccessToken;
