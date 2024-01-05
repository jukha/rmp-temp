import { useEffect, useState } from "react";
import { getUserRatedJobsAndCompanies } from "../../../services/apiAuth";
import { getBgColor } from "../../../utils/calcBgColor";
import { Link } from "react-router-dom";
import LoadMoreBtn from "../../../ui/LoadMoreBtn";

function Ratings() {
  const [userRatedCompanies, setUserRatedCompanies] = useState([]);
  const [userRatedJobs, setUserRatedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 1,
    totalPages: 1,
    totalRecords: 0,
  });

  async function handleLoadMore() {
    try {
      setLoadingMore(true);

      const queryObj = { page: pagination.page + 1, limit: pagination.limit };

      const { ratedJobs, ratedCompanies, pagiationCompanies, paginationJobs } =
        await getUserRatedJobsAndCompanies(queryObj);

      setPagination((prevPagination) => ({
        ...prevPagination,
        page: prevPagination.page + 1,
      }));

      setUserRatedCompanies((prev) => [...prev, ...ratedCompanies]);

      setUserRatedJobs((prev) => [...prev, ...ratedJobs]);

      if (pagiationCompanies?.totalPages > paginationJobs?.totalPages) {
        setPagination(pagiationCompanies);
        setPagination((state) => ({
          ...state,
          totalRecords: pagiationCompanies?.totalRecords,
          totalPages: pagiationCompanies?.totalPages,
        }));
      } else {
        setPagination((state) => ({
          ...state,
          totalRecords: paginationJobs?.totalRecords,
          totalPages: paginationJobs?.totalPages,
        }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingMore(false);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryObj = { page: pagination.page, limit: pagination.limit };

        const {
          ratedJobs,
          ratedCompanies,
          pagiationCompanies,
          paginationJobs,
        } = await getUserRatedJobsAndCompanies(queryObj);

        setUserRatedCompanies(ratedCompanies);

        setUserRatedJobs(ratedJobs);

        if (pagiationCompanies?.totalPages > paginationJobs?.totalPages) {
          setPagination(pagiationCompanies);
          setPagination((state) => ({
            ...state,
            totalRecords: pagiationCompanies?.totalRecords,
            totalPages: pagiationCompanies?.totalPages,
          }));
        } else {
          setPagination((state) => ({
            ...state,
            totalRecords: paginationJobs?.totalRecords,
            totalPages: paginationJobs?.totalPages,
          }));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center">
        <i className="pi pi-spin pi-spinner text-4xl"></i>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="font-bold">Rated Jobs</h2>
          <ul>
            {userRatedJobs.map((jobElement) => (
              <li
                className="mb-6 mt-6  max-w-4xl bg-background px-6 py-5"
                key={jobElement._id}
              >
                <Link
                  className="flex flex-col items-start gap-10 sm:flex-row"
                  to={`/add/job-rating/${jobElement.job.slug}`}
                >
                  <div>
                    <p className="text-black">Quality</p>
                    <div
                      className="my-2 px-3 py-4 text-center text-4xl font-extrabold"
                      style={{
                        background: getBgColor(jobElement.ratingAverage),
                      }}
                    >
                      {jobElement.ratingAverage}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold first-letter:capitalize">
                      {jobElement.job.title}
                    </h3>
                    <p>{jobElement.ratingText}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-bold">Rated Companies</h2>
          <ul>
            {userRatedCompanies.map((companyElement) => (
              <li
                className="mb-6 mt-6  max-w-4xl bg-background px-6 py-5"
                key={companyElement._id}
              >
                <Link
                  className="flex flex-col items-start gap-10 sm:flex-row"
                  to={`/add/company-rating/${companyElement.company.slug}`}
                >
                  <div>
                    <p className="text-black">Quality</p>
                    <div
                      className="my-2 px-3 py-4 text-center text-4xl font-extrabold"
                      style={{
                        background: getBgColor(companyElement.ratingAverage),
                      }}
                    >
                      {companyElement.ratingAverage}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold first-letter:capitalize">
                      {companyElement.company.name}
                    </h3>
                    <p>{companyElement.ratingText}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-4 text-center">
        {pagination.page < pagination.totalPages && (
          <LoadMoreBtn loading={loadingMore} onClick={handleLoadMore} />
        )}
      </div>
    </div>
  );
}

export default Ratings;
