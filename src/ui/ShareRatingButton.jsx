import { Tooltip } from "primereact/tooltip";
import { toast } from "react-toastify";

function ShareRatingButton({ ratingId }) {
  async function handleClick() {
    try {
      const textToCopy = `${window.location.origin}/rating/${ratingId}`;

      await navigator.clipboard.writeText(textToCopy);

      toast.success("URL copied to clipboard!");
    } catch (err) {
      toast.error(`Unable to copy to clipboard: ${err.message}`);
    }
  }

  return (
    <>
      <Tooltip
        className="bg-black font-poppins"
        target=".share"
        pt={{
          text: { className: "bg-black" },
        }}
      />
      <button onClick={handleClick}>
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
