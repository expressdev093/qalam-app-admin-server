import { HttpError } from "@refinedev/core";
import { TOKEN_KEY } from "../../../authProvider";
import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config: any) => {
  config.headers = {
    ...config.header,
    Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
    "x-api-key": "amir",
    "Content-Type": "application/json",
  };
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const customError: HttpError = {
      ...error,
      message: error.response?.data?.message,
      statusCode: error.response?.status,
    };

    return Promise.reject(customError);
  }
);

export { axiosInstance };
