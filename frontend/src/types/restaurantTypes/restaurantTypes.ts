export type MenuItem = {
  _id: string;
  name: string;
  price: number;
};

export type MenuItemType = {
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
  imagePublicId: string;
  lastUpdated?: string;
  __v?: number;
};

export type Pagination = {
  total: number;
  page: number;
  pages: number;
}

export type SearchDataResponse = {
  data: Restaurant[];
  pagination: Pagination;
}

export type CreateRestaurantPayload = {
  formData: FormData;
  token: string;
};

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

export type myRestaurantInitialStateType = {
  // create New Restaurant
  createNewRestaurantData: Restaurant | null;
  createNewRestaurantIsLoading: boolean;
  createNewRestaurantIsError: boolean;
  createNewRestaurantError: string;
  createNewRestaurantIsSuccess: boolean;

  // get my restaurant
  getMyRestaurantData: Restaurant | null;
  getMyRestaurantIsLoading: boolean,
  getMyRestaurantIsError: boolean,
  getMyRestaurantError: string,
  getMyRestaurantIsSuccess: boolean,

  // update New Restaurant
  updateRestaurantData: Restaurant | null;
  updateRestaurantIsLoading: boolean,
  updateRestaurantIsError: boolean,
  updateRestaurantError: string,
  updateRestaurantIsSuccess: boolean,

    // getSearchResultsAction
    getSearchResultsData: SearchDataResponse | null,
    getSearchResultsIsLoading: boolean,
    getSearchResultsIsError: boolean,
    getSearchResultsError: string,
    getSearchResultsIsSuccess: boolean,

    // getRestaurantByIdAction
    getRestaurantByIdData: Restaurant | null,
    getRestaurantByIdIsLoading: boolean,
    getRestaurantByIdIsError: boolean,
    getRestaurantByIdError: string,
    getRestaurantByIdIsSuccess: boolean,
};
