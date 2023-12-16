import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import styled from "styled-components";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import AddRating from "../../ui/AddRating";
import { RadioButton } from "primereact/radiobutton";
import { Dialog } from "primereact/dialog";
import ReactSpeedometer from "react-d3-speedometer";
import { Slider } from "primereact/slider";
import { InputNumber } from "primereact/inputnumber";

const countries = [
  { name: "Select Country", value: "" },
  { name: "United States", value: "US" },
  { name: "Canada", value: "CA" },
  // Add more countries as needed
];

const ratingData = [
  { name: "Unsatisfactory", value: 1 },
  { name: "Below Expectations", value: 2 },
  { name: "Satisfactory", value: 3 },
  { name: "Above Expectations", value: 4 },
  { name: "Exceptional", value: 5 },
];

const ratingDataDifficulty = [
  { name: "Very Easy", value: 1 },
  { name: "Easy", value: 2 },
  { name: "Moderate", value: 3 },
  { name: "Challenging", value: 4 },
  { name: "Very Challenging", value: 5 },
];

const ReactSpeedometerWrapper = styled.div`
  .segment-value,
  .current-value {
    user-select: none;
  }
  svg {
    height: 200px !important;
  }
`;

function AddJobRatings() {
  const [compensationRating, setCompensationRating] = useState(0);
  const [workLifeBalanceRating, setWorkLifeBalanceRating] = useState(0);
  const [jobSecurityRating, setJobSecurityRating] = useState(0);
  const [growthOpportunitiesRating, setGrowthOpportunitiesRating] = useState(0);
  const [companyCultureRating, setCompanyCultureRating] = useState(0);
  const [jobSatisfactionRating, setJobSatisfactionRating] = useState(0);
  const [workloadRating, setWorkloadRating] = useState(0);
  const [benefitsRating, setBenefitsRating] = useState(0);
  const [flexibilityRating, setFlexibilityRating] = useState(0);

  return (
    <>
      <div className="z-50 w-full bg-white py-4 shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div>
            <p>Southfield, MI</p>
            <h2 className="my-3 text-2xl font-extrabold sm:text-4xl">
              Abcott Institute
            </h2>
          </div>
        </div>
      </div>
      <main className="bg-background">
        <div className="container mx-auto py-16">
          <div className="grid gap-8 px-4  lg:grid-cols-2">
            <div className=" bg-white p-7">
              <h6 className="mb-4 text-center font-medium text-xl">
                Compensation
                <span className="font-medium text-red-600">*</span>
              </h6>
              <AddRating setRating={setCompensationRating} />
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
                Job security
                <span className="font-medium text-red-600">*</span>
              </h6>
              <AddRating setRating={setJobSecurityRating} />
            </div>
            <div className=" bg-white p-7">
              <h6 className="mb-4 text-center font-medium text-xl">
                Opportunities for growth
                <span className="font-medium text-red-600">*</span>
              </h6>
              <AddRating setRating={setGrowthOpportunitiesRating} />
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
                Job satisfaction
                <span className="font-medium text-red-600">*</span>
              </h6>
              <AddRating setRating={setJobSatisfactionRating} />
            </div>
            <div className=" bg-white p-7">
              <h6 className="mb-4 text-center font-medium text-xl">
                Workload
                <span className="font-medium text-red-600">*</span>
              </h6>
              <AddRating setRating={setWorkloadRating} />
            </div>
            <div className=" bg-white p-7">
              <h6 className="mb-4 text-center font-medium text-xl">
                Benefits
                <span className="font-medium text-red-600">*</span>
              </h6>
              <AddRating setRating={setBenefitsRating} />
            </div>
            <div className=" bg-white p-7">
              <h6 className="mb-4 text-center font-medium text-xl">
                Flexibility
                <span className="font-medium text-red-600">*</span>
              </h6>
              <AddRating setRating={setFlexibilityRating} />
            </div>
          </div>
          <div className="max-w-[900px] mx-auto text-center mt-16">
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

export default AddJobRatings;
