import { useEffect, useState } from "react";
import { getSavedJobsByUser } from "../../../services/apiJob";
import { Link } from "react-router-dom";

function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSavedJobsByUser();
        setSavedJobs(response?.data);
      } catch (error) {
        console.error("Error fetching saved jobs:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

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
            className="relative mb-6 mt-6 flex max-w-4xl flex-wrap items-start gap-10 bg-background px-6 py-5"
          >
            <div className="flex flex-wrap items-start gap-10">
              <div>
                <p className="text-black">Quality</p>
                <div className="my-2 bg-green-300 px-3 py-4 text-center text-4xl font-extrabold">
                  {el?.ratingSummary?.data?.overallAvgRating}
                </div>
                <span className="text-gray-700">
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
    </div>
  );
}

export default SavedJobs;
