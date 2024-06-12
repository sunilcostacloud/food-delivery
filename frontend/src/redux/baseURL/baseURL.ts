export const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_BASE_DEV_URL
    : import.meta.env.VITE_API_BASE_PROD_URL;
