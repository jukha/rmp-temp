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
  /*


Opportunities for advancement
Work-life balance
Employee benefits
Leadership and management
Innovation and technology adoption
Diversity and inclusion
Corporate social responsibility
Financial stability
  */
  const [reputationRating, setReputationRating] = useState(0);
  const [companyCultureRating, setCompanyCultureRating] = useState(0);
  const [advancementOpportunitiesRating, setAdvancementOpportunitiesRating] =
    useState(0);
  const [workLifeBalanceRating, setWorkLifeBalanceRating] = useState(0);
  const [benefitsRating, setBenefitsRating] = useState(0);
  const [managementRating, setManagementRating] = useState(0);
  const [technologyAdoptionRating, setTechnologyAdoptionRating] = useState(0);
  const [diversityRating, setDiversityRating] = useState(0);
  const [socialResponsibilityRating, setSocialResponsibilityRating] =
    useState(0);
  const [financialStability, setFinancialStability] = useState(0);
  const [showGuidelinesDialog, setShowGuidelinesDialog] = useState(false);
  return (
    <>
      <div className="w-full bg-white py-4 shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]">
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
          <div className="grid gap-8 px-4  lg:grid-cols-2">
            <div className=" bg-white p-7">
              <h6 className="mb-4 text-center font-medium text-xl">
                Reputation
                <span className="font-medium text-red-600">*</span>
              </h6>
              <AddRating setRating={setReputationRating} />
            </div>
            <div className=" bg-white p-7">
              <h6 className="mb-4 text-center font-medium text-xl">
                Company culture
                <span className="font-medium text-red-600">*</span>
              </h6>
              <AddRating setRating={setCompanyCultureRating} />
            </div>
            <div className=" bg-white p-7">
              <h6 className="mb-4 text-center font-medium text-xl">
                Opportunities for advancement
                <span className="font-medium text-red-600">*</span>
              </h6>
              <AddRating setRating={setAdvancementOpportunitiesRating} />
            </div>
            <div className=" bg-white p-7">
              <h6 className="mb-4 text-center font-medium text-xl">
                Work-life balance
                <span className="font-medium text-red-600">*</span>
              </h6>
              <AddRating setRating={setWorkLifeBalanceRating} />
            </div>
            <div className=" bg-white p-7">
              <h6 className="mb-4 text-center font-medium text-xl">
                Employee benefits
                <span className="font-medium text-red-600">*</span>
              </h6>
              <AddRating setRating={setBenefitsRating} />
            </div>
            <div className=" bg-white p-7">
              <h6 className="mb-4 text-center font-medium text-xl">
                Leadership and management
                <span className="font-medium text-red-600">*</span>
              </h6>
              <AddRating setRating={setManagementRating} />
            </div>
            <div className=" bg-white p-7">
              <h6 className="mb-4 text-center font-medium text-xl">
                Innovation and technology adoption
                <span className="font-medium text-red-600">*</span>
              </h6>
              <AddRating setRating={setTechnologyAdoptionRating} />
            </div>
            <div className=" bg-white p-7">
              <h6 className="mb-4 text-center font-medium text-xl">
                Diversity and inclusion
                <span className="font-medium text-red-600">*</span>
              </h6>
              <AddRating setRating={setDiversityRating} />
            </div>
            <div className=" bg-white p-7">
              <h6 className="mb-4 text-center font-medium text-xl">
                Corporate social responsibility
                <span className="font-medium text-red-600">*</span>
              </h6>
              <AddRating setRating={setSocialResponsibilityRating} />
            </div>
            <div className=" bg-white p-7">
              <h6 className="mb-4 text-center font-medium text-xl">
                Financial stability
                <span className="font-medium text-red-600">*</span>
              </h6>
              <AddRating setRating={setFinancialStability} />
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-[900px] text-center">
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
