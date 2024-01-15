import { format, parseISO } from "date-fns";
import DislikeRatingButton from "../../ui/DislikeRatingButton";
import LikeRatingButton from "../../ui/LikeRatingButton";
import ReportRatingButton from "../../ui/ReportRatingButton";
import ShareRatingButton from "../../ui/ShareRatingButton";
import { getBgColor } from "../../utils/calcBgColor";
import { transformRatingKeys } from "../../utils/transformRatingsData";
import {
  getRatingDetail,
  updateRatingFeedback,
} from "../../services/apiRating";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../ui/Loader";
import Button from "../../ui/Button";

function SharedRating() {
  const [loading, setLoading] = useState(true);

  const [ratingDetails, setRatingDetails] = useState(null);

  async function handleRatingInteraction(ratingId, feedbackType) {
    const response = await updateRatingFeedback(ratingId, feedbackType);
    return response;
  }

  console.log("ratingDetails", ratingDetails);

  useEffect(() => {
    (async () => {
      try {
        const ratingId = location.pathname.split("/").pop();

        const response = await getRatingDetail(ratingId);

        setRatingDetails(response.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="mx-auto px-4 py-16 xl:container">
      <h3 className="mb-3 text-xl">
        Report a Rating for
        <strong className="pl-1">
          {ratingDetails?.company
            ? ratingDetails?.company?.name
            : ratingDetails?.job?.title}
        </strong>
      </h3>
      <div className="mb-10 mt-6 max-w-max">
        <Button
          to={
            ratingDetails?.company
              ? `/companies/${ratingDetails?.company?.slug}`
              : `/jobs/${ratingDetails?.job?.slug}`
          }
          text="View Details"
          type="primary"
        />
      </div>

      <div className="mb-6 flex max-w-5xl flex-wrap items-start gap-0 bg-background dark:bg-black px-6 py-5 lg:flex-nowrap lg:gap-10">
        <div>
          <div className="mb-6">
            <p className="text-black dark:text-white">Overall</p>
            <div
              className="my-2 px-3 py-4 text-4xl font-extrabold text-black"
              style={{ background: getBgColor(ratingDetails?.ratingAverage) }}
            >
              {ratingDetails?.ratingAverage}
            </div>
          </div>
        </div>
        <div>
          <h3 className="mb-5 text-end font-medium">
            {format(parseISO(ratingDetails.createdAt), "MMM do, yyyy")}
          </h3>
          <p>{ratingDetails?.ratingText}</p>
          <div className="mt-6 grid gap-8 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-4">
            {Object.entries(
              transformRatingKeys(ratingDetails?.parametersRating),
            ).map(([ratingName, ratingValue], i) => (
              <div
                key={i}
                className="flex flex-col justify-between gap-3 sm:flex-row"
              >
                <p className="font-semibold first-letter:capitalize">
                  {ratingName}
                </p>
                <div className="grid flex-1 grid-cols-[repeat(5,32px)] grid-rows-[18px] justify-start gap-[2px] sm:justify-end">
                  {Array.from({ length: 5 }, (_, index) => {
                    {
                      if (index + 1 > ratingValue)
                        return (
                          <span
                            key={index}
                            className={`bg-gray-300 dark:bg-gray-600 ${
                              index === 0
                                ? "rounded-bl-md rounded-tl-md"
                                : index === 4
                                  ? "rounded-br-md rounded-tr-md"
                                  : ""
                            }`}
                          ></span>
                        );
                      else
                        return (
                          <span
                            key={index}
                            className={`${
                              index === 0
                                ? "rounded-bl-md rounded-tl-md"
                                : index === 4
                                  ? "rounded-br-md rounded-tr-md"
                                  : ""
                            }`}
                            style={{
                              background: getBgColor(ratingValue),
                            }}
                          ></span>
                        );
                    }
                  })}
                </div>
              </div>
            ))}
          </div>
          {/* ============== */}
          {/* rating actions */}
          {/* ============== */}
          <div className="mt-10 flex items-center justify-between">
            <div className="flex gap-4">
              <LikeRatingButton
                likeCount={ratingDetails?.thumbsUp}
                parentFunc={handleRatingInteraction}
                ratingId={ratingDetails?._id}
                feedbackType="thumbsUp"
              />
              <DislikeRatingButton
                dislikeCount={ratingDetails?.thumbsDown}
                parentFunc={handleRatingInteraction}
                ratingId={ratingDetails?._id}
                feedbackType="thumbsDown"
              />
            </div>
            <div className="flex items-center gap-4">
              <ShareRatingButton />
              <ReportRatingButton
                isReported={ratingDetails?.isReported}
                ratingId={ratingDetails?._id}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SharedRating;
