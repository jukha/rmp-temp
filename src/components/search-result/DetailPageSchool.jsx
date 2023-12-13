import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import { getBgColor } from "../../utils/calcBgColor";
import { Tooltip } from "primereact/tooltip";

const ratingsData = [
  { icon: "pi pi-thumbs-up", name: "Happiness", rating: 4.0 },
  { icon: "pi pi-sync", name: "Reputation", rating: 3.0 },
  { icon: "pi pi-angle-double-up", name: "Facilities", rating: 3.0 },
  { icon: "pi pi-heart", name: "Safety", rating: 3.0 },
  { icon: "pi pi-chart-line", name: "Opportunities", rating: 3.0 },
  { icon: "pi pi-tag", name: "Food", rating: 3.0 },
  { icon: "pi pi-map-marker", name: "Location", rating: 3.0 },
  { icon: "pi pi-globe", name: "Internet", rating: 2.0 },
  { icon: "pi pi-users", name: "Social", rating: 2.0 },
  { icon: "pi pi-building", name: "Clubs", rating: 3.0 },
];

function DetailPageSchool() {
  return (
    <>
      <div className="sticky top-[90px] z-50 w-full bg-white py-4 shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] lg:py-6">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div>
            <p>Southfield, MI</p>
            <h2 className="my-2 text-xl font-extrabold lg:my-3 lg:text-4xl">
              Abcott Institute
            </h2>
            <Link className="font-medium underline">View all Jobs</Link>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div>
              <Button text="Rate" type="primary" to="/add/company-rating/abc" />
            </div>
            <div>
              <Button text="Compare" to="/compare/companies/abc/abc" />
            </div>
          </div>
        </div>
      </div>
      <main className="container mx-auto px-4 pt-16">
        <div className="mb-20 flex max-w-3xl flex-col items-center justify-between gap-10 md:flex-row">
          <div className="">
            <h2 className="text-6xl font-extrabold lg:text-8xl">2.8</h2>
            <p>Overall Quality</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-4">
            {ratingsData.map((rating, i) => (
              <div key={i} className="flex justify-between gap-4">
                <div className="flex items-center gap-4">
                  <i className={`text-3xl ${rating.icon}`}></i>
                  <p className="text-xl">{rating.name}</p>
                </div>
                <div className="relative">
                  <span
                    className="absolute block h-full w-2/3 bg-black"
                    style={{ background: getBgColor(rating.rating) }}
                  ></span>
                  <h6 className="relative py-1 text-4xl font-extrabold">
                    {rating.rating.toFixed(1)}
                  </h6>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-6 mt-6 flex max-w-4xl flex-wrap items-start gap-0 bg-background px-6 py-5 lg:gap-10">
            <div>
              <div className="mb-6">
                <p className="text-black">Overall</p>
                <div
                  className="my-2 px-3 py-4 text-4xl font-extrabold"
                  style={{ background: getBgColor(4) }}
                >
                  4.0
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-5 text-end font-medium">Apr 14th, 2023</h3>
              <p>
                Oddly functional chaos … mean nurse professor and the nursing
                students are rude as ever .. great central processing and
                surgical tech students
              </p>
              <div className="mt-6 grid gap-8 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-4">
                {ratingsData.map((rating, i) => (
                  <div
                    key={i}
                    className="flex flex-col justify-between gap-3 sm:flex-row"
                  >
                    <p className="font-semibold">{rating.name}</p>
                    <div className="grid flex-1 grid-cols-[repeat(5,32px)] grid-rows-[18px] justify-start sm:justify-end gap-[2px]">
                      {Array.from({ length: 5 }, (_, index) => {
                        {
                          if (index + 1 > rating.rating)
                            return (
                              <span
                                key={index}
                                className={`bg-gray-300 ${
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
                                className={`${
                                  index === 0
                                    ? "rounded-bl-md rounded-tl-md"
                                    : index === 4
                                      ? "rounded-br-md rounded-tr-md"
                                      : ""
                                }`}
                                style={{
                                  background: getBgColor(rating.rating),
                                }}
                              ></span>
                            );
                        }
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* ============== */}
              {/* rating actions */}
              {/* ============== */}
              <div className="mt-10 flex items-center justify-between">
                <div className="flex gap-4">
                  <Tooltip
                    className="bg-black font-poppins"
                    target=".like"
                    pt={{
                      text: { className: "bg-black" },
                    }}
                  />
                  <Tooltip
                    className="bg-black font-poppins"
                    target=".dislike"
                    pt={{
                      text: { className: "bg-black" },
                    }}
                  />
                  <i
                    className="pi pi-thumbs-up like cursor-pointer text-2xl"
                    data-pr-tooltip="Helpful"
                    data-pr-position="right"
                    data-pr-at="right+5 top"
                    data-pr-my="left center-2"
                  ></i>
                  <i
                    className="pi pi-thumbs-down dislike cursor-pointer text-2xl"
                    data-pr-tooltip="Not helpful"
                    data-pr-position="right"
                    data-pr-at="right+5 top"
                    data-pr-my="left center-2"
                  ></i>
                </div>
                <div className="flex items-center gap-4">
                  <Tooltip
                    className="bg-black font-poppins"
                    target=".share"
                    pt={{
                      text: { className: "bg-black" },
                    }}
                  />
                  <Tooltip
                    className="bg-black font-poppins"
                    target=".report"
                    pt={{
                      text: { className: "bg-black" },
                    }}
                  />
                  <i
                    className="pi pi-share-alt share cursor-pointer text-2xl"
                    data-pr-tooltip="Share this rating"
                    data-pr-position="right"
                    data-pr-at="right+5 top"
                    data-pr-my="left center-2"
                  ></i>
                  <i
                    className="pi pi-flag report cursor-pointer text-2xl"
                    data-pr-tooltip="Report this rating"
                    data-pr-position="right"
                    data-pr-at="right+5 top"
                    data-pr-my="left center-2"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default DetailPageSchool;
