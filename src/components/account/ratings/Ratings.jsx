import { useEffect, useState } from "react";
import { getUserRatedJobsAndCompanies } from "../../../services/apiAuth";

function Ratings() {
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { ratedJobs, ratedCompanies } =
          await getUserRatedJobsAndCompanies();
        setCompanies(ratedCompanies);
        setJobs(ratedJobs);
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
    <div className="grid grid-cols-2 gap-6">
      <div>
        <h2 className="font-bold">Rated Jobs</h2>
        <ul>
          {jobs.map((job) => (
            <li
              className="mb-6 mt-6 flex max-w-4xl flex-col items-start gap-10 bg-background px-6 py-5 sm:flex-row"
              key={job._id}
            >
              {job.title}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="font-bold">Rated Companies</h2>
        <ul>
          {companies.map((company) => (
            <li key={company._id}>{company.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Ratings;
