import { Tooltip } from "primereact/tooltip";
import { useState } from "react";
import { toast } from "react-toastify";

function LikeRatingButton({ parentFunc, likeCount, ratingId, feedbackType }) {
  const [loading, setLoading] = useState(false);
  const [likes, setLikes] = useState(likeCount);

  async function onClick() {
    try {
      setLoading(true);

      const res = await parentFunc(ratingId, feedbackType, null);

      console.log('res',res);

      setLikes(res.data.thumbsUp);

      toast.success(res.message);
    } catch (error) {
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
              target=".like"
              onHide={() => console.log("tooltip hides")}
              pt={{
                text: { className: "bg-black" },
              }}
            />
            <i
              className="pi pi-thumbs-up like cursor-pointer text-2xl text-black dark:text-white"
              data-pr-tooltip="Helpful"
              data-pr-position="left"
              data-pr-at="right+20 top"
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
