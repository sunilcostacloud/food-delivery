export type MenuItem = {
  _id: string;
  name: string;
  price: number;
};

export type Restaurant = {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItem[];
  imageUrl: string;
  lastUpdated: string;
};

// export type CreateRestaurantForm = {
//   restaurantName: string;
//   city: string;
//   country: string;
//   deliveryPrice: number;
//   estimatedDeliveryTime: number;
//   cuisines: string[];
//   menuItems: MenuItem[];
//   imageFile: File;
// };

export type CreateRestaurantPayload = {
  formData: FormData;
  token: string;
};

export type myRestaurantInitialStateType = {
  // create New Restaurant
  createNewRestaurantData: Restaurant | null;
  createNewRestaurantIsLoading: boolean;
  createNewRestaurantIsError: boolean;
  createNewRestaurantError: string;
  createNewRestaurantIsSuccess: boolean;
};
