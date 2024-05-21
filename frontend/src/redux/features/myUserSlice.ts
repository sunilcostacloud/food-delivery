import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "../baseURL/baseURL";
import {
  CreateUserPayload,
  CreateUserResponse,
  myUserInitialStateType,
} from "@/types/userTypes/userTypes";
import { ErrorResponseType } from "@/types/types";

export const myUserInitialState: myUserInitialStateType = {
  // create user
  createNewUserData: null,
  createNewUserIsLoading: false,
  createNewUserIsError: false,
  createNewUserError: "",
  createNewUserIsSuccess: false,
};

export const createNewUserRequest = createAsyncThunk(
  "myUser/createNewUserRequest",
  async (payload: CreateUserPayload) => {
    try {
      const { data } = await axios.post<CreateUserResponse>(
        `${API_BASE_URL}/api/my/user/createNewUser`,
        payload
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
        state.createNewUserError = action.error.message
          ? action.error.message
          : "An unknown error occurred";
        state.createNewUserIsSuccess = false;
      });
  },
});

export const { resetCreateNewUser } = myUserSlice.actions;

export default myUserSlice.reducer;
