import axios from "axios";
import { getAuthorizationHeader } from "./authUtils";
import { handleApiError } from "./handleApiError";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/ratings`;

export const addRating = async (
  entityType,
  entityId,
  parametersRating,
  ratingText,
) => {
  try {
    let requestBody = { parametersRating, ratingText };
    if (entityType === "company") {
      requestBody = { ...requestBody, companyId: entityId };
    } else {
      requestBody = { ...requestBody, jobId: entityId };
    }
    const response = await axios.post(`${BASE_URL}`, requestBody, {
      headers: getAuthorizationHeader(),
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getReviews = async ({ jobId, companyId }) => {
  try {
    const queryParams = jobId
      ? `?jobId=${jobId}`
      : companyId
        ? `?companyId=${companyId}`
        : "";
    const response = await axios.get(`${BASE_URL}/reviews${queryParams}`, {
      headers: getAuthorizationHeader(),
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateRatingFeedback = async (
  ratingId,
  feedbackType,
  isReported,
) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/update-feedback`,
      {
        ratingId,
        feedbackType,
        isReported,
      },
      { headers: getAuthorizationHeader() },
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
