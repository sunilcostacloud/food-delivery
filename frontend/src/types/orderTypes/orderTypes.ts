import { Restaurant } from "../restaurantTypes/restaurantTypes";
import { User } from "../userTypes/userTypes";

export type CheckoutSessionRequest = {
    cartItems: {
      menuItemId: string;
      name: string;
      quantity: string;
    }[];
    deliveryDetails: {
      email: string;
      name: string;
      addressLine1: string;
      city: string;
    };
    restaurantId: string;
  };

  export type OrderStatus =
  | "placed"
  | "paid"
  | "inProgress"
  | "outForDelivery"
  | "delivered";

export type Order = {
  _id: string;
  restaurant: Restaurant;
  user: User;
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    name: string;
    addressLine1: string;
    city: string;
    email: string;
  };
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  restaurantId: string;
};

export type createCheckoutSessionResponseType = {
    url : string
}


export type OrderInitialStateType = {
    // createCheckoutSessionRequest
    createCheckoutSessionData: null | createCheckoutSessionResponseType,
    createCheckoutSessionIsLoading: boolean,
    createCheckoutSessionIsError: boolean,
    createCheckoutSessionError: string,
    createCheckoutSessionIsSuccess: boolean,
}