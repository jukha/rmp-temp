export const handleApiError = (error) => {
  if (error.response) {
    const errorMessage = error.response.data.message || "Request failed";
    throw new Error(errorMessage);
  } else if (error.request) {
    throw new Error("No response received");
  } else {
    throw new Error("An error occurred before sending the request");
  }
};
