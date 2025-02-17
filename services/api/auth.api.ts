import { ENV_CONSTANT } from "@/constants/secret.constants";
import axios, { AxiosInstance } from "axios";

export const AuthApis = {
    loginUser: async (userData: any) => {
        try {
          const response = await axios.post(
            `${ENV_CONSTANT.BASE_API_URL}/auth/signin`,
            userData
          );
          return {
            success: true,
            statusCode: response.status,
            data: response.data,
          };
        } catch (error: any) {
          console.log("showing error", error)
          return {
            success: false,
            statusCode: error.status,
            message: error.response.data.message,
          };
        }
      },
      signupUser: async (userData: any) => {
        try {
          const response = await axios.post(
            `${ENV_CONSTANT.BASE_API_URL}/auth/signup`,
            userData
          );
          return {
            success: true,
            statusCode: response.status,
            data: response.data.data,
          };
        } catch (error: any) {
          return {
            success: false,
            statusCode: error.status,
            message: error.response.data.message,
          };
        }
      },
}