import Button from "../../ui/Button";
import { useEffect, useState } from "react";
import AddRating from "../../ui/AddRating";
import { useLocation } from "react-router-dom";
import { addJobRating, getJobBySlug } from "../../services/apiJob";
import { toast } from "react-toastify";

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

  const [job, setJob] = useState(null);
  const location = useLocation();

  useEffect(() => {
    (async () => {
      const slug = location.pathname.split("/").pop();
      const response = await getJobBySlug(slug);
      setJob(response?.job);
    })();
  }, [location.pathname]);


  async function handleSubmit() {
    try {
      const data = {
        compensation: compensationRating,
        workLifeBalance: workLifeBalanceRating,
        jobSecurity: jobSecurityRating,
        opportunitiesForGrowth: growthOpportunitiesRating,
        companyCulture: companyCultureRating,
        jobSatisfaction: jobSatisfactionRating,
        workload: workloadRating,
        benefits: benefitsRating,
        flexibility: flexibilityRating,
      };
      const apiResponse = await addJobRating(job.slug, data);

      if (apiResponse.success) {
        toast.success(apiResponse.message);
      } else {
        toast.error(apiResponse.message);
      }
    } catch (error) {
      toast.error(`An error occurred while submitting the rating.${error.message}`);
    }
  }

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
              <h6 className="mb-4 text-center text-xl font-medium">
                Compensation
                <span className="font-medium text-red-600">*</span>
              </h6>
              <AddRating setRating={setCompensationRating} />
            </div>
            <div className=" bg-white p-7">
              <h6 className="mb-4 text-center text-xl font-medium">
                Work-life balance
                <span className="font-medium text-red-600">*</span>
              </h6>
              <AddRating setRating={setWorkLifeBalanceRating} />
            </div>
            <div className=" bg-white p-7">
              <h6 className="mb-4 text-center text-xl font-medium">
                Job security
                <span className="font-medium text-red-600">*</span>
              </h6>
              <AddRating setRating={setJobSecurityRating} />
            </div>
            <div className=" bg-white p-7">
              <h6 className="mb-4 text-center text-xl font-medium">
                Opportunities for growth
                <span className="font-medium text-red-600">*</span>
              </h6>
              <AddRating setRating={setGrowthOpportunitiesRating} />
            </div>
            <div className=" bg-white p-7">
              <h6 className="mb-4 text-center text-xl font-medium">
                Company culture
                <span className="font-medium text-red-600">*</span>
              </h6>
              <AddRating setRating={setCompanyCultureRating} />
            </div>
            <div className=" bg-white p-7">
              <h6 className="mb-4 text-center text-xl font-medium">
                Job satisfaction
                <span className="font-medium text-red-600">*</span>
              </h6>
              <AddRating setRating={setJobSatisfactionRating} />
            </div>
            <div className=" bg-white p-7">
              <h6 className="mb-4 text-center text-xl font-medium">
                Workload
                <span className="font-medium text-red-600">*</span>
              </h6>
              <AddRating setRating={setWorkloadRating} />
            </div>
            <div className=" bg-white p-7">
              <h6 className="mb-4 text-center text-xl font-medium">
                Benefits
                <span className="font-medium text-red-600">*</span>
              </h6>
              <AddRating setRating={setBenefitsRating} />
            </div>
            <div className=" bg-white p-7">
              <h6 className="mb-4 text-center text-xl font-medium">
                Flexibility
                <span className="font-medium text-red-600">*</span>
              </h6>
              <AddRating setRating={setFlexibilityRating} />
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

export default AddJobRatings;
