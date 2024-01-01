import Button from "../../ui/Button";
import { useEffect, useState } from "react";
import AddRating from "../../ui/AddRating";
import { useLocation } from "react-router-dom";
import { getUserRatingsForJob } from "../../services/apiJob";
import { toast } from "react-toastify";
import { addRating } from "../../services/apiRating";
import Loader from "../../ui/Loader";
import { useFormik } from "formik";
import * as Yup from "yup";

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

  const [jobId, setJobId] = useState(null);
  const location = useLocation();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const validationSchema = Yup.object().shape({
    review: Yup.string().required("Review is required"),
  });

  const formik = useFormik({
    initialValues: {
      review: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setSubmitting(true);
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
        const apiResponse = await addRating("job", jobId, data, values.review);

        if (apiResponse.success) {
          toast.success(apiResponse.message);
        } else {
          toast.error(apiResponse.message);
        }
      } catch (error) {
        toast.error(
          `An error occurred while submitting the rating.${error.message}`,
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    (async () => {
      try {
        const slug = location.pathname.split("/").pop();
        const response = await getUserRatingsForJob(slug);
        if (response.success) {
          setApiData([
            {
              companyTitle: response.data.companyTitle,
              jobTitle: response.data.jobTitle,
            },
          ]);
          setJobId(response.data.jobId);

          setCompensationRating(
            response.data.userRatingForJob.parametersRating.compensation,
          );
          setWorkLifeBalanceRating(
            response.data.userRatingForJob.parametersRating.workLifeBalance,
          );
          setJobSecurityRating(
            response.data.userRatingForJob.parametersRating.jobSecurity,
          );
          setGrowthOpportunitiesRating(
            response.data.userRatingForJob.parametersRating
              .opportunitiesForGrowth,
          );
          setCompanyCultureRating(
            response.data.userRatingForJob.parametersRating.companyCulture,
          );
          setJobSatisfactionRating(
            response.data.userRatingForJob.parametersRating.jobSatisfaction,
          );
          setWorkloadRating(
            response.data.userRatingForJob.parametersRating.workload,
          );
          setBenefitsRating(
            response.data.userRatingForJob.parametersRating.benefits,
          );
          setFlexibilityRating(
            response.data.userRatingForJob.parametersRating.flexibility,
          );
          formik.setFieldValue(
            "review",
            response.data.userRatingForJob.ratingText,
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [location.pathname]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="z-50 w-full bg-white py-4 shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div>
            <p>{apiData[0]?.companyTitle}</p>
            <h2 className="my-3 text-2xl font-extrabold sm:text-4xl">
              {apiData[0]?.jobTitle}
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
              <AddRating
                initialValue={compensationRating}
                setRating={setCompensationRating}
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
                Job security
                <span className="font-medium text-red-600">*</span>
              </h6>
              <AddRating
                initialValue={jobSecurityRating}
                setRating={setJobSecurityRating}
              />
            </div>
            <div className=" bg-white p-7">
              <h6 className="mb-4 text-center text-xl font-medium">
                Opportunities for growth
                <span className="font-medium text-red-600">*</span>
              </h6>
              <AddRating
                initialValue={growthOpportunitiesRating}
                setRating={setGrowthOpportunitiesRating}
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
                Job satisfaction
                <span className="font-medium text-red-600">*</span>
              </h6>
              <AddRating
                initialValue={jobSatisfactionRating}
                setRating={setJobSatisfactionRating}
              />
            </div>
            <div className=" bg-white p-7">
              <h6 className="mb-4 text-center text-xl font-medium">
                Workload
                <span className="font-medium text-red-600">*</span>
              </h6>
              <AddRating
                initialValue={workloadRating}
                setRating={setWorkloadRating}
              />
            </div>
            <div className=" bg-white p-7">
              <h6 className="mb-4 text-center text-xl font-medium">
                Benefits
                <span className="font-medium text-red-600">*</span>
              </h6>
              <AddRating
                initialValue={benefitsRating}
                setRating={setBenefitsRating}
              />
            </div>
            <div className=" bg-white p-7">
              <h6 className="mb-4 text-center text-xl font-medium">
                Flexibility
                <span className="font-medium text-red-600">*</span>
              </h6>
              <AddRating
                initialValue={flexibilityRating}
                setRating={setFlexibilityRating}
              />
            </div>
          </div>
          <div className="mx-auto my-16 max-w-[900px]">
            <h3 className="mb-2 font-bold">Write a Review</h3>
            <p className="mb-2">
              Discuss your personal experience on this job. What’s great about
              it? What could use improvement?
            </p>
            <div>
              <textarea
                name="review"
                value={formik.values.review}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full max-w-[900px] resize-none rounded-[34px] border border-gray-200 bg-white p-6 text-lg font-medium placeholder-gray-500 focus:border-gray-400 focus:outline-none"
                rows={10}
              ></textarea>
              {formik.touched.review && formik.errors.review && (
                <div className="text-red-500">{formik.errors.review}</div>
              )}
            </div>
          </div>
          <div className="mx-auto max-w-[900px] text-center">
            <p className="mb-6">
              By clicking the "Submit" button, I acknowledge that I have read
              and agreed to the Rate My Professors Site Guidelines, Terms of Use
              and Privacy Policy. Submitted data becomes the property of
              RateMyProfessors.com. IP addresses are logged.
            </p>
            <div className="mx-auto max-w-max">
              <Button
                disabled={submitting}
                text="Submit Rating"
                onClick={formik.handleSubmit}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default AddJobRatings;
