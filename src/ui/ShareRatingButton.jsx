import { Tooltip } from "primereact/tooltip";

function ShareRatingButton() {
  return (
    <>
      <Tooltip
        className="bg-black font-poppins"
        target=".share"
        pt={{
          text: { className: "bg-black" },
        }}
      />
      <button>
        <i
          className="pi pi-share-alt share cursor-pointer text-2xl"
          data-pr-tooltip="Share this rating"
          data-pr-position="right"
          data-pr-at="right+5 top"
          data-pr-my="left center-2"
        ></i>
      </button>
    </>
  );
}

export default ShareRatingButton;
