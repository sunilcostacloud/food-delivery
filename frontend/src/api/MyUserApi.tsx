import { useAuth0 } from "@auth0/auth0-react";
import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

export type ErrorResponseType = {
    error: object;
  };

export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyUserRequest = async (user: CreateUserRequest) => {
    try {
      const accessToken = await getAccessTokenSilently();
      const { data } = await axios.post(`${API_BASE_URL}/api/my/user`, user, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      return data;
    } catch (error) {
      // Handle errors
      console.log("createMyUserRequest:", error);
      const axiosError = error as AxiosError<ErrorResponseType>;
      const errorMessage =
        axiosError.response?.data?.error || "An unknown error occurred";
        throw new Error(errorMessage as string);
    }
  };

  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createMyUserRequest);

  return {
    createUser,
    isLoading,
    isError,
    isSuccess,
  };
};
