import { useEffect, useState } from "react";
import { getSavedJobsByUser } from "../../../services/apiJob";
import { Link } from "react-router-dom";
import LoadMoreBtn from "../../../ui/LoadMoreBtn";
import { getBgColor } from "../../../utils/calcBgColor";
import { toast } from "react-toastify";

function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pagination, setPagiation] = useState({
    page: 1,
    limit: 3,
    totalPages: 1,
    totalRecords: 0,
  });

  async function handleLoadMore() {
    try {
      setLoadingMore(true);
      const queryObj = { page: pagination.page + 1, limit: pagination.limit };
      const response = await getSavedJobsByUser(queryObj);
      setPagiation((prevPagination) => ({
        ...prevPagination,
        page: prevPagination.page + 1,
      }));
      setSavedJobs((prev) => [...prev, ...response?.data]);
    } catch (error) {
      console.error("Error fetching saved jobs:", error);
    } finally {
      setLoadingMore(false);
    }
  }

  async function fetchData() {
    try {
      const queryObj = { page: pagination.page, limit: pagination.limit };
      const response = await getSavedJobsByUser(queryObj);
      setPagiation((state) => ({
        ...state,
        totalRecords: response?.pagination?.totalRecords,
        totalPages: response?.pagination?.totalPages,
      }));
      setSavedJobs(response?.data);
    } catch (error) {
      toast.error("Error fetching saved jobs:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-center">
        {loading && <i className="pi pi-spin pi-spinner text-4xl"></i>}
        {!loading && savedJobs.length === 0 && <p>No saved jobs found.</p>}
      </div>
      {!loading &&
        savedJobs.map((el, i) => (
          <Link
            key={i}
            to={`/jobs/${el?.job?.slug}`}
            className="relative mb-6 mt-6 flex max-w-4xl flex-wrap items-start gap-10 bg-background dark:bg-black px-6 py-5"
          >
            <div className="flex flex-wrap items-start gap-10">
              <div>
                <p className="text-black">Quality</p>
                <div
                  className="my-2 px-3 py-4 text-center text-4xl font-extrabold text-black"
                  style={{
                    background: getBgColor(
                      el?.ratingSummary?.data?.overallAvgRating,
                    ),
                  }}
                >
                  {el?.ratingSummary?.data?.overallAvgRating}
                </div>
                <span className="text-gray-700 dark:text-gray-400">
                  {el?.ratingSummary?.data?.totalRatings} ratings
                </span>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-bold first-letter:capitalize">
                  {el?.job?.title}
                </h3>
                <p className="mb-2">{el?.job?.description}</p>
              </div>
            </div>
          </Link>
        ))}
      {pagination.page < pagination.totalPages && (
        <LoadMoreBtn loading={loadingMore} onClick={handleLoadMore} />
      )}
    </div>
  );
}

export default SavedJobs;
