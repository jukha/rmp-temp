import { useEffect, useState } from "react";
import { getSavedJobsByUser } from "../../../services/apiJob";

function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  console.log(savedJobs);
  useEffect(() => {
    (async () => {
      const response = await getSavedJobsByUser();
      setSavedJobs(response?.data);
    })();
  }, []);
  return (
    <div>
      {savedJobs?.map((el, i) => (
        <div
          key={i}
          className="relative mb-6 mt-6 flex max-w-4xl flex-wrap items-start gap-10 bg-background px-6 py-5"
        >
          <div className=" flex  flex-wrap items-start gap-10">
            <div>
              <p className="text-black">Quality</p>
              <div className="my-2 bg-green-300 px-3 py-4 text-center text-4xl font-extrabold">
                {el?.job?.averageOverallRating}
              </div>
              <span className="text-gray-700">
                {el?.job.ratings?.length} ratings
              </span>
            </div>
            <div>
              <h3 className="mb-2 text-xl font-bold first-letter:capitalize">
                {el?.job?.title}
              </h3>
              <p className="mb-2">{el?.job?.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SavedJobs;
