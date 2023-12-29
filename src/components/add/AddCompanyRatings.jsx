import { useLocation } from "react-router-dom";
import Button from "../../ui/Button";
import { useEffect, useState } from "react";
import AddRating from "../../ui/AddRating";
import { toast } from "react-toastify";
import { addRating } from "../../services/apiRating";
import { getUserRatingsForCompany } from "../../services/apiJob";

function AddCompanyRatings() {
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

  const location = useLocation();
  const [companyData, setCompanyData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const slug = location.pathname.split("/").pop();
        const response = await getUserRatingsForCompany(slug);
        if (response.success) {
          setCompanyData({
            title: response.data.companyTitle,
            companyId:
              response.data.userRatingForCompany.parametersRating.companyId,
            companyLocation: response.data.companyLocation,
          });
          setReputationRating(
            response.data.userRatingForCompany.parametersRating.reputation,
          );
          setCompanyCultureRating(
            response.data.userRatingForCompany.parametersRating.companyCulture,
          );
          setAdvancementOpportunitiesRating(
            response.data.userRatingForCompany.parametersRating
              .opportunitiesForAdvancement,
          );
          setWorkLifeBalanceRating(
            response.data.userRatingForCompany.parametersRating.workLifeBalance,
          );
          setBenefitsRating(
            response.data.userRatingForCompany.parametersRating
              .employeeBenefits,
          );
          setManagementRating(
            response.data.userRatingForCompany.parametersRating
              .leadershipAndManagement,
          );
          setTechnologyAdoptionRating(
            response.data.userRatingForCompany.parametersRating
              .innovationAndTechnologyAdoption,
          );
          setDiversityRating(
            response.data.userRatingForCompany.parametersRating
              .diversityAndInclusion,
          );
          setSocialResponsibilityRating(
            response.data.userRatingForCompany.parametersRating
              .corporateSocialResponsibility,
          );
        }
      } catch (error) {}
    })();
  }, [location.pathname]);

  async function handleSubmit() {
    try {
      const data = {
        reputation: reputationRating,
        companyCulture: companyCultureRating,
        opportunitiesForAdvancement: advancementOpportunitiesRating,
        workLifeBalance: workLifeBalanceRating,
        employeeBenefits: benefitsRating,
        leadershipAndManagement: managementRating,
        innovationAndTechnologyAdoption: technologyAdoptionRating,
        diversityAndInclusion: diversityRating,
        corporateSocialResponsibility: socialResponsibilityRating,
        financialStability: financialStability,
      };
      const apiResponse = await addRating(
        "company",
        companyData.companyId,
        data,
        "Great company",
      );

      if (apiResponse.success) {
        toast.success(apiResponse.message);
      } else {
        toast.error(apiResponse.message);
      }
    } catch (error) {
      toast.error("An error occurred while submitting the rating.");
    }
  }
  return (
    <>
      <div className="w-full bg-white py-4 shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div>
            <p>{companyData?.companyLocation}</p>
            <h2 className="tex-2xl my-3 font-extrabold sm:text-4xl">
              {companyData?.title}
            </h2>
          </div>
        </div>
      </div>
      <main className="bg-background">
        <div className="container mx-auto px-4 py-8 sm:py-16">
          <div className="grid gap-8 px-4  lg:grid-cols-2">
            <div className=" bg-white p-7">
              <h6 className="mb-4 text-center text-xl font-medium">
                Reputation
                <span className="font-medium text-red-600">*</span>
              </h6>
              <AddRating
                initialValue={reputationRating}
                setRating={setReputationRating}
              />
            </div>
            <div className=" bg-white p-7">
              <h6 className="mb-4 text-center text-xl font-medium">
                Company culture
                <span className="font-medium text-red-600">*</span>
              </h6>
              <AddRating
                initialValue={companyCultureRating}
                setRating={setCompanyCultureRating}
              />
            </div>
            <div className=" bg-white p-7">
              <h6 className="mb-4 text-center text-xl font-medium">
                Opportunities for advancement
                <span className="font-medium text-red-600">*</span>
              </h6>
              <AddRating
                initialValue={advancementOpportunitiesRating}
                setRating={setAdvancementOpportunitiesRating}
              />
            </div>
            <div className=" bg-white p-7">
              <h6 className="mb-4 text-center text-xl font-medium">
                Work-life balance
                <span className="font-medium text-red-600">*</span>
              </h6>
              <AddRating
                initialValue={workLifeBalanceRating}
                setRating={setWorkLifeBalanceRating}
              />
            </div>
            <div className=" bg-white p-7">
              <h6 className="mb-4 text-center text-xl font-medium">
                Employee benefits
                <span className="font-medium text-red-600">*</span>
              </h6>
              <AddRating
                initialValue={benefitsRating}
                setRating={setBenefitsRating}
              />
            </div>
            <div className=" bg-white p-7">
              <h6 className="mb-4 text-center text-xl font-medium">
                Leadership and management
                <span className="font-medium text-red-600">*</span>
              </h6>
              <AddRating
                initialValue={managementRating}
                setRating={setManagementRating}
              />
            </div>
            <div className=" bg-white p-7">
              <h6 className="mb-4 text-center text-xl font-medium">
                Innovation and technology adoption
                <span className="font-medium text-red-600">*</span>
              </h6>
              <AddRating
                initialValue={technologyAdoptionRating}
                setRating={setTechnologyAdoptionRating}
              />
            </div>
            <div className=" bg-white p-7">
              <h6 className="mb-4 text-center text-xl font-medium">
                Diversity and inclusion
                <span className="font-medium text-red-600">*</span>
              </h6>
              <AddRating
                initialValue={diversityRating}
                setRating={setDiversityRating}
              />
            </div>
            <div className=" bg-white p-7">
              <h6 className="mb-4 text-center text-xl font-medium">
                Corporate social responsibility
                <span className="font-medium text-red-600">*</span>
              </h6>
              <AddRating
                initialValue={socialResponsibilityRating}
                setRating={setSocialResponsibilityRating}
              />
            </div>
            <div className=" bg-white p-7">
              <h6 className="mb-4 text-center text-xl font-medium">
                Financial stability
                <span className="font-medium text-red-600">*</span>
              </h6>
              <AddRating
                initialValue={financialStability}
                setRating={setFinancialStability}
              />
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
              <Button text="Submit Rating" onClick={handleSubmit} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default AddCompanyRatings;
