import { useEffect, useState } from "react";
import SearchJobForm from "../header/SearchJobForm";
import { useLocation, useNavigate } from "react-router-dom";

function JobDefaultCard({ jobNo }) {
  const [jobData, setJobData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [disableSecondJobSearch, setDisableSecondJobSearch] = useState(false);

  function handleSelect() {
    if (jobNo === 1) {
      navigate(`/compare/jobs/${jobData[0]?.slug}`);
    } else {
      const pathParts = location.pathname.split("/");
      const firstJobSlug = pathParts[pathParts.length - 1];
      navigate(`/compare/jobs/${firstJobSlug}/${jobData[0]?.slug}`);
    }
  }
  useEffect(() => {
    const pathParts = location.pathname.split("/").filter(Boolean);

    switch (pathParts.length) {
      // DEFAULT URL: compare/companies
      case 2:
        setDisableSecondJobSearch(true);
        break;

      //compare/companies/:slug
      case 3:
        setDisableSecondJobSearch(false);
        break;

      default:
        break;
    }
  }, [location.pathname]);

  return (
    <article>
      <div className="mb-8 flex h-60 flex-col justify-center bg-background px-8 text-center">
        <div>
          <div className="mx-auto mb-8 max-w-max bg-gray-400 text-black p-6 text-4xl font-extrabold">
            N/A
          </div>
          <SearchJobForm
            onSelect={handleSelect}
            onSetData={setJobData}
            disabled={jobNo === 2 && disableSecondJobSearch}
            ignoreHandleEnter={true}
          />
        </div>
      </div>
      {Array.from({ length: 10 }).map((_, i) => {
        return (
          <div
            className={`mb-8 flex flex-col items-center gap-4 ${
              jobNo === 1 ? "sm:flex-row" : "sm:flex-row-reverse"
            }`}
            key={i}
          >
            <div className="grid grid-cols-[repeat(5,57px)] grid-rows-[18px] gap-[2px]">
              {Array.from({ length: 5 }, (_, index) => {
                return (
                  <span
                    key={index}
                    className={`bg-gray-400 dark:bg-gray-800 ${
                      index === 0
                        ? "rounded-bl-md rounded-tl-md"
                        : index === 4
                          ? "rounded-br-md rounded-tr-md"
                          : ""
                    }`}
                  ></span>
                );
              })}
            </div>
            <span className="hidden h-3 w-3 rounded-full bg-gray-500 sm:inline-block"></span>
          </div>
        );
      })}
    </article>
  );
}

export default JobDefaultCard;
