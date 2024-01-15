import { getBgColor } from "../../utils/calcBgColor";
import { transformRatingKeys } from "../../utils/transformRatingsData";

function CompanyValueCard({ companyData, companyNo }) {
  if (!companyData) {
    return (
      <div className="mb-8 flex h-60 flex-col items-center justify-center bg-background text-center">
        No data found
      </div>
    );
  }
  return (
    <article>
      <div className="mb-8 flex h-60 flex-col items-center justify-center bg-background text-center">
        <div
          className="mx-auto my-2 min-w-[80px] max-w-max px-3 py-4 text-center text-4xl font-extrabold text-black"
          style={{ background: getBgColor(1) }}
        >
          {companyData?.overallAvgRating}
        </div>
        <p className="font-semibold uppercase text-black">Overall</p>
        <p className="mb-6 text-black">
          <span className="pr-1">{companyData?.ratings?.length}</span>
          Rating
        </p>
        <h3 className="text-xl font-extrabold text-black">{companyData?.name}</h3>
      </div>
      {companyData?.ratings?.length === 0 ? (
        <p className="text-center font-bold">NO ratings found</p>
      ) : (
        companyData?.parametersAvgRatings &&
        Object.entries(
          transformRatingKeys(companyData.parametersAvgRatings),
        ).map(([ratingName, ratingValue], i) => {
          return (
            <div
              className={`mb-8 flex flex-col items-center gap-4 ${
                companyNo === 1 ? "sm:flex-row" : "sm:flex-row-reverse"
              }`}
              key={i}
            >
              <div className="grid grid-cols-[repeat(5,57px)] grid-rows-[18px] gap-[2px]">
                {Array.from({ length: 5 }, (_, index) => (
                  <span
                    key={index}
                    className={`${
                      index >= ratingValue ? "bg-gray-400 dark:bg-gray-800" : "bg-primary"
                    } ${
                      index === 0
                        ? "rounded-bl-md rounded-tl-md"
                        : index === 4
                          ? "rounded-br-md rounded-tr-md"
                          : ""
                    }`}
                  ></span>
                ))}
              </div>
              <p className="font-semibold first-letter:capitalize lg:hidden">
                {ratingName}
              </p>
              <span
                className="hidden h-3 w-3 rounded-full sm:inline-block"
                style={{ background: getBgColor(ratingValue) }}
              ></span>
              <h6 className="font-bold">{ratingValue}</h6>
            </div>
          );
        })
      )}
    </article>
  );
}

export default CompanyValueCard;
