import { handleApiError } from "./handleApiError";
import axios from "axios";
import { getAuthorizationHeader } from "./authUtils";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/companies`;

export const getCompanySuggestions = async (keyword) => {
  try {
    const response = await axios.get(`${BASE_URL}/company-suggestions`, {
      params: { keyword },
    });

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getCompanyBySlug = async (slug) => {
  try {
    const response = await axios.get(`${BASE_URL}/${slug}`);
    return response.data.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const addCompanyRating = async (slug, data) => {
  try {
    const response = await axios.post(`${BASE_URL}/${slug}/ratings`, data, {
      headers: getAuthorizationHeader(),
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
