import { Link, useLocation } from "react-router-dom";
import Button from "../../ui/Button";
import { getBgColor } from "../../utils/calcBgColor";
import { Tooltip } from "primereact/tooltip";
import { useEffect, useState } from "react";
import { getCompanyBySlug } from "../../services/apiCompany";
import { transformRatingKeys } from "../../utils/transformRatingsData";
import { format, parseISO } from "date-fns";
import { useAuth } from "../../contexts/AuthContext";
import Loader from "../../ui/Loader";
import LoadMoreBtn from "../../ui/LoadMoreBtn";

const ratingsDataForIcons = [
  { icon: "pi pi-sync", name: "reputation" },
  { icon: "pi pi-thumbs-up", name: "company culture" },
  {
    icon: "pi pi-angle-double-up",
    name: "opportunities for advancement",
  },
  { icon: "pi pi-heart", name: "financial stability" },
  { icon: "pi pi-chart-line", name: "work life balance" },
  { icon: "pi pi-tag", name: "employee benefits" },
  { icon: "pi pi-map-marker", name: "leadership and management" },
  { icon: "pi pi-globe", name: "innovation and technology adoption" },
  { icon: "pi pi-users", name: "diversity and inclusion" },
  {
    icon: "pi pi-building",
    name: "corporate social responsibility",
  },
];

function DetailPageCompany() {
  const [company, setCompany] = useState(null);
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [ratingsData, setRatingsData] = useState([]);
  const [ratingsPagination, setRatingsPagination] = useState({
    page: 1,
    limit: 1,
    totalPages: 1,
    totalRecords: 0,
  });

  function getRatingIcon(ratingParam) {
    const paramIndex = ratingsDataForIcons.findIndex(
      (el) => el.name.toLowerCase() === ratingParam?.toLowerCase(),
    );
    return ratingsDataForIcons[paramIndex].icon;
  }

  async function handleLoadMore() {
    try {
      setLoadingMore(true);
      const queryObj = {
        page: ratingsPagination.page + 1,
        limit: ratingsPagination.limit,
      };
      const slug = location.pathname.split("/").pop();
      const response = await getCompanyBySlug(slug, queryObj);
      setRatingsPagination((prevPagination) => ({
        ...prevPagination,
        page: prevPagination.page + 1,
      }));
      setRatingsData((prev) => [...prev, ...response?.company?.ratings?.data]);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoadingMore(false);
    }
  }
  useEffect(() => {
    (async () => {
      try {
        const queryObj = {
          page: ratingsPagination.page,
          limit: ratingsPagination.limit,
        };
        const slug = location.pathname.split("/").pop();
        const response = await getCompanyBySlug(slug, queryObj);
        setCompany(response?.company);
        setRatingsData(response?.company?.ratings?.data);
        setRatingsPagination((state) => ({
          ...state,
          totalRecords: response?.company?.ratings?.pagination?.totalRecords,
          totalPages: response?.company?.ratings?.pagination?.totalPages,
        }));
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [location.pathname]);
  if (loading) return <Loader />;

  return (
    <>
      <div className="z-50 w-full bg-white py-4 shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] lg:py-6">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div>
            <p>{company?.location}</p>
            <h2 className="my-2 text-xl font-extrabold lg:my-3 lg:text-4xl">
              {company?.name}
            </h2>
            <Link
              className="font-medium underline"
              to={
                isAuthenticated
                  ? `/jobs/company/${company?._id}/${user._id}`
                  : `/jobs/company/${company?._id}`
              }
            >
              View all Jobs
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div>
              <Button
                text="Rate"
                type="primary"
                to={`/add/company-rating/${company?.slug}`}
              />
            </div>
            <div>
              <Button
                text="Compare"
                to={`/compare/companies/${company?.slug}`}
              />
            </div>
          </div>
        </div>
      </div>
      <main className="container mx-auto px-4 pt-16">
        <div className="mb-20 flex max-w-max flex-col items-center justify-between gap-10 md:flex-row">
          <div className="">
            <h2 className="text-6xl font-extrabold lg:text-8xl">
              {company?.overallAvgRating}
            </h2>
            <p>Overall Quality</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-4">
            {company?.parametersAvgRatings &&
              Object.entries(
                transformRatingKeys(company.parametersAvgRatings),
              ).map(([ratingName, ratingValue], i) => (
                <div key={i} className="flex justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <i className={`text-3xl ${getRatingIcon(ratingName)}`}></i>
                    <p className="text-xl first-letter:capitalize">
                      {ratingName}
                    </p>
                  </div>
                  <div className="relative">
                    <span
                      className="absolute block h-full w-2/3 bg-black"
                      style={{ background: getBgColor(ratingValue) }}
                    ></span>
                    <h6 className="relative py-1 text-4xl font-extrabold">
                      {ratingValue.toFixed(1)}
                    </h6>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {/* All Ratings */}
        <div className="mb-12">
          {ratingsData &&
            ratingsData.map((rating, i) => (
              <div
                key={i}
                className="mb-6 mt-6 flex max-w-5xl flex-wrap items-start gap-0 bg-background px-6 py-5 lg:gap-10"
              >
                <div>
                  <div className="mb-6">
                    <p className="text-black">Overall</p>
                    <div
                      className="my-2 px-3 py-4 text-4xl font-extrabold"
                      style={{ background: getBgColor(rating?.ratingAverage) }}
                    >
                      {rating?.ratingAverage}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="mb-5 text-end font-medium">
                    {format(parseISO(rating.createdAt), "MMM do, yyyy")}
                  </h3>
                  <p>{rating.ratingText}</p>
                  <div className="mt-6 grid gap-8 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-4">
                    {Object.entries(
                      transformRatingKeys(rating.parametersRating),
                    ).map(([ratingName, ratingValue], i) => (
                      <div
                        key={i}
                        className="flex flex-col justify-between gap-3 sm:flex-row"
                      >
                        <p className="font-semibold first-letter:capitalize">
                          {ratingName}
                        </p>
                        <div className="grid flex-1 grid-cols-[repeat(5,32px)] grid-rows-[18px] justify-start gap-[2px] sm:justify-end">
                          {Array.from({ length: 5 }, (_, index) => {
                            {
                              if (index + 1 > ratingValue)
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
                                      background: getBgColor(ratingValue),
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
            ))}
          {ratingsPagination.page < ratingsPagination.totalPages && (
            <LoadMoreBtn loading={loadingMore} onClick={handleLoadMore} />
          )}
        </div>
      </main>
    </>
  );
}

export default DetailPageCompany;
