import { getAuthorizationHeader } from "./authUtils";
import { handleApiError } from "./handleApiError";
import axios from "axios";

const JOB_API_URL = `${import.meta.env.VITE_API_BASE_URL}/jobs`;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getJobSuggestions = async (keyword) => {
  try {
    const response = await axios.get(`${JOB_API_URL}/job-suggestions`, {
      params: { keyword },
    });

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getJobBySlug = async (slug, queryObj) => {
  try {
    const response = await axios.get(`${JOB_API_URL}/${slug}`, {
      params: queryObj,
    });
    return response.data.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const addJobRating = async (slug, data) => {
  try {
    const response = await axios.post(`${JOB_API_URL}/${slug}/ratings`, data, {
      headers: getAuthorizationHeader(),
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getJobsByCompany = async (companyId, userId, queryObj) => {
  try {
    let response;
    if (userId) {
      response = await axios.get(
        `${JOB_API_URL}/company/${companyId}/${userId}`,
        { params: queryObj },
      );
    } else {
      response = await axios.get(`${JOB_API_URL}/company/${companyId}`, {
        params: queryObj,
      });
    }
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const saveJob = async (jobId) => {
  try {
    const response = await axios.post(`${BASE_URL}/saved-jobs/${jobId}`, null, {
      headers: getAuthorizationHeader(),
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getSavedJobsByUser = async (queryObj) => {
  try {
    const response = await axios.get(`${BASE_URL}/saved-jobs`, {
      headers: getAuthorizationHeader(),
      params: queryObj,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getUserRatingsForCompany = async (companySlug) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/users/company-ratings/${companySlug}`,
      {
        headers: getAuthorizationHeader(),
      },
    );

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const getUserRatingsForJob = async (jobSlug) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/users/job-ratings/${jobSlug}`,
      {
        headers: getAuthorizationHeader(),
      },
    );

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const addJob = async (data) => {
  try {
    const response = await axios.post(`${JOB_API_URL}`, data, {
      headers: getAuthorizationHeader(),
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const searchJobs = async (queryObj) => {
  try {
    const response = await axios.get(`${JOB_API_URL}/search`, {
      params: queryObj,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getSimilarJobs = async (originalJobId) => {
  try {
    const response = await axios.get(
      `${JOB_API_URL}/similar-jobs/${originalJobId}`,
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
