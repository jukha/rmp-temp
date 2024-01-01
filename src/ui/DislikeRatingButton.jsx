import { Tooltip } from "primereact/tooltip";

function DislikeRatingButton({ onClick, dislikeCount = 0 }) {
  return (
    <>
      <Tooltip
        className="bg-black font-poppins"
        target=".dislike"
        pt={{
          text: { className: "bg-black" },
        }}
      />
      <button onClick={onclick} className="flex items-center gap-2">
        <i
          className="pi pi-thumbs-down dislike cursor-pointer text-2xl"
          data-pr-tooltip="Not helpful"
          data-pr-position="right"
          data-pr-at="right+5 top"
          data-pr-my="left center-2"
        ></i>
        <span className="font-bold">{dislikeCount}</span>
      </button>
    </>
  );
}

export default DislikeRatingButton;
