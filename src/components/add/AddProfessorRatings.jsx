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

function AddProfessorRatings() {
  const [country, setCountry] = useState("");
  const [takeAgain, setTakeAgain] = useState("");
  const [showGuidelinesDialog, setShowGuidelinesDialog] = useState(false);
  return (
    <>
      <div className="sticky top-[90px] z-50 w-full bg-white py-4 shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div>
            <p>Southfield, MI</p>
            <h2 className="my-3 text-4xl font-extrabold">Abcott Institute</h2>
          </div>
        </div>
      </div>
      <main className="bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="mb-8 max-w-[900px] bg-white p-7">
            <h6 className="mb-4 font-medium">
              Select Course Code
              <span className="font-medium text-red-600">*</span>
            </h6>
            <Dropdown
              value={country}
              onChange={(e) => setCountry(e.value)}
              options={countries}
              optionLabel="name"
              placeholder="Select Country"
              className="w-full rounded-[34px] border border-gray-200"
              pt={{
                root: "bg-gray-100 text-primary",
                input: "font-poppins py-3 bg-transparent text-black",
                panel: "bg-transparent font-poppins rounded-[34px]",
                wrapper: "bg-gray-100 rounded-[inherit]",
                item: "text-black",
                trigger: "text-black",
              }}
            />
          </div>
          {/* Rate your professor */}
          <div className="mb-8 max-w-[900px] bg-white p-7">
            <h6 className="mb-4 font-medium">
              Rate your professor
              <span className="font-medium text-red-600">*</span>
            </h6>
            <AddRating ratingData={ratingData} />
          </div>
          {/* Rate Difficulty */}
          <div className="mb-8 max-w-[900px] bg-white p-7">
            <h6 className="mb-4 font-medium">
              How difficult was this professor?
              <span className="font-medium text-red-600">*</span>
            </h6>
            <AddRating ratingData={ratingDataDifficulty} />
          </div>
          {/* Take again */}
          <div className="mb-8 max-w-[900px] bg-white p-7">
            <h6 className="mb-4 font-medium">
              Would you take this professor again?
              <span className="font-medium text-red-600">*</span>
            </h6>
            <div className="flex justify-center gap-3">
              <div className="align-items-center flex">
                <RadioButton
                  inputId="takeAgainYes"
                  name="takeAgain"
                  value="yes"
                  onChange={(e) => setTakeAgain(e.value)}
                  checked={takeAgain === "yes"}
                />
                <label htmlFor="takeAgainYes" className="ml-2">
                  Yes
                </label>
              </div>

              <div className="align-items-center flex">
                <RadioButton
                  inputId="takeAgainNo"
                  name="takeAgain"
                  value="no"
                  onChange={(e) => setTakeAgain(e.value)}
                  checked={takeAgain === "no"}
                />
                <label htmlFor="takeAgainNo" className="ml-2">
                  No
                </label>
              </div>
            </div>
          </div>
          {/* Credit */}
          <div className="mb-8 max-w-[900px] bg-white p-7">
            <h6 className="mb-4 font-medium">
              Was this class taken for credit?
              <span className="font-medium text-red-600">*</span>
            </h6>
            <div className="flex justify-center gap-3">
              <div className="align-items-center flex">
                <RadioButton
                  inputId="takeAgainYes"
                  name="takeAgain"
                  value="yes"
                  onChange={(e) => setTakeAgain(e.value)}
                  checked={takeAgain === "yes"}
                />
                <label htmlFor="takeAgainYes" className="ml-2">
                  Yes
                </label>
              </div>

              <div className="align-items-center flex">
                <RadioButton
                  inputId="takeAgainNo"
                  name="takeAgain"
                  value="no"
                  onChange={(e) => setTakeAgain(e.value)}
                  checked={takeAgain === "no"}
                />
                <label htmlFor="takeAgainNo" className="ml-2">
                  No
                </label>
              </div>
            </div>
          </div>
          {/* textbooks */}
          <div className="mb-8 max-w-[900px] bg-white p-7">
            <h6 className="mb-4 font-medium">
              Did this professor use textbooks?
              <span className="font-medium text-red-600">*</span>
            </h6>
            <div className="flex justify-center gap-3">
              <div className="align-items-center flex">
                <RadioButton
                  inputId="takeAgainYes"
                  name="takeAgain"
                  value="yes"
                  onChange={(e) => setTakeAgain(e.value)}
                  checked={takeAgain === "yes"}
                />
                <label htmlFor="takeAgainYes" className="ml-2">
                  Yes
                </label>
              </div>

              <div className="align-items-center flex">
                <RadioButton
                  inputId="takeAgainNo"
                  name="takeAgain"
                  value="no"
                  onChange={(e) => setTakeAgain(e.value)}
                  checked={takeAgain === "no"}
                />
                <label htmlFor="takeAgainNo" className="ml-2">
                  No
                </label>
              </div>
            </div>
          </div>
          {/* attendance */}
          <div className="mb-8 max-w-[900px] bg-white p-7">
            <h6 className="mb-4 font-medium">
              Was attendance mandatory?
              <span className="font-medium text-red-600">*</span>
            </h6>
            <div className="flex justify-center gap-3">
              <div className="align-items-center flex">
                <RadioButton
                  inputId="takeAgainYes"
                  name="takeAgain"
                  value="yes"
                  onChange={(e) => setTakeAgain(e.value)}
                  checked={takeAgain === "yes"}
                />
                <label htmlFor="takeAgainYes" className="ml-2">
                  Yes
                </label>
              </div>

              <div className="align-items-center flex">
                <RadioButton
                  inputId="takeAgainNo"
                  name="takeAgain"
                  value="no"
                  onChange={(e) => setTakeAgain(e.value)}
                  checked={takeAgain === "no"}
                />
                <label htmlFor="takeAgainNo" className="ml-2">
                  No
                </label>
              </div>
            </div>
          </div>
          {/* grades */}
          <div className="mb-8 max-w-[900px] bg-white p-7">
            <h6 className="mb-4 font-medium">
              Select grade received
              <span className="font-medium text-red-600">*</span>
            </h6>
            <Dropdown
              value={country}
              onChange={(e) => setCountry(e.value)}
              options={countries}
              optionLabel="name"
              placeholder="Select Country"
              className="w-full rounded-[34px] border border-gray-200"
              pt={{
                root: "bg-gray-100 text-primary",
                input: "font-poppins py-3 bg-transparent text-black",
                panel: "bg-transparent font-poppins rounded-[34px]",
                wrapper: "bg-gray-100 rounded-[inherit]",
                item: "text-black",
                trigger: "text-black",
              }}
            />
          </div>
          {/* tags */}
          <div className="mb-8 max-w-[900px] bg-white p-7">
            <h6 className="mb-4 font-medium">
              Select up to 3 tags
              <span className="font-medium text-red-600">*</span>
            </h6>
            <div className="flex flex-wrap gap-4">
              <span className="inline-block rounded-2xl bg-gray-300 px-4 py-2 uppercase">
                Extra credit
              </span>
              <span className="inline-block rounded-2xl bg-gray-300 px-4 py-2 uppercase">
                Get ready to read
              </span>
              <span className="inline-block rounded-2xl bg-gray-300 px-4 py-2 uppercase">
                Caring
              </span>
              <span className="inline-block rounded-2xl bg-gray-300 px-4 py-2 uppercase">
                Get ready to read
              </span>
              <span className="inline-block rounded-2xl bg-gray-300 px-4 py-2 uppercase">
                Caring
              </span>
              <span className="inline-block rounded-2xl bg-gray-300 px-4 py-2 uppercase">
                Get ready to read
              </span>
              <span className="inline-block rounded-2xl bg-gray-300 px-4 py-2 uppercase">
                Get ready to read
              </span>
              <span className="inline-block rounded-2xl bg-gray-300 px-4 py-2 uppercase">
                Caring
              </span>
              <span className="inline-block rounded-2xl bg-gray-300 px-4 py-2 uppercase">
                Get ready to read
              </span>
            </div>
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

export default AddProfessorRatings;
