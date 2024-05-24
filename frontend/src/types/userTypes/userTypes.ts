export type User = {
  _id: string;
  email: string;
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export type CreateUserPayload = {
  credentials: {
    auth0Id: string;
    email: string;
  };
  token: string;
};

export type getCurrentUserPayload = {
  token: string;
};

export type CreateUserResponse = {
  auth0Id: string;
  email: string;
  _id: string;
  __v: number;
};

export type UpdateMyUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export type UpdateUserTypes = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
  email?: string | undefined;
};

export type UpdateUserPayload = {
  formdata: UpdateUserTypes;
  token: string;
};

export type myUserInitialStateType = {
  // create user
  createNewUserData: CreateUserResponse | null;
  createNewUserIsLoading: boolean;
  createNewUserIsError: boolean;
  createNewUserError: string;
  createNewUserIsSuccess: boolean;

  // get current user
  getCurrentUserData: User | null;
  getCurrentUserIsLoading: boolean;
  getCurrentUserIsError: boolean;
  getCurrentUserError: string;
  getCurrentUserIsSuccess: boolean;

  // Update Current User
  updateCurrentUserData: User | null,
  updateCurrentUserIsLoading: boolean,
  updateCurrentUserIsError: boolean,
  updateCurrentUserError: string,
  updateCurrentUserIsSuccess: boolean,
};
