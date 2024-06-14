import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "../baseURL/baseURL";
import { ErrorResponseType } from "@/types/types";
import { toast } from "react-toastify";

import {
  CreateRestaurantPayload,
  Restaurant,
  SearchDataResponse,
  SearchState,
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

  // update New Restaurant
  updateRestaurantData: null,
  updateRestaurantIsLoading: false,
  updateRestaurantIsError: false,
  updateRestaurantError: "",
  updateRestaurantIsSuccess: false,

  // getSearchResultsAction
  getSearchResultsData: null,
  getSearchResultsIsLoading: false,
  getSearchResultsIsError: false,
  getSearchResultsError: "",
  getSearchResultsIsSuccess: false,
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
  async (payload: { token: string | null }) => {
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

export const updateRestaurantAction = createAsyncThunk(
  "myRestaurant/updateRestaurantAction",
  async (payload: CreateRestaurantPayload) => {
    const { token, formData } = payload;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const { data } = await axios.put<Restaurant>(
        `${API_BASE_URL}/api/my/restaurant/updateMyRestaurant`,
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

export const getSearchResultsAction = createAsyncThunk(
  "myRestaurant/getSearchResultsAction",
  async (payload: { token: string, searchState: SearchState, city?: string }) => {
    const { token, searchState, city } = payload;
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));
    params.set("sortOption", searchState.sortOption);

    try {
      const { data } = await axios.get<SearchDataResponse>(
        `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`,
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
    resetUpdateRestaurant(state) {
      state.updateRestaurantData = null;
      state.updateRestaurantIsLoading = false;
      state.updateRestaurantIsError = false;
      state.updateRestaurantError = "";
      state.updateRestaurantIsSuccess = false;
    },
  },
  extraReducers(builder) {
    builder
      // create new restaurant
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
      })
      .addCase(createNewRestaurantAction.rejected, (state, action) => {
        state.createNewRestaurantData = null;
        state.createNewRestaurantIsLoading = false;
        state.createNewRestaurantIsError = true;
        state.createNewRestaurantError = "";
        state.createNewRestaurantError =
          action.error.message || "An unknown error occurred";
        state.createNewRestaurantIsSuccess = false;

        toast(action.error.message || "An unknown error occurred", {
          autoClose: 2000,
          type: "error",
        });
        myRestaurantSlice.caseReducers.resetCreateNewRestaurant(state);
      })

      // get restaurant details
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
        state.getMyRestaurantError =
          action.error.message || "An unknown error occurred";
        state.getMyRestaurantIsSuccess = false;
      })

      // update restaurant
      .addCase(updateRestaurantAction.pending, (state) => {
        state.updateRestaurantData = null;
        state.updateRestaurantIsLoading = true;
        state.updateRestaurantIsError = false;
        state.updateRestaurantError = "";
        state.updateRestaurantIsSuccess = false;
      })
      .addCase(updateRestaurantAction.fulfilled, (state, action) => {
        state.updateRestaurantData = action.payload;
        state.updateRestaurantIsLoading = false;
        state.updateRestaurantIsError = false;
        state.updateRestaurantError = "";
        state.updateRestaurantIsSuccess = true;
      })
      .addCase(updateRestaurantAction.rejected, (state, action) => {
        state.updateRestaurantData = null;
        state.updateRestaurantIsLoading = false;
        state.updateRestaurantIsError = true;
        state.updateRestaurantError =
          action.error.message || "An unknown error occurred";
        state.updateRestaurantIsSuccess = false;

        toast(action.error.message || "An unknown error occurred", {
          autoClose: 2000,
          type: "error",
        });
        myRestaurantSlice.caseReducers.resetUpdateRestaurant(state);
      })

      // getSearchResultsAction
      .addCase(getSearchResultsAction.pending, (state) => {
        state.getSearchResultsData = null;
        state.getSearchResultsIsLoading = true;
        state.getSearchResultsIsError = false;
        state.getSearchResultsError = "";
        state.getSearchResultsIsSuccess = false;
      })
      .addCase(getSearchResultsAction.fulfilled, (state, action) => {
        state.getSearchResultsData = action.payload;
        state.getSearchResultsIsLoading = false;
        state.getSearchResultsIsError = false;
        state.getSearchResultsError = "";
        state.getSearchResultsIsSuccess = true;
      })
      .addCase(getSearchResultsAction.rejected, (state, action) => {
        state.getSearchResultsData = null;
        state.getSearchResultsIsLoading = false;
        state.getSearchResultsIsError = true;
        state.getSearchResultsError =
          action.error.message || "An unknown error occurred";
        state.getSearchResultsIsSuccess = false;
      });
  },
});

export const { resetCreateNewRestaurant, resetUpdateRestaurant } =
  myRestaurantSlice.actions;
export default myRestaurantSlice.reducer;
