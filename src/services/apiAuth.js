import axios from "axios";

const BASE_URL = "https://stylobackend-production.up.railway.app/api/v1/users";

export const loginApi = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message || "Login failed";
      throw new Error(errorMessage);
    } else if (error.request) {
      throw new Error("No response received");
    } else {
      throw new Error("An error occurred before sending the request");
    }
  }
};

export const signupApi = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/create`, userData);

    return response.data;
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message || "Signup failed";
      throw new Error(errorMessage);
    } else if (error.request) {
      throw new Error("No response received");
    } else {
      throw new Error("An error occurred before sending the request");
    }
  }
};
