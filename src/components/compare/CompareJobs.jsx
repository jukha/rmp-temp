import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import JobValueCard from "./JobValueCard";
import { useEffect, useState } from "react";
import JobDefaultCard from "./JobDefaultCard";
import { getJobBySlug } from "../../services/apiJob";
import CardSkeleton from "../../ui/CardSkeleton";
import { toast } from "react-toastify";

const ratingData = [
  "Compensation",
  "Work life balance",
  "Job security",
  "Opportunities for growth",
  "Company culture",
  "job satisfaction",
  "Workload",
  "Benefits",
  "Flexibility",
];

function CompareJobs() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showFirstDefaultCard, setShowFirstDefaultCard] = useState(true);
  const [showSecondDefaultCard, setShowSecondDefaultCard] = useState(true);
  const [showFirstValueCard, setShowFirstValueCard] = useState(false);
  const [showSecondValueCard, setShowSecondValueCard] = useState(false);
  const [firstJobData, setFirstJobData] = useState([]);
  const [secondJobData, setSecondJobData] = useState([]);
  const [firstJobDataLoading, setFirstJobDataLoading] = useState(false);
  const [secondJobDataLoading, setSecondJobDataLoading] = useState(false);

  async function fetchJobData(jobSlug) {
    try {
      const response = await getJobBySlug(jobSlug);
      return response;
    } catch (error) {
      toast.error(error.message);
    }
  }

  function handleResetJobsData() {
    setFirstJobData([]);
    setSecondJobData([]);
    navigate("/compare/jobs");
  }

  async function handleShareComparison() {
    try {
      const textToCopy = window.location.href;
      await navigator.clipboard.writeText(textToCopy);
      toast.success("URL copied to clipboard!");
    } catch (err) {
      toast.error(`Unable to copy to clipboard: ${err.message}`);
    }
  }

  useEffect(() => {
    async function initialCheckup() {
      const pathParts = location.pathname.split("/").filter(Boolean);

      switch (pathParts.length) {
        // DEFAULT URL: compare/companies
        case 2:
          setShowFirstDefaultCard(true);

          setShowSecondDefaultCard(true);

          setShowFirstValueCard(false);

          setShowSecondValueCard(false);
          break;

        //compare/companies/:slug
        case 3:
          if (firstJobData?.length === 0) {
            try {
              setFirstJobDataLoading(true);
              const res = await fetchJobData(pathParts[pathParts.length - 1]);
              setFirstJobData(res?.job);
            } catch (error) {
              console.log(error);
            } finally {
              setFirstJobDataLoading(false);
            }
          }
          setShowFirstDefaultCard(false);
          setShowFirstValueCard(true);
          break;

        //compare/companies/:slug/:slug
        case 4:
          // Sent concurrent requests if both jobs data needs to be fetched
          if (firstJobData?.length === 0 && secondJobData?.length === 0) {
            const promisesArr = [
              (async () => {
                try {
                  setFirstJobDataLoading(true);
                  const res = await fetchJobData(
                    pathParts[pathParts.length - 2],
                  );
                  setFirstJobData(res?.job);
                } catch (error) {
                  console.log(error);
                }
              })(),
              (async () => {
                try {
                  setSecondJobDataLoading(true);
                  const res = await fetchJobData(
                    pathParts[pathParts.length - 1],
                  );
                  setSecondJobData(res?.job);
                } catch (error) {
                  console.log(error);
                }
              })(),
            ];
            const result = await Promise.all(promisesArr);
            // console.log("hi", result);
            setFirstJobDataLoading(false);

            setSecondJobDataLoading(false);

            setShowFirstDefaultCard(false);

            setShowSecondDefaultCard(false);

            setShowFirstValueCard(true);

            setShowSecondValueCard(true);
            return;
          }
          if (firstJobData?.length === 0) {
            try {
              setFirstJobDataLoading(true);
              const res = await fetchJobData(pathParts[pathParts.length - 2]);
              setFirstJobData(res?.job);
            } catch (error) {
              console.log(error);
            } finally {
              setFirstJobDataLoading(false);
            }
          }
          if (secondJobData?.length === 0) {
            try {
              setSecondJobDataLoading(true);
              const res = await fetchJobData(pathParts[pathParts.length - 1]);
              setSecondJobData(res?.job);
            } catch (error) {
              console.log(error);
            } finally {
              setSecondJobDataLoading(false);
            }
          }
          setShowFirstDefaultCard(false);
          setShowSecondDefaultCard(false);
          setShowFirstValueCard(true);
          setShowSecondValueCard(true);
        default:
          break;
      }
    }
    initialCheckup();
  }, [location.pathname]);

  return (
    <main className="mx-auto px-4 py-16 xl:container">
      <div className="mb-8 flex flex-wrap justify-between gap-4">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Compare Jobs</h1>
        <div className="flex flex-wrap gap-4">
          <div>
            <Button
              type="primary"
              text="Reset"
              disabled={showFirstDefaultCard && showSecondDefaultCard}
              onClick={handleResetJobsData}
            />
          </div>
          <div>
            <Button
              type="primary"
              text="Share Comparison"
              onClick={handleShareComparison}
              disabled={showFirstDefaultCard || showSecondDefaultCard}
            />
          </div>
        </div>
      </div>
      <div className="grid max-w-6xl gap-3 lg:grid-cols-2">
        <div className="relative">
          {!firstJobDataLoading && showFirstDefaultCard && (
            <JobDefaultCard jobNo={1} />
          )}
          {firstJobDataLoading && <CardSkeleton />}
          {showFirstValueCard && (
            <JobValueCard jobData={firstJobData} jobNo={1} />
          )}
          {(firstJobData?.ratings?.data?.length > 0 ||
            secondJobData?.ratings?.data?.length > 0) && (
            <div className="absolute -right-32 top-[272px] hidden transform lg:block">
              {ratingData.map((rating, i) => (
                <div key={i} className="mb-8 text-center font-semibold">
                  {rating}
                </div>
              ))}
            </div>
          )}
        </div>
        {!secondJobDataLoading && showSecondDefaultCard && (
          <JobDefaultCard jobNo={2} />
        )}
        {secondJobDataLoading && <CardSkeleton />}
        {showSecondValueCard && (
          <JobValueCard jobData={secondJobData} jobNo={2} />
        )}
      </div>
    </main>
  );
}

export default CompareJobs;
