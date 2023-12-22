import { getAuthorizationHeader } from "./authUtils";
import { handleApiError } from "./handleApiError";
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/jobs`;

export const getJobSuggestions = async (keyword) => {
  try {
    const response = await axios.get(`${BASE_URL}/job-suggestions`, {
      params: { keyword },
    });

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getJobBySlug = async (slug) => {
  try {
    const response = await axios.get(`${BASE_URL}/${slug}`);
    return response.data.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const addJobRating = async (slug, data) => {
  try {
    const response = await axios.post(`${BASE_URL}/${slug}/ratings`, data, {
      headers: getAuthorizationHeader(),
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
