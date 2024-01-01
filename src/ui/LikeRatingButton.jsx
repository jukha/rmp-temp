import { Tooltip } from "primereact/tooltip";
import { useState } from "react";
import { toast } from "react-toastify";

function LikeRatingButton({ parentFunc, likeCount, ratingId, feedbackType }) {
  const [loading, setLoading] = useState(false);
  const [likes, setLikes] = useState(likeCount);

  async function onClick() {
    try {
      if (clickCount > 1) return;

      setLoading(true);

      const res = await parentFunc(ratingId, feedbackType);

      setLikes(res.data.thumbsUp);

      toast.success(res.message);
    } catch (error) {
      toast.error(error.res);
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
              target=".like"
              pt={{
                text: { className: "bg-black" },
              }}
            />
            <i
              className="pi pi-thumbs-up like cursor-pointer text-2xl"
              data-pr-tooltip="Helpful"
              data-pr-position="right"
              data-pr-at="right+5 top"
              data-pr-my="left center-2"
            ></i>
          </span>
        )}

        <span className="font-bold">{likes}</span>
      </button>
    </>
  );
}

export default LikeRatingButton;
