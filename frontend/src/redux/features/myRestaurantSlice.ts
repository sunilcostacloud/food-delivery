import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "../baseURL/baseURL";
import { ErrorResponseType } from "@/types/types";
import { toast } from "sonner";
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
        toast.success("Restaurant Created Successfully!");
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

        toast.error(action.error.message || "An unknown error occurred");
        myRestaurantSlice.caseReducers.resetCreateNewRestaurant(state);
      });
  },
});

export const { resetCreateNewRestaurant } = myRestaurantSlice.actions;
export default myRestaurantSlice.reducer;
