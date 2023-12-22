// Function to transform the rating keys with spaces
export function transformRatingKeys(ratings) {
  const transformedRatings = {};
  for (const key in ratings) {
    const modifiedKey = key.replace(/([A-Z])/g, " $1").toLowerCase();
    transformedRatings[modifiedKey] = ratings[key];
  }
  return transformedRatings;
}

// Function to transform company data
export function transformCompanyData(data) {
  const transformedData = {
    name: data.name,
    averageRatings: transformRatingKeys(data.averageRatings),
  };
  return transformedData;
}
