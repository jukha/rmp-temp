import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../ui/Loader";
import { getBgColor } from "../../utils/calcBgColor";
import LoadMoreBtn from "../../ui/LoadMoreBtn";
import Button from "../../ui/Button";
import { searchComapnies } from "../../services/apiCompany";

function SearchResultPageCompanies() {
  const [params] = useSearchParams();
  const [queryObj, setQueryObj] = useState(null);
  const [companies, setCompanies] = useState([]);
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
      const queryObjComplete = {
        page: pagination.page + 1,
        limit: pagination.limit,
        ...queryObj,
      };
      const response = await searchComapnies(queryObjComplete);
      setPagiation((prevPagination) => ({
        ...prevPagination,
        page: prevPagination.page + 1,
      }));
      setCompanies((prev) => [...prev, ...response?.data]);
    } catch (error) {
      console.error("Error fetching saved jobs:", error);
    } finally {
      setLoadingMore(false);
    }
  }

  useEffect(() => {
    setQueryObj(Object.fromEntries([...params]));
    async function fetchData() {
      try {
        const queryObjComplete = {
          page: pagination.page,
          limit: pagination.limit,
          ...Object.fromEntries([...params]),
        };
        const response = await searchComapnies(queryObjComplete);
        setPagiation((state) => ({
          ...state,
          totalRecords: response?.pagination?.totalRecords,
          totalPages: response?.pagination?.totalPages,
        }));
        setCompanies(response.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="mx-auto px-4 py-16 xl:container">
      <div>
        {companies.map((company, i) => (
          <Link
            to={`/companies/${company.slug}`}
            key={i}
            className="mb-6 mt-6 flex max-w-4xl flex-wrap items-start gap-10 bg-background px-6 py-5"
          >
            <div>
              <p className="text-black">Quality</p>
              <div
                className="my-2 px-3 py-4 text-4xl font-extrabold"
                style={{
                  background: getBgColor(
                    company?.ratingSummary?.data?.overallAvgRating,
                  ),
                }}
              >
                {company.ratingSummary.data.overallAvgRating}
              </div>
              <span className="text-gray-700">
                {company.ratingSummary.data.totalRatings} ratings
              </span>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-bold">{company.name}</h3>
              <h4 className="mb-2">{company.description}</h4>
              {/* <p className="mb-2 font-medium">{company.company.name}</p> */}
            </div>
          </Link>
        ))}
        {pagination.page < pagination.totalPages && (
          <LoadMoreBtn loading={loadingMore} onClick={handleLoadMore} />
        )}
      </div>
      <div className="mt-10 flex flex-col items-center">
        <p>Don't see the company you're looking for?</p>
        <div className="mt-3 max-w-max">
          <Button
            to="/add/company"
            type="primary"
            text="Add a company"
          ></Button>
        </div>
      </div>
    </main>
  );
}

export default SearchResultPageCompanies;
