import { getBgColor } from "../../utils/calcBgColor";

const ratingData = [
  { name: "awesome", value: 5, count: 1 },
  { name: "great", value: 4, count: 1 },
  { name: "good", value: 3, count: 4 },
  { name: "ok", value: 2, count: 6 },
  { name: "awful", value: 1, count: 4 },
];

function CompanyValueCard({ companyData, companyNo }) {
  console.log(companyData);
  return (
    <article>
      <div className="mb-8 flex h-60 flex-col items-center justify-center bg-background text-center">
        <div
          className="mx-auto my-2 min-w-[80px] max-w-max px-3 py-4 text-center text-4xl font-extrabold"
          style={{ background: getBgColor(1) }}
        >
          {companyData?.overallAvgRating}
        </div>
        <p className="font-semibold uppercase">Overall</p>
        <p className="mb-6">
          <span className="pr-1">{companyData.ratings?.length}</span>
          Rating
        </p>
        <h3 className="text-xl font-extrabold">{companyData?.name}</h3>
      </div>
      {companyData?.length !== 0 &&
        Object.entries(companyData.parametersAvgRatings).map(
          ([_, ratingValue], i) => {
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
                        index >= ratingValue ? "bg-gray-400" : "bg-primary"
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
                <span
                  className="hidden h-3 w-3 rounded-full sm:inline-block"
                  style={{ background: getBgColor(ratingValue) }}
                ></span>
                <h6 className="font-bold">{ratingValue}</h6>
              </div>
            );
          },
        )}
    </article>
  );
}

export default CompanyValueCard;
