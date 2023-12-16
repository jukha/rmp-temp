import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import styled from "styled-components";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import AddRating from "../../ui/AddRating";
import { RadioButton } from "primereact/radiobutton";
import { Dialog } from "primereact/dialog";

const countries = [
  { name: "Select Country", value: "" },
  { name: "United States", value: "US" },
  { name: "Canada", value: "CA" },
  // Add more countries as needed
];

const ratingData = [
  { name: "Awful", value: 1 },
  { name: "Bad", value: 2 },
  { name: "Okay", value: 3 },
  { name: "Good", value: 4 },
  { name: "Awesome", value: 5 },
];

const ratingDataDifficulty = [
  { name: "Very Easy", value: 1 },
  { name: "Easy", value: 2 },
  { name: "Average", value: 3 },
  { name: "Difficult", value: 4 },
  { name: "Very Difficult", value: 5 },
];

const locationRatingData = [
  { name: "Very Dissatisfied", value: 1 },
  { name: "Dissatisfied", value: 2 },
  { name: "Neutral", value: 3 },
  { name: "Satisfied", value: 4 },
  { name: "Very Satisfied", value: 5 },
];

const opportunitiesRatingData = [
  { name: "Limited", value: 1 },
  { name: "Some", value: 2 },
  { name: "Moderate", value: 3 },
  { name: "Abundant", value: 4 },
  { name: "Exceptional", value: 5 },
];

const internetRatingData = [
  { name: "Poor", value: 1 },
  { name: "Average", value: 2 },
  { name: "Good", value: 3 },
  { name: "Excellent", value: 4 },
  { name: "Outstanding", value: 5 },
];

const safetyRatingData = [
  { name: "Unsafe", value: 1 },
  { name: "Average", value: 2 },
  { name: "Safe", value: 3 },
  { name: "Exceptional", value: 4 },
  { name: "Very Safe", value: 5 },
];

const foodRatingData = internetRatingData;

function AddCompanyRatings() {
  const [country, setCountry] = useState("");
  const [takeAgain, setTakeAgain] = useState("");
  const [showGuidelinesDialog, setShowGuidelinesDialog] = useState(false);
  return (
    <>
      <div className=" z-50 w-full bg-white py-4 shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div>
            <p>Southfield, MI</p>
            <h2 className="tex-2xl my-3 font-extrabold sm:text-4xl">
              Abcott Institute
            </h2>
          </div>
        </div>
      </div>
      <main className="bg-background">
        <div className="container mx-auto px-4 py-8 sm:py-16">
          {/* Reputation */}
          <div className="mb-8 max-w-[900px] bg-white p-7">
            <h6 className="mb-4 font-medium">
              Reputation
              <span className="font-medium text-red-600">*</span>
            </h6>
            <AddRating ratingData={ratingData} />
          </div>
          {/* Location */}
          <div className="mb-8 max-w-[900px] bg-white p-7">
            <h6 className="mb-4 font-medium">
              Location
              <span className="font-medium text-red-600">*</span>
            </h6>
            <AddRating ratingData={locationRatingData} />
          </div>
          {/* Opportunities */}
          <div className="mb-8 max-w-[900px] bg-white p-7">
            <h6 className="mb-4 font-medium">
              Opportunities
              <span className="font-medium text-red-600">*</span>
            </h6>
            <AddRating ratingData={opportunitiesRatingData} />
          </div>
          {/* Facilities and common areas* */}
          <div className="mb-8 max-w-[900px] bg-white p-7">
            <h6 className="mb-4 font-medium">
              Facilities and common areas*
              <span className="font-medium text-red-600">*</span>
            </h6>
            <AddRating ratingData={ratingDataDifficulty} />
          </div>
          {/* Internet* */}
          <div className="mb-8 max-w-[900px] bg-white p-7">
            <h6 className="mb-4 font-medium">
              Internet*
              <span className="font-medium text-red-600">*</span>
            </h6>
            <AddRating ratingData={internetRatingData} />
          </div>
          {/* Food */}
          <div className="mb-8 max-w-[900px] bg-white p-7">
            <h6 className="mb-4 font-medium">
              Food
              <span className="font-medium text-red-600">*</span>
            </h6>
            <AddRating ratingData={foodRatingData} />
          </div>

          {/* Social */}
          <div className="mb-8 max-w-[900px] bg-white p-7">
            <h6 className="mb-4 font-medium">
              Social
              <span className="font-medium text-red-600">*</span>
            </h6>
            <AddRating ratingData={ratingDataDifficulty} />
          </div>

          {/* Happiness */}
          <div className="mb-8 max-w-[900px] bg-white p-7">
            <h6 className="mb-4 font-medium">
              Happiness
              <span className="font-medium text-red-600">*</span>
            </h6>
            <AddRating ratingData={ratingDataDifficulty} />
          </div>

          {/* Safety */}
          <div className="mb-8 max-w-[900px] bg-white p-7">
            <h6 className="mb-4 font-medium">
              Safety
              <span className="font-medium text-red-600">*</span>
            </h6>
            <AddRating ratingData={safetyRatingData} />
          </div>

          {/* review */}
          <div className="mb-8 max-w-[900px] bg-white p-7">
            <h6 className="mb-4 font-medium">
              Write a Review
              <span className="font-medium text-red-600">*</span>
            </h6>
            <p className="mb-4">
              Discuss the professor's professional abilities including teaching
              style and ability to convey the material clearly
            </p>
            <a
              className="mb-4 inline-flex cursor-pointer items-center gap-3 bg-background p-4"
              onClick={() => setShowGuidelinesDialog(true)}
            >
              <i className="pi pi-info-circle text-xl"></i>
              <h5>Guidelines</h5>
            </a>
            <textarea
              cols="30"
              rows="10"
              className="w-full resize-none border border-black p-4"
              placeholder="What do you want other students to know about this professor?"
            ></textarea>
            <Dialog
              header="Guidelines"
              visible={showGuidelinesDialog}
              style={{ width: "50vw" }}
              onHide={() => setShowGuidelinesDialog(false)}
              pt={{
                root: "bg-background",
                header: "bg-background text-black font-poppins",
                content: "bg-background text-black font-poppins",
              }}
            >
              <ul className="m-0 list-disc pl-5">
                <li className="mb-3">
                  Your rating could be removed if you use profanity or
                  derogatory terms.
                </li>
                <li className="mb-3">
                  Refer to the rating categories to help you better elaborate
                  your comments.
                </li>
                <li>Don’t forget to proof read!</li>
                <div className="mt-8 max-w-max">
                  <Button type="primary" text="View all guidelines" />
                </div>
              </ul>
            </Dialog>
          </div>
          <div className="max-w-[900px] text-center">
            <p className="mb-6">
              By clicking the "Submit" button, I acknowledge that I have read
              and agreed to the Rate My Professors Site Guidelines, Terms of Use
              and Privacy Policy. Submitted data becomes the property of
              RateMyProfessors.com. IP addresses are logged.
            </p>
            <div className="mx-auto max-w-max">
              <Button text="Submit Rating" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default AddCompanyRatings;
