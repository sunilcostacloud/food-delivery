import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "../baseURL/baseURL";
import { ErrorResponseType } from "@/types/types";
// import { toast } from "react-toastify";
import {
  CheckoutSessionRequest,
  OrderInitialStateType,
  createCheckoutSessionResponseType,
} from "@/types/orderTypes/orderTypes";

export const orderInitialState: OrderInitialStateType = {
    // createCheckoutSessionRequest
    createCheckoutSessionData: null,
    createCheckoutSessionIsLoading: false,
    createCheckoutSessionIsError: false,
    createCheckoutSessionError: "",
    createCheckoutSessionIsSuccess: false,
};

export const createCheckoutSessionRequest = createAsyncThunk(
  "order/createCheckoutSessionRequest",
  async (payload: {
    token: string;
    checkoutData: CheckoutSessionRequest;
  }) => {
    const { token, checkoutData } = payload;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    try {
      const { data } = await axios.post<createCheckoutSessionResponseType>(
        `${API_BASE_URL}/api/order/checkout/create-checkout-session`,
        JSON.stringify(checkoutData),
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

export const orderSlice = createSlice({
  name: "order",
  initialState: orderInitialState,
  reducers: {
    resetcreateCheckoutSessionRequest(state) {
      state.createCheckoutSessionIsLoading = false;
      state.createCheckoutSessionIsError = false;
      state.createCheckoutSessionError = "";
      state.createCheckoutSessionIsSuccess = false;
    },
  },
    extraReducers(builder) {
      builder
      .addCase(createCheckoutSessionRequest.pending, (state) => {
        state.createCheckoutSessionData = null;
        state.createCheckoutSessionIsLoading = true;
        state.createCheckoutSessionIsError = false;
        state.createCheckoutSessionError = "";
        state.createCheckoutSessionIsSuccess = false;
      })
      .addCase(createCheckoutSessionRequest.fulfilled, (state, action) => {
        state.createCheckoutSessionData = action.payload;
        state.createCheckoutSessionIsLoading = false;
        state.createCheckoutSessionIsError = false;
        state.createCheckoutSessionError = "";
        state.createCheckoutSessionIsSuccess = true;
      })
      .addCase(createCheckoutSessionRequest.rejected, (state, action) => {
        state.createCheckoutSessionData = null;
        state.createCheckoutSessionIsLoading = false;
        state.createCheckoutSessionIsError = true;
        state.createCheckoutSessionError = "";
        state.createCheckoutSessionError =
          action.error.message || "An unknown error occurred";
        state.createCheckoutSessionIsSuccess = false;
      })
    },
});

export const { resetcreateCheckoutSessionRequest } = orderSlice.actions;

export default orderSlice.reducer;
