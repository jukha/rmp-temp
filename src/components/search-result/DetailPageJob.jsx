import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import { Dropdown } from "primereact/dropdown";
import { Tooltip } from "primereact/tooltip";
import { getBgColor } from "../../utils/calcBgColor";
import { getJobBySlug, getSimilarJobs } from "../../services/apiJob";
import { Link, useLocation } from "react-router-dom";
import Loader from "../../ui/Loader";
import LoadMoreBtn from "../../ui/LoadMoreBtn";
import DetailJobRatingItem from "./DetailJobRatingItem";

function DetailPageJob() {
  const [ratingDistribution, steRatingDistribution] = useState([]);
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState(null);
  const location = useLocation();
  const [loadingMore, setLoadingMore] = useState(false);
  const [similarJobs, setSimilarJobs] = useState([]);
  const [ratingsData, setRatingsData] = useState([]);
  const [ratingsPagination, setRatingsPagination] = useState({
    page: 1,
    limit: 1,
    totalPages: 1,
    totalRecords: 0,
  });

  async function handleLoadMore() {
    try {
      setLoadingMore(true);
      const queryObj = {
        page: ratingsPagination.page + 1,
        limit: ratingsPagination.limit,
      };
      const slug = location.pathname.split("/").pop();
      const response = await getJobBySlug(slug, queryObj);
      setRatingsPagination((prevPagination) => ({
        ...prevPagination,
        page: prevPagination.page + 1,
      }));
      setRatingsData((prev) => [...prev, ...response?.job?.ratings?.data]);
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
        setLoading(true);
        const slug = location.pathname.split("/").pop();

        const response = await getJobBySlug(slug, queryObj);

        setJob(response?.job);

        steRatingDistribution(response?.job?.ratingDistribution);

        setRatingsData(response?.job?.ratings?.data);

        setRatingsPagination((state) => ({
          ...state,
          totalRecords: response?.job?.ratings?.pagination?.totalRecords,
          totalPages: response?.job?.ratings?.pagination?.totalPages,
        }));

        // After fetching original Job, GET similar jobs based on that job id
        if (response?.job?.id) {
          const similarJobsResponse = await getSimilarJobs(response.job.id);

          setSimilarJobs(similarJobsResponse.data);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [location.pathname]);

  if (loading) {
    return <Loader />;
  }
  return (
    <main className="mx-auto px-4 py-16 xl:container">
      <div className="flex flex-col items-start gap-10 lg:flex-row">
        <div className="max-w-md flex-1">
          <div className="mb-3 flex items-start gap-3">
            <h3 className="text-4xl font-extrabold sm:text-7xl">
              {job?.overallAvgRating}
            </h3>
            <h4 className="text-lg font-medium text-gray-600">/ 5</h4>
          </div>
          <h5 className="font-medium">
            Overall Quality Based on {job?.ratings?.length} ratings
          </h5>
          <h1 className="mb-2 mt-6 text-2xl font-extrabold sm:text-4xl">
            <span className="capitalize">{job?.title}</span>
          </h1>
          <p>
            at
            <Link
              className="pl-1 font-bold underline"
              to={`/companies/${job?.companyDetails?.slug}`}
            >
              {job?.companyDetails?.name}
            </Link>
          </p>

          <div className="my-10 flex items-center gap-3">
            <div>
              <Button text="Rate" to={`/add/job-rating/${job?.slug}`} />
            </div>
            <div>
              <Button
                text="Compare"
                type="primary"
                to={`/compare/jobs/${job?.slug}`}
              />
            </div>
          </div>
        </div>
        {/* rating */}
        <div className="max-w-3xl flex-1">
          <div className="mb-10 bg-gray-200 p-6">
            <h2 className="mb-4 font-bold text-black">Rating Distribution</h2>
            {ratingDistribution.map((rating, i) => {
              return (
                <div
                  key={i}
                  className="mb-4 grid grid-cols-[100px_1fr_50px] gap-3"
                >
                  <div className="flex justify-end gap-2">
                    <span className="text-end font-medium capitalize text-black">
                      {rating.name}
                    </span>
                    <span className="text-black">{rating.value}</span>
                  </div>
                  <span
                    className="w-full rounded-3xl py-3 text-black"
                    style={{ background: getBgColor(rating.value) }}
                  ></span>
                  <span className="text-black">{rating.count}</span>
                </div>
              );
            })}
          </div>
          <div>
            <h3 className="mb-2 font-semibold">
              Check out Similar Jobs at {job?.companyDetails?.name}
            </h3>
            <div className="flex flex-col justify-center gap-3 bg-blue-300 p-8 xl:flex-row">
              {similarJobs.map((similarJob, i) => (
                <Link
                  key={i}
                  to={`/jobs/${similarJob.slug}`}
                  className="flex items-start gap-3"
                >
                  <span className="flex min-h-[48px] min-w-[48px] items-center justify-center bg-primary p-3 font-bold text-white">
                    {similarJob.overallAvgRating}
                  </span>
                  <h5 className="text-black">{similarJob.title}</h5>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-14">
        <h2 className="mb-4 text-xl font-bold">
          Insights from {ratingsData?.length} Reviews
        </h2>

        {/* ============== */}
        {/* Ratings result */}
        {/* ============== */}
        <div>
          {ratingsData &&
            ratingsData.map((rating, i) => (
              <DetailJobRatingItem rating={rating} key={i} />
            ))}
          {ratingsPagination.page < ratingsPagination.totalPages && (
            <LoadMoreBtn loading={loadingMore} onClick={handleLoadMore} />
          )}
        </div>
      </div>
    </main>
  );
}

export default DetailPageJob;
