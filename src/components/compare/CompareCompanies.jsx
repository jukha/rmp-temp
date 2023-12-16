import Button from "../../ui/Button";
import { getBgColor } from "../../utils/calcBgColor";

const ratingData = [
  { name: "awesome", value: 5, count: 1 },
  { name: "great", value: 4, count: 1 },
  { name: "good", value: 3, count: 4 },
  { name: "ok", value: 2, count: 6 },
  { name: "awful", value: 1, count: 4 },
];

function CompareCompanies() {
  return (
    <main className="mx-auto px-4 py-16 xl:container">
      <div className="mb-8 flex flex-wrap justify-between gap-4">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Compare Companies</h1>
        <div className="flex flex-wrap gap-4">
          <div>
            <Button type="primary" text="Reset" />
          </div>
          <div>
            <Button type="primary" text="Share Comparison" />
          </div>
        </div>
      </div>
      <div className="grid max-w-4xl gap-3 md:grid-cols-2">
        {/* ======= */}
        {/* 01 */}
        {/* ======= */}
        <div>
          <div className="mb-8 bg-background p-4 text-center">
            <div
              className="mx-auto my-2 max-w-max px-3 py-4 text-4xl font-extrabold"
              style={{ background: getBgColor(1) }}
            >
              1.0
            </div>
            <p className="font-semibold">Overall</p>
            <p className="mb-6">
              <span>1 </span>
              Rating
            </p>
            <h3 className="text-xl font-extrabold">ABC Institue</h3>
          </div>
          <div className="relative">
            {/* ================= */}
            {/* Comparison Params */}
            {/* ================= */}
            <div className="absolute -right-12 hidden transform lg:block">
              {ratingData.map((rating, i) => (
                <div
                  key={i}
                  className="mb-8 text-center font-semibold capitalize"
                >
                  {rating.name}
                </div>
              ))}
            </div>
            {ratingData.map((rating, i) => {
              return (
                <div
                  className="mb-8 flex flex-col items-center gap-4 sm:flex-row"
                  key={i}
                >
                  <div className="grid grid-cols-[repeat(5,57px)] grid-rows-[18px] gap-[2px]">
                    {Array.from({ length: 5 }, (_, index) => {
                      {
                        if (index + 1 > rating.value)
                          return (
                            <span
                              key={index}
                              className={`bg-gray-400 ${
                                index === 0
                                  ? "rounded-bl-md rounded-tl-md"
                                  : index === 4
                                    ? "rounded-br-md rounded-tr-md"
                                    : ""
                              }`}
                            ></span>
                          );
                        else
                          return (
                            <span
                              key={index}
                              className={`bg-primary ${
                                index === 0
                                  ? "rounded-bl-md rounded-tl-md"
                                  : index === 4
                                    ? "rounded-br-md rounded-tr-md"
                                    : ""
                              }`}
                            ></span>
                          );
                      }
                    })}
                  </div>
                  <span
                    className="hidden h-3 w-3 rounded-full sm:inline-block "
                    style={{ background: getBgColor(rating.value) }}
                  ></span>
                  <h6 className="font-bold">{rating.value}</h6>
                </div>
              );
            })}
          </div>
        </div>
        {/* ======= */}
        {/* 02 */}
        {/* ======= */}
        <div>
          <div className="mb-8 bg-background p-4 text-center">
            <div
              className="mx-auto my-2 max-w-max px-3 py-4 text-4xl font-extrabold"
              style={{ background: getBgColor(1) }}
            >
              1.0
            </div>
            <p className="font-semibold">Overall</p>
            <p className="mb-6">
              <span>1 </span>
              Rating
            </p>
            <h3 className="text-xl font-extrabold">ABC Institue</h3>
          </div>
          {ratingData.map((rating, i) => {
            return (
              <div
                className="mb-8 flex flex-col sm:flex-row-reverse items-center gap-4"
                key={i}
              >
                <div className="grid grid-cols-[repeat(5,57px)] grid-rows-[18px] gap-[2px]">
                  {Array.from({ length: 5 }, (_, index) => {
                    {
                      if (index + 1 > rating.value)
                        return (
                          <span
                            key={index}
                            className={`bg-gray-400 ${
                              index === 0
                                ? "rounded-bl-md rounded-tl-md"
                                : index === 4
                                  ? "rounded-br-md rounded-tr-md"
                                  : ""
                            }`}
                          ></span>
                        );
                      else
                        return (
                          <span
                            key={index}
                            className={`bg-primary ${
                              index === 0
                                ? "rounded-bl-md rounded-tl-md"
                                : index === 4
                                  ? "rounded-br-md rounded-tr-md"
                                  : ""
                            }`}
                          ></span>
                        );
                    }
                  })}
                </div>
                <span
                  className="sm:inline-block hidden h-3 w-3 rounded-full"
                  style={{ background: getBgColor(rating.value) }}
                ></span>
                <h6 className="font-bold">{rating.value}</h6>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default CompareCompanies;