import { Tooltip } from "primereact/tooltip";
import { useState } from "react";
import { toast } from "react-toastify";

function DislikeRatingButton({
  parentFunc,
  dislikeCount,
  ratingId,
  feedbackType,
}) {
  const [loading, setLoading] = useState(false);
  const [dislikes, setDislikes] = useState(dislikeCount);

  async function onClick() {
    try {
      setLoading(true);

      const res = await parentFunc(ratingId, feedbackType, null);

      setDislikes(res.data.thumbsDown);

      toast.success(res.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button onClick={onClick} className="flex items-center gap-2">
        {loading ? (
          <i className="pi pi-spin pi-spinner text-2xl"></i>
        ) : (
          <span>
            <Tooltip
              className="bg-black font-poppins"
              target=".dislike"
              pt={{
                text: { className: "bg-black" },
              }}
            />
            <i
              className="pi pi-thumbs-down dislike cursor-pointer text-2xl"
              data-pr-tooltip="Not helpful"
              data-pr-position="right"
              data-pr-at="right+5 top"
              data-pr-my="left center-2"
            ></i>
          </span>
        )}

        <span className="font-bold">{dislikes}</span>
      </button>
    </>
  );
}

export default DislikeRatingButton;
