import { Tooltip } from "primereact/tooltip";
import { useEffect, useState } from "react";
import { getJobsByCompany, saveJob } from "../../services/apiJob";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";

function CompanyAllJobs() {
  const { isAuthenticated, user } = useAuth();
  const [companyjobs, setCompanyjobs] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [updatingJobId, setUpdatingJobId] = useState(null);
  const [jobSaveStatus, setJobSaveStatus] = useState({});
  const [savingJobStatus, setSavingJobStatus] = useState(false);
  const location = useLocation();

  async function toggleJobSaveStatus(jobId) {
    try {
      setUpdatingJobId(jobId);
      setSavingJobStatus(true);
      const response = await saveJob(jobId);
      if (response?.success) {
        setJobSaveStatus((prevStatus) => ({
          ...prevStatus,
          [jobId]: !prevStatus[jobId],
        }));
        toast.success("Job save status updated successfully.");
      }
    } catch (error) {
      console.log("error");
    } finally {
      setUpdatingJobId(null);
      setSavingJobStatus(false);
    }
  }

  console.log("status", jobSaveStatus);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pathSegments = location.pathname.split("/");
        let companyId;

        if (isAuthenticated) companyId = pathSegments[pathSegments.length - 2];
        else companyId = pathSegments.pop();

        let response;
        if (isAuthenticated)
          response = await getJobsByCompany(companyId, user._id);
        else response = await getJobsByCompany(companyId);
        setCompanyName(response?.companyName);
        setCompanyjobs(response?.data);

        // Initialize job save status based on the response
        const initialSaveStatus = {};
        response?.data.forEach((job) => {
          initialSaveStatus[job._id] = job.isSaved;
        });
        setJobSaveStatus(initialSaveStatus);
      } catch (error) {
        console.log("error", error.message);
      }
    };

    fetchData();
  }, [location.pathname]);

  return (
    <main className="mx-auto px-4 py-16 xl:container">
      <p>
        <strong>{companyjobs?.length}</strong>
        <span className="px-1">Jobs found at</span>
        <strong>{companyName}</strong>
      </p>
      <div>
        {companyjobs.map((job, i) => (
          <div
            key={i}
            className="relative mb-6 mt-6 flex max-w-4xl flex-wrap items-start gap-10 bg-background px-6 py-5"
          >
            <Link
              className=" flex  flex-wrap items-start gap-10"
              to={`/jobs/${job?.slug}`}
            >
              <div>
                <p className="text-black">Quality</p>
                <div className="my-2 bg-green-300 px-3 py-4 text-center text-4xl font-extrabold">
                  {job?.averageOverallRating}
                </div>
                <span className="text-gray-700">
                  {job?.ratings?.length} ratings
                </span>
              </div>

              <div>
                <h3 className="mb-2 text-xl font-bold first-letter:capitalize">
                  {job?.title}
                </h3>
                <p className="mb-2">{job?.description}</p>
              </div>
            </Link>
            <button
              className="absolute right-6 top-6 ml-auto"
              onClick={() => toggleJobSaveStatus(job?._id)}
            >
              {updatingJobId === job?._id && savingJobStatus ? (
                <i className="pi pi-spin pi-spinner"></i>
              ) : (
                <i
                  className={`pi ${
                    !jobSaveStatus[job?._id]
                      ? "pi-bookmark"
                      : "pi-bookmark-fill"
                  }`}
                ></i>
              )}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

export default CompanyAllJobs;
