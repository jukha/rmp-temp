import axios from "axios";
import { handleApiError } from "./handleApiError";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/users`;

export const loginApi = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const signupApi = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const googleAuthApi = async (accessToken) => {
  try {
    const response = await axios.post(`${BASE_URL}/google-auth`, {
      googleAccessToken: accessToken,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
