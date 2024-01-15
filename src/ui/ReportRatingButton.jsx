import { Tooltip } from "primereact/tooltip";
import { Link } from "react-router-dom";

function ReportRatingButton({ isReported, ratingId }) {
  if (isReported) {
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
            className="pi report pi-flag-fill cursor-pointer text-2xl text-red-800 dark:text-red-500"
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
      <Link to={`/report/rating/${ratingId}`}>
        <span>
          <Tooltip
            className="bg-black font-poppins"
            target=".report"
            pt={{
              text: { className: "bg-black" },
            }}
          />
          <i
            className="pi report pi-flag cursor-pointer text-2xl text-black dark:text-white"
            data-pr-tooltip="Report this rating"
            data-pr-position="right"
            data-pr-at="right+5 top"
            data-pr-my="left center-2"
          ></i>
        </span>
      </Link>
    </>
  );
}

export default ReportRatingButton;
