import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "../baseURL/baseURL";
import {
  CreateUserPayload,
  CreateUserResponse,
  UpdateUserPayload,
  User,
  getCurrentUserPayload,
  myUserInitialStateType,
} from "@/types/userTypes/userTypes";
import { ErrorResponseType } from "@/types/types";
import { toast } from "sonner"

export const myUserInitialState: myUserInitialStateType = {
  // create new user
  createNewUserData: null,
  createNewUserIsLoading: false,
  createNewUserIsError: false,
  createNewUserError: "",
  createNewUserIsSuccess: false,

  // get current user
  getCurrentUserData: null,
  getCurrentUserIsLoading: false,
  getCurrentUserIsError: false,
  getCurrentUserError: "",
  getCurrentUserIsSuccess: false,

  // Update Current User
  updateCurrentUserData: null,
  updateCurrentUserIsLoading: false,
  updateCurrentUserIsError: false,
  updateCurrentUserError: "",
  updateCurrentUserIsSuccess: false,
};

export const createNewUserRequest = createAsyncThunk(
  "myUser/createNewUserRequest",
  async (payload: CreateUserPayload) => {
    const { token, credentials } = payload;
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const { data } = await axios.post<CreateUserResponse>(
        `${API_BASE_URL}/api/my/user/createNewUser`,
        credentials,
        { headers }
      );

      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponseType>;
      const errorMessage =
        axiosError.response?.data?.message || "An unknown error occurred";
      throw new Error(errorMessage);
    }
  }
);

export const getCurrentUserRequest = createAsyncThunk(
  "myUser/createCurrentUserRequest",
  async (payload: getCurrentUserPayload) => {
    const { token } = payload;
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const { data } = await axios.get<User>(
        `${API_BASE_URL}/api/my/user/getCurrentUser`,
        { headers }
      );

      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponseType>;
      const errorMessage =
        axiosError.response?.data?.message || "An unknown error occurred";
      throw new Error(errorMessage);
    }
  }
);

export const UpdateCurrentUserRequest = createAsyncThunk(
  "myUser/UpdateCurrentUserRequest",
  async (payload: UpdateUserPayload) => {
    const { token, formdata } = payload;
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const { data } = await axios.put<User>(
        `${API_BASE_URL}/api/my/user/updateCurrentUser`,
        formdata,
        { headers }
      );

      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponseType>;
      const errorMessage =
        axiosError.response?.data?.message || "An unknown error occurred";
      throw new Error(errorMessage);
    }
  }
);

export const myUserSlice = createSlice({
  name: "myUser",
  initialState: myUserInitialState,
  reducers: {
    resetCreateNewUser(state) {
      state.createNewUserData = null;
      state.createNewUserIsLoading = false;
      state.createNewUserIsError = false;
      state.createNewUserError = "";
      state.createNewUserIsSuccess = false;
    },
    resetCurrentUser(state) {
      state.getCurrentUserData = null;
      state.getCurrentUserIsLoading = false;
      state.getCurrentUserIsError = false;
      state.getCurrentUserError = "";
      state.getCurrentUserIsSuccess = false;
    },
    resetUpdateCurrentUser(state) {
      state.updateCurrentUserData = null;
      state.updateCurrentUserIsLoading = false;
      state.updateCurrentUserIsError = false;
      state.updateCurrentUserError = "";
      state.updateCurrentUserIsSuccess = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createNewUserRequest.pending, (state) => {
        state.createNewUserData = null;
        state.createNewUserIsLoading = true;
        state.createNewUserIsError = false;
        state.createNewUserError = "";
        state.createNewUserIsSuccess = false;
      })
      .addCase(createNewUserRequest.fulfilled, (state, action) => {
        state.createNewUserData = action.payload;
        state.createNewUserIsLoading = false;
        state.createNewUserIsError = false;
        state.createNewUserError = "";
        state.createNewUserIsSuccess = true;
      })
      .addCase(createNewUserRequest.rejected, (state, action) => {
        state.createNewUserData = null;
        state.createNewUserIsLoading = false;
        state.createNewUserIsError = true;
        state.createNewUserError = "";
        state.createNewUserError =
          action.error.message || "An unknown error occurred";
        state.createNewUserIsSuccess = false;
      })

      // get current user
      .addCase(getCurrentUserRequest.pending, (state) => {
        state.getCurrentUserData = null;
        state.getCurrentUserIsLoading = true;
        state.getCurrentUserIsError = false;
        state.getCurrentUserError = "";
        state.getCurrentUserIsSuccess = false;
      })
      .addCase(getCurrentUserRequest.fulfilled, (state, action) => {
        state.getCurrentUserData = action.payload;
        state.getCurrentUserIsLoading = false;
        state.getCurrentUserIsError = false;
        state.getCurrentUserError = "";
        state.getCurrentUserIsSuccess = true;
      })
      .addCase(getCurrentUserRequest.rejected, (state, action) => {
        state.getCurrentUserData = null;
        state.getCurrentUserIsLoading = false;
        state.getCurrentUserIsError = true;
        state.getCurrentUserError =
          action.error.message || "An unknown error occurred";
        state.getCurrentUserIsSuccess = false;
      })
      // update current user
      .addCase(UpdateCurrentUserRequest.pending, (state) => {
        state.updateCurrentUserData = null;
        state.updateCurrentUserIsLoading = true;
        state.updateCurrentUserIsError = false;
        state.updateCurrentUserError = "";
        state.updateCurrentUserIsSuccess = false;
      })
      .addCase(UpdateCurrentUserRequest.fulfilled, (state, action) => {
        state.updateCurrentUserData = action.payload;
        state.updateCurrentUserIsLoading = false;
        state.updateCurrentUserIsError = false;
        state.updateCurrentUserError = "";
        state.updateCurrentUserIsSuccess = true;
        toast.success("User Updated Successfully!");
        myUserSlice.caseReducers.resetUpdateCurrentUser(state)
      })
      .addCase(UpdateCurrentUserRequest.rejected, (state, action) => {
        state.updateCurrentUserData = null;
        state.updateCurrentUserIsLoading = false;
        state.updateCurrentUserIsError = true;
        state.updateCurrentUserError =
          action.error.message || "An unknown error occurred";
        state.updateCurrentUserIsSuccess = false;

        toast.error(action.error.message || "An unknown error occurred");
        myUserSlice.caseReducers.resetUpdateCurrentUser(state)
      });
  },
});

export const { resetCreateNewUser, resetCurrentUser, resetUpdateCurrentUser } =
  myUserSlice.actions;

export default myUserSlice.reducer;
