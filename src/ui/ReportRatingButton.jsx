import { Tooltip } from "primereact/tooltip";
import { useState } from "react";
import { toast } from "react-toastify";

function ReportRatingButton({ parentFunc, isReported, ratingId }) {
  const [loading, setLoading] = useState(false);
  const [isFlagged, setIsFlagged] = useState(isReported);

  async function onClick() {
    try {
      setLoading(true);

      const res = await parentFunc(ratingId, null, true);

      setIsFlagged(res.data.isReported);

      toast.success(res.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (isFlagged) {
    return (
      <>
        <button disabled className="cursor-not-allowed opacity-50">
          <Tooltip
            className="bg-black font-poppins"
            target=".report"
            pt={{
              text: { className: "bg-black" },
            }}
          />
          <i
            className="pi report pi-flag-fill cursor-pointer text-2xl text-red-800"
            data-pr-tooltip="Someone has already reported this and it is under review"
            data-pr-position="right"
            data-pr-at="right+5 top"
            data-pr-my="left center-2"
          ></i>
        </button>
      </>
    );
  }

  return (
    <>
      <button onClick={onClick}>
        {loading ? (
          <i className="pi pi-spin pi-spinner text-2xl"></i>
        ) : (
          <span>
            <Tooltip
              className="bg-black font-poppins"
              target=".report"
              pt={{
                text: { className: "bg-black" },
              }}
            />
            <i
              className="pi report pi-flag cursor-pointer text-2xl"
              data-pr-tooltip="Report this rating"
              data-pr-position="right"
              data-pr-at="right+5 top"
              data-pr-my="left center-2"
            ></i>
          </span>
        )}
      </button>
    </>
  );
}

export default ReportRatingButton;
