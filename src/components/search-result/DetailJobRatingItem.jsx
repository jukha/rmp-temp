import { format, parseISO } from "date-fns";
import DislikeRatingButton from "../../ui/DislikeRatingButton";
import LikeRatingButton from "../../ui/LikeRatingButton";
import ReportRatingButton from "../../ui/ReportRatingButton";
import ShareRatingButton from "../../ui/ShareRatingButton";
import { getBgColor } from "../../utils/calcBgColor";
import { transformRatingKeys } from "../../utils/transformRatingsData";
import { updateRatingFeedback } from "../../services/apiRating";

function DetailJobRatingItem({ rating }) {
  async function handleRatingInteraction(ratingId, feedbackType) {
    const response = await updateRatingFeedback(ratingId, feedbackType);
    return response;
  }

  return (
    <div>
      <div className="mb-6 mt-6 flex max-w-5xl flex-col items-start gap-0 bg-background px-6 py-5 lg:flex-row lg:gap-10">
        <div>
          <div className="mb-6">
            <p className="text-black">Overall</p>
            <div
              className="my-2 px-3 py-4 text-4xl font-extrabold"
              style={{ background: getBgColor(rating?.ratingAverage) }}
            >
              {rating?.ratingAverage}
            </div>
          </div>
        </div>
        <div>
          <h3 className="mb-5 text-end font-medium">
            {format(parseISO(rating.createdAt), "MMM do, yyyy")}
          </h3>
          <p>{rating.ratingText}</p>
          <div className="mt-6 grid gap-8 md:grid-cols-2 sm:gap-x-10 sm:gap-y-4">
            {Object.entries(transformRatingKeys(rating.parametersRating)).map(
              ([ratingName, ratingValue], i) => (
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
                              className={`bg-gray-300 ${
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
              ),
            )}
          </div>
          {/* ============== */}
          {/* rating actions */}
          {/* ============== */}
          <div className="mt-10 flex items-center justify-between">
            <div className="flex gap-4">
              <LikeRatingButton
                likeCount={rating.thumbsUp}
                parentFunc={handleRatingInteraction}
                ratingId={rating._id}
                feedbackType="thumbsUp"
              />
              <DislikeRatingButton
                dislikeCount={rating.thumbsDown}
                parentFunc={handleRatingInteraction}
                ratingId={rating._id}
                feedbackType="thumbsDown"
              />
            </div>
            <div className="flex items-center gap-4">
              <ShareRatingButton />
              <ReportRatingButton
                isReported={rating.isReported}
                ratingId={rating._id}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailJobRatingItem;
