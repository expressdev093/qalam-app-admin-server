import { AuthBindings } from "@refinedev/core";
import axiosInstance from "./common/axios";
import { isExpired, decodeToken } from "react-jwt";

export const TOKEN_KEY = "qalam-learning-auth";
export const USER_KEY = "qalam-learning-user";

export const authProvider: AuthBindings = {
  login: async ({ username, email, password }) => {
    if ((username || email) && password) {
      try {
        const response = await axiosInstance.post(
          "/auth/login",
          {
            email: email,
            password: password,
          },
          {
            headers: {
              "x-api-key": process.env.REACT_APP_API_KEY ?? "api-key",
            },
          }
        );

        const { data } = response;
        localStorage.setItem(TOKEN_KEY, data.access_token);
        localStorage.setItem(USER_KEY, JSON.stringify(data.user));
        return {
          success: true,
          redirectTo: "/",
        };
      } catch (err) {
        return {
          success: false,
          error: {
            name: "Login Failed!",
            message: "Invalid email or password",
          },
        };
      }
    }

    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid username or password",
      },
    };
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    const isTokenExpired = isExpired(token ?? "");
    if (!isTokenExpired) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: "/login",
      error: {
        message: "Check failed",
        name: "Unauthorized",
      },
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return JSON.parse(localStorage.getItem(USER_KEY) ?? "");
    }
    return null;
  },
  onError: async (error) => {
    //console.error("authprovider", JSON.stringify(error, null, 2));
    console.log("onError ", error);
    return { error };
  },
};
