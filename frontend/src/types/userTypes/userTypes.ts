export type User = {
  _id: string;
  email: string;
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export type CreateUserPayload = {
  auth0Id: string;
  email: string;
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

export type myUserInitialStateType = {
  // create user
  createNewUserData: CreateUserResponse | null;
  createNewUserIsLoading: boolean;
  createNewUserIsError: boolean;
  createNewUserError: string;
  createNewUserIsSuccess: boolean;
};
