import { HttpError } from "@refinedev/core";
import { TOKEN_KEY } from "../../authProvider";
import axios from "axios";

export const BASE_URL = process.env.REACT_APP_API_BASE_URL ?? "";

const axiosInstance = axios.create({
  baseURL: BASE_URL + "/api",
});

axiosInstance.interceptors.request.use((config: any) => {
  config.headers = {
    ...config.header,
    Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
    "Content-Type": "application/json",
    "x-api-key": process.env.REACT_APP_API_KEY,
  };
  return config;
});

export default axiosInstance;
