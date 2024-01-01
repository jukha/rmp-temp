import { Tooltip } from "primereact/tooltip";

function ReportRatingButton() {
  return (
    <>
      <Tooltip
        className="bg-black font-poppins"
        target=".report"
        pt={{
          text: { className: "bg-black" },
        }}
      />
      <button>
        <i
          className="pi pi-flag report cursor-pointer text-2xl"
          data-pr-tooltip="Report this rating"
          data-pr-position="right"
          data-pr-at="right+5 top"
          data-pr-my="left center-2"
        ></i>
      </button>
    </>
  );
}

export default ReportRatingButton;
