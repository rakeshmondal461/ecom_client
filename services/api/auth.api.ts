import { ENV_CONSTANT } from "@/constants/secret.constants";
import axios from "axios";

interface LoginRequest {
  email: string;
  password: string;
}

interface SignupRequest extends LoginRequest {
  name: string;
  phoneNumber: string;
}

interface AuthResponse {
  success: boolean;
  statusCode?: number;
  data?: {
    data: {
      id: string;
      email: string;
      name: string;
      phoneNumber: string;
      isActive: boolean;
      jwtToken: string;
    };
  };
  message?: string;
}

export const AuthApis = {
  loginUser: async (userData: LoginRequest): Promise<AuthResponse> => {
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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          statusCode: error.response?.status,
          message: error.response?.data?.message || "Authentication failed",
        };
      }
      return {
        success: false,
        message: "An unexpected error occurred",
      };
    }
  },

  signupUser: async (userData: SignupRequest): Promise<AuthResponse> => {
    try {
      const response = await axios.post(
        `${ENV_CONSTANT.BASE_API_URL}/auth/signup`,
        userData
      );
      return {
        success: true,
        statusCode: response.status,
        data: response.data,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          statusCode: error.response?.status,
          message: error.response?.data?.message || "Registration failed",
        };
      }
      return {
        success: false,
        message: "An unexpected error occurred",
      };
    }
  },
};