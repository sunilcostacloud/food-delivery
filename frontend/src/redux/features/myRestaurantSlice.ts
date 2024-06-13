import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "../baseURL/baseURL";
import { ErrorResponseType } from "@/types/types";
import { toast } from 'react-toastify';

import {
  CreateRestaurantPayload,
  Restaurant,
  myRestaurantInitialStateType,
} from "@/types/restaurantTypes/restaurantTypes";

export const myRestaurantInitialState: myRestaurantInitialStateType = {
  // create New Restaurant
  createNewRestaurantData: null,
  createNewRestaurantIsLoading: false,
  createNewRestaurantIsError: false,
  createNewRestaurantError: "",
  createNewRestaurantIsSuccess: false,

  // get my restaurant
  getMyRestaurantData: null,
  getMyRestaurantIsLoading: false,
  getMyRestaurantIsError: false,
  getMyRestaurantError: "",
  getMyRestaurantIsSuccess: false,
};

export const createNewRestaurantAction = createAsyncThunk(
  "myRestaurant/createNewRestaurantAction",
  async (payload: CreateRestaurantPayload) => {
    const { token, formData } = payload;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const { data } = await axios.post<Restaurant>(
        `${API_BASE_URL}/api/my/restaurant/createNewRestaurant`,
        formData,
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

export const getMyRestaurantRequest = createAsyncThunk(
  "myRestaurant/getMyRestaurantRequest",
  async (payload: {token: string}) => {
    const { token } = payload;
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const { data } = await axios.get<Restaurant>(
        `${API_BASE_URL}/api/my/restaurant/getMyRestaurant`,
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

export const myRestaurantSlice = createSlice({
  name: "myRestaurant",
  initialState: myRestaurantInitialState,
  reducers: {
    resetCreateNewRestaurant(state) {
      state.createNewRestaurantData = null;
      state.createNewRestaurantIsLoading = false;
      state.createNewRestaurantIsError = false;
      state.createNewRestaurantError = "";
      state.createNewRestaurantIsSuccess = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createNewRestaurantAction.pending, (state) => {
        state.createNewRestaurantData = null;
        state.createNewRestaurantIsLoading = true;
        state.createNewRestaurantIsError = false;
        state.createNewRestaurantError = "";
        state.createNewRestaurantIsSuccess = false;
      })
      .addCase(createNewRestaurantAction.fulfilled, (state, action) => {
        state.createNewRestaurantData = action.payload;
        state.createNewRestaurantIsLoading = false;
        state.createNewRestaurantIsError = false;
        state.createNewRestaurantError = "";
        state.createNewRestaurantIsSuccess = true;
        toast('Restaurant Created Successfully!', { autoClose: 2000, type: 'success' })
        myRestaurantSlice.caseReducers.resetCreateNewRestaurant(state);
      })
      .addCase(createNewRestaurantAction.rejected, (state, action) => {
        state.createNewRestaurantData = null;
        state.createNewRestaurantIsLoading = false;
        state.createNewRestaurantIsError = true;
        state.createNewRestaurantError = "";
        state.createNewRestaurantError =
          action.error.message || "An unknown error occurred";
        state.createNewRestaurantIsSuccess = false;

        toast(action.error.message || "An unknown error occurred", { autoClose: 2000, type: 'error' })
        myRestaurantSlice.caseReducers.resetCreateNewRestaurant(state);
      })
      .addCase(getMyRestaurantRequest.pending, (state) => {
        state.getMyRestaurantData = null;
        state.getMyRestaurantIsLoading = true;
        state.getMyRestaurantIsError = false;
        state.getMyRestaurantError = "";
        state.getMyRestaurantIsSuccess = false;
      })
      .addCase(getMyRestaurantRequest.fulfilled, (state, action) => {
        state.getMyRestaurantData = action.payload;
        state.getMyRestaurantIsLoading = false;
        state.getMyRestaurantIsError = false;
        state.getMyRestaurantError = "";
        state.getMyRestaurantIsSuccess = true;
      })
      .addCase(getMyRestaurantRequest.rejected, (state, action) => {
        state.getMyRestaurantData = null;
        state.getMyRestaurantIsLoading = false;
        state.getMyRestaurantIsError = true;
        state.getMyRestaurantError = action.error.message || "An unknown error occurred";
        state.getMyRestaurantIsSuccess = false;
      })
  },
});

export const { resetCreateNewRestaurant } = myRestaurantSlice.actions;
export default myRestaurantSlice.reducer;
