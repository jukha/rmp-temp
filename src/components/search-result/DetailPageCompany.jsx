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
import LikeRatingButton from "../../ui/LikeRatingButton";
import DislikeRatingButton from "../../ui/DislikeRatingButton";
import ShareRatingButton from "../../ui/ShareRatingButton";
import ReportRatingButton from "../../ui/ReportRatingButton";
import DetailCompanyRatingItem from "./DetailCompanyRatingItem";

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
    limit: 3,
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
              <DetailCompanyRatingItem key={i} rating={rating} />
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
